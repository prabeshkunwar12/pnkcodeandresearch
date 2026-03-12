import { SectionHeader } from "./SectionHeader";
import { developerProjects } from "../data";
import { ProjectView } from "./ProjectView";

export function ProjectsSection() {
  return (
    <section
      id="projects"
      data-page-section="true"
      data-page-section-label="Projects"
      className="mt-20 space-y-8"
    >
      <SectionHeader
        eyebrow="Projects"
        title="Things I've built"
        description="Selected systems, tools, and product experiences across full-stack delivery."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {developerProjects.map((project) => (
          <ProjectView key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
