import { notFound } from "next/navigation";
import ProjectEditor from "@/components/admin/project-editor";
import { db } from "@/lib/db";

export const metadata = { title: "Edit Project — CodeTherapy Admin" };

export default async function EditProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const project = await db.project.findUnique({ where: { id: params.id } });
  if (!project) notFound();

  return <ProjectEditor project={project} />;
}
