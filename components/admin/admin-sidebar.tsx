"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  FileText,
  Folder,
  HelpCircle,
  Home,
  Image,
  Link2,
  Settings,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import BrandMark from "@/components/brand-mark";

/**
 * `sidebar` from cms-dashboard-overview — 240px, dark #1e2229, sage active item.
 * Icons are the lucide matches of the design's exported SVGs.
 */
const nav = [
  { label: "Dashboard", href: "/admin", icon: Home, exact: true },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3, exact: false },
  { label: "Articles", href: "/admin/articles", icon: FileText, exact: false },
  { label: "Projects", href: "/admin/projects", icon: Folder, exact: false },
  { label: "Team", href: "/admin/team", icon: Users, exact: false },
  { label: "Partnerships", href: "/admin/partnerships", icon: Link2, exact: false },
  { label: "FAQ", href: "/admin/faq", icon: HelpCircle, exact: false },
  { label: "Media Library", href: "/admin/media", icon: Image, exact: false },
  { label: "Settings", href: "/admin/settings", icon: Settings, exact: false },
];

export default function AdminSidebar({ version }: { version: string }) {
  const pathname = usePathname();

  return (
    <aside className="flex w-[240px] shrink-0 flex-col gap-8 self-stretch bg-ink-deep px-4 py-6">
      <div className="flex items-center gap-3">
        <BrandMark size={32} textClass="font-sans font-bold text-white text-[16px]" />
        <span className="w-fit rounded bg-[#2d323e] px-1.5 py-0.5 text-[10px] font-semibold uppercase text-admin-sage">
          Admin Panel
        </span>
      </div>

      <nav className="flex flex-col gap-1.5">
        {nav.map(({ label, href, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors",
                active
                  ? "bg-admin-sage font-semibold text-white"
                  : "font-medium text-[#d1d5db] hover:bg-white/5 hover:text-white",
              )}
            >
              <Icon className="size-[18px] shrink-0" />
              <span className="flex-1">{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col justify-end">
        <p className="text-[11px] text-[#6b7280]">{version} (Production)</p>
      </div>
    </aside>
  );
}
