import ArticleEditor from "@/components/admin/article-editor";

export const metadata = { title: "New Article — CodeTherapy Admin" };

export default function NewArticlePage() {
  return <ArticleEditor post={null} />;
}
