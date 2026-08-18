"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/lib/db";

const partnerInput = z.object({
  id: z.string().optional(),
  initial: z.string().min(1),
  name: z.string().min(1, "Name is required"),
  region: z.string().min(1),
  type: z.string().min(1),
  body: z.string().min(1),
  category: z.string().min(1),
  affiliationStatus: z.string().min(1),
  startDate: z.string().min(1),
  contact: z.string().min(1),
});

export async function savePartner(
  _prev: { error: string | null },
  formData: FormData,
): Promise<{ error: string | null }> {
  const parsed = partnerInput.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  const { id, ...data } = parsed.data;

  if (id) {
    await db.partner.update({ where: { id }, data });
  } else {
    const last = await db.partner.findFirst({ orderBy: { order: "desc" } });
    await db.partner.create({ data: { ...data, order: (last?.order ?? -1) + 1 } });
  }

  revalidateTag("partners");
  revalidatePath("/partnerships");
  redirect("/admin/partnerships");
}

export async function deletePartner(formData: FormData): Promise<void> {
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await db.partner.delete({ where: { id } });
  revalidateTag("partners");
  revalidatePath("/partnerships");
  revalidatePath("/admin/partnerships");
}
