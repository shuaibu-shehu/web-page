import { notFound } from "next/navigation";
import PartnerEditor from "@/components/admin/partner-editor";
import { db } from "@/lib/db";

export const metadata = { title: "Edit Partner — CodeTherapy Admin" };

export default async function EditPartnerPage({
  params,
}: {
  params: { id: string };
}) {
  const partner = await db.partner.findUnique({ where: { id: params.id } });
  if (!partner) notFound();
  return <PartnerEditor partner={partner} />;
}
