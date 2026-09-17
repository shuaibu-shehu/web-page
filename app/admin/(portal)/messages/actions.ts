"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

/**
 * Messages screen — status + deletion for Lead rows (contact form and
 * newsletter signups). The `new` count also drives the topbar bell badge,
 * so every mutation revalidates the whole portal shell.
 */

function refresh() {
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}

const statusInput = z.object({
  id: z.string().min(1),
  status: z.enum(["new", "reviewed"]),
});

export async function setLeadStatus(
  input: z.infer<typeof statusInput>,
): Promise<{ error: string | null }> {
  await requireAdmin();
  const parsed = statusInput.safeParse(input);
  if (!parsed.success) return { error: "Invalid request." };

  await db.lead.update({
    where: { id: parsed.data.id },
    data: { status: parsed.data.status },
  });
  refresh();
  return { error: null };
}

export async function markAllReviewed(): Promise<{ updated: number }> {
  await requireAdmin();
  const { count } = await db.lead.updateMany({
    where: { status: "new" },
    data: { status: "reviewed" },
  });
  refresh();
  return { updated: count };
}

export async function deleteLead(id: string): Promise<{ error: string | null }> {
  await requireAdmin();
  if (!id) return { error: "Invalid request." };
  await db.lead.delete({ where: { id } });
  refresh();
  return { error: null };
}
