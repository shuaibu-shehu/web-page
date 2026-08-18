import { notFound } from "next/navigation";
import ArticleEditor from "@/components/admin/article-editor";
import { db } from "@/lib/db";

export const metadata = { title: "Edit Article — CodeTherapy Admin" };

export default async function EditArticlePage({
  params,
}: {
  params: { id: string };
}) {
  const post = await db.post.findUnique({ where: { id: params.id } });
  if (!post) notFound();

  return <ArticleEditor post={post} />;
}
