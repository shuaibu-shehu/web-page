import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * Backups → Export All Data: dumps every content table as JSON.
 * Protected by the /admin middleware (session cookie required).
 */
export async function GET() {
  const [projects, posts, team, partners, faqs, leads, media] = await Promise.all([
    db.project.findMany({ orderBy: { updatedAt: "desc" } }),
    db.post.findMany({ orderBy: { updatedAt: "desc" } }),
    db.teamMember.findMany({ orderBy: { order: "asc" } }),
    db.partner.findMany({ orderBy: { order: "asc" } }),
    db.faq.findMany({ orderBy: { order: "asc" } }),
    db.lead.findMany({ orderBy: { createdAt: "desc" } }),
    db.mediaAsset.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  const exportData = {
    exportedAt: new Date().toISOString(),
    projects,
    posts,
    team,
    partners,
    faqs,
    leads,
    media,
  };

  return new NextResponse(JSON.stringify(exportData, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": 'attachment; filename="codetherapy-export.json"',
    },
  });
}
