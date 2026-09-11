import { getPublishedFaqs } from "@/lib/content-queries";
import FaqPageClient from "./page-client";

export const revalidate = 60;

export default async function Page() {
  const faqs = await getPublishedFaqs();
  return <FaqPageClient faqs={faqs} />;
}
