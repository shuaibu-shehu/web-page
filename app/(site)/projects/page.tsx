import { getPublishedProjects } from "@/lib/content-queries";
import ProjectsPage from "./page-client";

export const revalidate = 60;

export default async function Page() {
  const projects = await getPublishedProjects();
  return <ProjectsPage projects={projects} />;
}
