import { notFound } from "next/navigation";
import { ProjectPageTemplate } from "../../components/ProjectPageTemplate";
import {
  getProjectBySlug,
  getProjectMedia,
  getRelatedProjects,
} from "../../project-utils";
import { developerProjects } from "../../data";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return developerProjects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    notFound();
  }

  const relatedProjects = getRelatedProjects(project);
  const media = getProjectMedia(project);

  return (
    <ProjectPageTemplate
      project={project}
      relatedProjects={relatedProjects}
      media={media}
    />
  );
}
