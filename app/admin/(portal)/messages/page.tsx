import MessagesInbox from "@/components/admin/messages-inbox";
import { db } from "@/lib/db";

export const metadata = { title: "Messages — CodeTherapy Admin" };

/**
 * Contact-form + newsletter inbox. Every public form submission lands in the
 * Lead table (app/(site)/contact/actions.ts) — this screen is where the team
 * reads them, instead of relying on the notification email alone.
 */
export default async function AdminMessagesPage() {
  const leads = await db.lead.findMany({ orderBy: { createdAt: "desc" }, take: 500 });

  return (
    <div className="p-6">
      <MessagesInbox
        leads={leads.map((lead) => ({
          ...lead,
          createdAt: lead.createdAt.toISOString(),
        }))}
      />
    </div>
  );
}
