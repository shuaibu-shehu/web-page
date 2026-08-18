"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";
import { db } from "@/lib/db";

const faqInput = z.object({
  id: z.string().optional(),
  question: z.string().min(1, "Question is required"),
  answer: z.string().min(1, "Answer is required"),
  category: z.string().min(1),
  order: z.coerce.number().int().min(1),
  status: z.enum(["published", "draft"]),
});

export async function saveFaq(formData: FormData): Promise<void> {
  const parsed = faqInput.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return;
  const { id, ...data } = parsed.data;

  if (id) {
    await db.faq.update({ where: { id }, data });
  } else {
    await db.faq.create({ data });
  }
  revalidateTag("faq");
  revalidatePath("/faq");
  revalidatePath("/admin/faq");
}

export async function deleteFaq(formData: FormData): Promise<void> {
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await db.faq.delete({ where: { id } });
  revalidateTag("faq");
  revalidatePath("/faq");
  revalidatePath("/admin/faq");
}

export async function saveFaqCategory(formData: FormData): Promise<void> {
  const category = String(formData.get("category") ?? "").trim();
  if (!category) return;
  const existing = await db.setting.findUnique({ where: { key: "faqCategories" } });
  const list = Array.isArray(existing?.value) ? (existing.value as string[]) : [];
  if (!list.includes(category)) {
    await db.setting.upsert({
      where: { key: "faqCategories" },
      update: { value: [...list, category] as never },
      create: { key: "faqCategories", value: [category] as never },
    });
  }
  revalidatePath("/admin/faq");
}
