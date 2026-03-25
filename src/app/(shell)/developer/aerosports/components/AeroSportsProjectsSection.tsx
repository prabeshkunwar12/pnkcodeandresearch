import { developerProjects } from "../../data";
import { ProjectBrowserSection } from "../../components/ProjectBrowserSection";

const aerosportsProjects = developerProjects.filter(
  (project) => project.company === "AeroSports",
);

export function AeroSportsProjectsSection() {
  return (
    <ProjectBrowserSection
      id="systems"
      sectionLabel="AeroSports Projects"
      eyebrow="AeroSports Projects"
      title="Systems Built for AeroSports"
      description="A detailed look at the systems, tools, interfaces, and runtime components developed across the AeroSports platform."
      projects={aerosportsProjects}
    />
  );
}
