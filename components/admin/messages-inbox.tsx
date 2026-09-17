"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  CheckCheck,
  Inbox,
  Mail,
  MailOpen,
  Reply,
  Search,
  Trash2,
} from "lucide-react";
import {
  deleteLead,
  markAllReviewed,
  setLeadStatus,
} from "@/app/admin/(portal)/messages/actions";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

export type InboxLead = {
  id: string;
  source: string; // "contact" | "newsletter"
  inquiryType: string | null;
  name: string;
  email: string;
  organization: string | null;
  message: string;
  status: string; // "new" | "reviewed"
  createdAt: string;
};

type SourceFilter = "all" | "contact" | "newsletter";
type StatusFilter = "all" | "new" | "reviewed";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function MessagesInbox({ leads }: { leads: InboxLead[] }) {
  const { toast } = useToast();
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [source, setSource] = useState<SourceFilter>("all");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(leads[0]?.id ?? null);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return leads.filter((lead) => {
      if (source !== "all" && lead.source !== source) return false;
      if (status !== "all" && lead.status !== status) return false;
      if (!q) return true;
      return [lead.name, lead.email, lead.organization ?? "", lead.message]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [leads, source, status, query]);

  const selected = visible.find((l) => l.id === openId) ?? visible[0] ?? null;

  const counts = {
    total: leads.length,
    unread: leads.filter((l) => l.status === "new").length,
    contact: leads.filter((l) => l.source === "contact").length,
    newsletter: leads.filter((l) => l.source === "newsletter").length,
  };

  function toggleStatus(lead: InboxLead) {
    const next = lead.status === "new" ? "reviewed" : "new";
    startTransition(async () => {
      const res = await setLeadStatus({ id: lead.id, status: next });
      if (res.error) {
        toast({ title: res.error, variant: "destructive" });
        return;
      }
      router.refresh();
    });
  }

  function remove(lead: InboxLead) {
    startTransition(async () => {
      const res = await deleteLead(lead.id);
      if (res.error) {
        toast({ title: res.error, variant: "destructive" });
        return;
      }
      if (openId === lead.id) setOpenId(null);
      toast({ title: "Message deleted" });
      router.refresh();
    });
  }

  function markAll() {
    startTransition(async () => {
      const { updated } = await markAllReviewed();
      toast({
        title: updated
          ? `${updated} message${updated === 1 ? "" : "s"} marked reviewed`
          : "Nothing left to review",
      });
      router.refresh();
    });
  }

  /** Pre-filled reply — opens the admin's own mail client. */
  function mailtoHref(lead: InboxLead): string {
    const subject =
      lead.source === "newsletter"
        ? "CodeTherapy research digest"
        : `Re: your enquiry to CodeTherapy${lead.inquiryType ? ` — ${lead.inquiryType}` : ""}`;
    const body = [
      `Hi ${lead.name.split(" ")[0]},`,
      "",
      "",
      "",
      "— CodeTherapy",
      "",
      "---",
      `On ${formatDate(lead.createdAt)} you wrote:`,
      lead.message,
    ].join("\n");
    return `mailto:${lead.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-ink">Messages</h1>
          <p className="text-sm text-gray-500">
            Every contact-form enquiry and newsletter signup from the public site.
          </p>
        </div>
        {counts.unread > 0 && (
          <button
            type="button"
            onClick={markAll}
            disabled={pending}
            className="flex items-center gap-2 rounded-lg bg-admin-azure px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-azure-deep disabled:opacity-60"
          >
            <CheckCheck className="size-4" />
            Mark all reviewed
          </button>
        )}
      </header>

      {/* ------------------------------------------------------- counters */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {[
          { label: "Total Messages", value: counts.total },
          { label: "Unread", value: counts.unread },
          { label: "Contact Enquiries", value: counts.contact },
          { label: "Newsletter Signups", value: counts.newsletter },
        ].map((kpi) => (
          <div
            key={kpi.label}
            className="flex flex-col gap-2 rounded-lg border border-gray-200 bg-white p-5"
          >
            <p className="text-[13px] font-medium text-gray-500">{kpi.label}</p>
            <p className="text-[28px] font-bold text-ink">{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* -------------------------------------------------------- filters */}
      <div className="flex flex-wrap items-center gap-2">
        <FilterGroup
          value={source}
          onChange={setSource}
          options={[
            { value: "all", label: "All sources" },
            { value: "contact", label: "Contact" },
            { value: "newsletter", label: "Newsletter" },
          ]}
        />
        <FilterGroup
          value={status}
          onChange={setStatus}
          options={[
            { value: "all", label: "All" },
            { value: "new", label: "Unread" },
            { value: "reviewed", label: "Reviewed" },
          ]}
        />
        <label className="ml-auto flex h-9 w-[240px] items-center gap-2 rounded-lg border border-gray-200 bg-white px-3">
          <Search className="size-4 shrink-0 text-gray-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, email, message…"
            aria-label="Search messages"
            className="w-full bg-transparent text-[13px] text-ink outline-none placeholder:text-gray-400"
          />
        </label>
      </div>

      <div className="flex flex-col gap-6 xl:flex-row">
        {/* ------------------------------------------------------ list */}
        <div className="flex min-w-0 flex-1 flex-col rounded-xl border border-gray-200 bg-white">
          {visible.map((lead) => (
            <button
              key={lead.id}
              type="button"
              onClick={() => setOpenId(lead.id)}
              className={cn(
                "flex items-start gap-3 border-b border-gray-100 px-4 py-3 text-left transition-colors last:border-0 hover:bg-gray-50",
                selected?.id === lead.id && "bg-azure-soft/60",
              )}
            >
              <span className="mt-0.5 shrink-0 text-gray-400">
                {lead.status === "new" ? (
                  <Mail className="size-4 text-admin-azure" />
                ) : (
                  <MailOpen className="size-4" />
                )}
              </span>
              <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="flex items-center gap-2">
                  <span
                    className={cn(
                      "truncate text-sm text-ink",
                      lead.status === "new" ? "font-bold" : "font-medium",
                    )}
                  >
                    {lead.name}
                  </span>
                  <span
                    className={cn(
                      "shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold uppercase",
                      lead.source === "contact"
                        ? "bg-azure-soft text-admin-azure"
                        : "bg-navy-soft text-admin-navy",
                    )}
                  >
                    {lead.source}
                  </span>
                </span>
                <span className="truncate text-xs text-gray-500">
                  {lead.inquiryType ? `${lead.inquiryType} · ` : ""}
                  {lead.message}
                </span>
              </span>
              <span className="shrink-0 whitespace-nowrap text-[11px] text-gray-400">
                {formatDate(lead.createdAt)}
              </span>
            </button>
          ))}

          {visible.length === 0 && (
            <div className="flex flex-col items-center gap-2 p-12 text-center">
              <Inbox className="size-6 text-gray-300" />
              <p className="text-sm text-gray-500">
                {leads.length === 0
                  ? "No messages yet — submissions from the contact form land here."
                  : "No messages match these filters."}
              </p>
            </div>
          )}
        </div>

        {/* ---------------------------------------------------- detail */}
        <aside className="flex w-full shrink-0 flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 xl:w-[360px]">
          {selected ? (
            <>
              <div className="flex flex-col gap-1">
                <h2 className="font-bold text-ink">{selected.name}</h2>
                <a
                  href={`mailto:${selected.email}`}
                  className="text-[13px] text-admin-azure hover:underline"
                >
                  {selected.email}
                </a>
              </div>

              <dl className="flex flex-col gap-3 border-y border-gray-100 py-4 text-[13px]">
                {selected.organization && (
                  <div className="flex items-center gap-2">
                    <Building2 className="size-3.5 shrink-0 text-gray-400" />
                    <dt className="sr-only">Organization</dt>
                    <dd className="text-gray-600">{selected.organization}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-[11px] uppercase tracking-wide text-gray-400">
                    Inquiry type
                  </dt>
                  <dd className="text-gray-600">{selected.inquiryType ?? "—"}</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-wide text-gray-400">
                    Received
                  </dt>
                  <dd className="text-gray-600">{formatDate(selected.createdAt)}</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-wide text-gray-400">
                    Status
                  </dt>
                  <dd
                    className={cn(
                      "font-semibold",
                      selected.status === "new" ? "text-admin-azure" : "text-gray-500",
                    )}
                  >
                    {selected.status === "new" ? "Unread" : "Reviewed"}
                  </dd>
                </div>
              </dl>

              <div>
                <p className="mb-1.5 text-[11px] uppercase tracking-wide text-gray-400">
                  Message
                </p>
                <p className="whitespace-pre-wrap rounded-lg bg-gray-50 p-3 text-[13px] leading-relaxed text-ink">
                  {selected.message}
                </p>
              </div>

              <div className="mt-auto flex flex-col gap-2 pt-2">
                <a
                  href={mailtoHref(selected)}
                  className="flex h-[38px] items-center justify-center gap-2 rounded-lg bg-admin-azure text-[13px] font-semibold text-white transition-colors hover:bg-azure-deep"
                >
                  <Reply className="size-3.5" />
                  Reply by email
                </a>
                <button
                  type="button"
                  onClick={() => toggleStatus(selected)}
                  disabled={pending}
                  className="flex h-[38px] items-center justify-center gap-2 rounded-lg border border-gray-200 bg-gray-50 text-[13px] font-semibold text-gray-600 transition-colors hover:border-admin-azure hover:text-admin-azure disabled:opacity-60"
                >
                  {selected.status === "new" ? (
                    <>
                      <MailOpen className="size-3.5" />
                      Mark reviewed
                    </>
                  ) : (
                    <>
                      <Mail className="size-3.5" />
                      Mark unread
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => remove(selected)}
                  disabled={pending}
                  className="flex h-[38px] items-center justify-center gap-2 rounded-lg border border-red-600 bg-[#fee2e2] text-[13px] font-semibold text-red-600 transition-colors hover:bg-[#fecaca] disabled:opacity-60"
                >
                  <Trash2 className="size-3.5" />
                  Delete message
                </button>
              </div>
            </>
          ) : (
            <p className="text-sm text-gray-400">
              Select a message to read it in full.
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}

function FilterGroup<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (next: T) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <div className="flex gap-0.5 rounded-lg border border-gray-200 bg-white p-0.5">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          aria-pressed={value === option.value}
          className={cn(
            "rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors",
            value === option.value
              ? "bg-admin-azure text-white"
              : "text-gray-600 hover:bg-gray-50",
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
