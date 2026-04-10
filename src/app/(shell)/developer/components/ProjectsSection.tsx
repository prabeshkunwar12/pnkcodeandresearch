import { developerProjects } from "../data";
import { ProjectBrowserSection } from "./ProjectBrowserSection";

export function ProjectsSection() {
  return (
    <ProjectBrowserSection
      id="projects"
      sectionLabel="Projects"
      eyebrow="Selected Work"
      title="Projects"
      description="A selected view of the systems, tools, and interfaces I built across platform infrastructure, runtime logic, hardware integration, and operations."
      projects={developerProjects}
    />
  );
}
