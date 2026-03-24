"use client";

import { useMemo, useState } from "react";
import type { Project } from "../data";
import { ProjectView } from "./ProjectView";
import { SectionHeader } from "./SectionHeader";

const typeFilters = [
  { value: "all", label: "All" },
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "runtime", label: "Runtime / Systems" },
  { value: "hardware", label: "Hardware / IoT" },
  { value: "operations", label: "Operations / Admin" },
] as const;

const techFilters = [
  "all",
  "next.js",
  ".net",
  "maui",
  "wpf",
  "express",
  "mssql",
  "arduino",
  "api",
] as const;

const projectPriority = [
  "backend-api-express",
  "kiosk-host-dotnet",
  "game-engine-dotnet",
  "kiosk-ui-nextjs",
  "admin-portal-nextjs",
  "game-controllers-sensor-network",
  "room-devices-access-control",
  "scorecard-nextjs",
  "pos-wpf",
  "registration-tablet",
  "axe-wrapper-maui",
] as const;

const projectPriorityMap = new Map<string, number>(
  projectPriority.map((id, index) => [id, index]),
);

type ProjectBrowserSectionProps = {
  id: string;
  sectionLabel: string;
  eyebrow?: string;
  title: string;
  description: string;
  projects: Project[];
};

function formatTechLabel(value: string) {
  switch (value) {
    case "all":
      return "All tech";
    case "next.js":
      return "Next.js";
    case ".net":
      return ".NET";
    case "maui":
      return "MAUI";
    case "wpf":
      return "WPF";
    case "express":
      return "Express";
    case "mssql":
      return "MSSQL";
    case "arduino":
      return "Arduino";
    case "api":
      return "API";
    default:
      return value;
  }
}

export function ProjectBrowserSection({
  id,
  sectionLabel,
  eyebrow = "Projects",
  title,
  description,
  projects,
}: ProjectBrowserSectionProps) {
  const [activeType, setActiveType] =
    useState<(typeof typeFilters)[number]["value"]>("all");
  const [activeTech, setActiveTech] =
    useState<(typeof techFilters)[number]>("all");

  const filteredProjects = useMemo(() => {
    return projects
      .filter((project) => {
        const typeTags = project.typeTags ?? [];
        const techTags = project.techTags ?? [];

        const matchesType =
          activeType === "all"
            ? true
            : activeType === "runtime"
              ? typeTags.includes("runtime") || typeTags.includes("systems")
              : activeType === "hardware"
                ? typeTags.includes("hardware") || typeTags.includes("iot")
                : activeType === "operations"
                  ? typeTags.includes("operations") || typeTags.includes("admin")
                  : typeTags.includes(activeType);

        const matchesTech =
          activeTech === "all" ? true : techTags.includes(activeTech);

        return matchesType && matchesTech;
      })
      .sort((a, b) => {
        const aPriority = projectPriorityMap.get(a.id) ?? Number.MAX_SAFE_INTEGER;
        const bPriority = projectPriorityMap.get(b.id) ?? Number.MAX_SAFE_INTEGER;
        if (aPriority !== bPriority) return aPriority - bPriority;
        return a.name.localeCompare(b.name);
      });
  }, [activeTech, activeType, projects]);

  return (
    <section
      id={id}
      data-page-section="true"
      data-page-section-label={sectionLabel}
      className="mt-16 w-full max-w-full min-w-0 space-y-6 sm:mt-20 sm:space-y-8"
    >
      <SectionHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
      />

      <div className="w-full max-w-full min-w-0 space-y-5 rounded-[28px] border border-black/10 bg-white/70 p-4 shadow-[0_10px_40px_-30px_rgba(0,0,0,0.25)] dark:border-white/10 dark:bg-white/[0.04] sm:p-6">
        <div className="space-y-4">
          <div className="-mx-1 flex max-w-full gap-2 overflow-x-auto px-1 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
            {typeFilters.map((filter) => {
              const isActive = filter.value === activeType;
              return (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => setActiveType(filter.value)}
                  className={`shrink-0 rounded-full px-3.5 py-2 text-sm font-medium transition sm:px-4 ${
                    isActive
                      ? "bg-black/8 text-black dark:bg-white/8 dark:text-white"
                      : "text-black/70 hover:bg-black/5 dark:text-white/70 dark:hover:bg-white/5"
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>

          <div className="flex max-w-full flex-wrap gap-1.5 sm:gap-2">
            {techFilters.map((tech) => {
              const isActive = tech === activeTech;
              return (
                <button
                  key={tech}
                  type="button"
                  onClick={() => setActiveTech(tech)}
                  className={`rounded-full border px-3 py-1.5 text-[11px] font-medium transition sm:text-xs ${
                    isActive
                      ? "border-black/10 bg-black/8 text-black dark:border-white/10 dark:bg-white/8 dark:text-white"
                      : "border-black/10 bg-black/5 text-black/70 hover:bg-black/8 dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/8"
                  }`}
                >
                  {formatTechLabel(tech)}
                </button>
              );
            })}
          </div>
        </div>

        {filteredProjects.length ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectView key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-black/10 bg-black/5 px-4 py-8 text-center text-sm text-black/60 dark:border-white/10 dark:bg-white/5 dark:text-white/60">
            No matching projects. Try a different type or tech filter.
          </div>
        )}
      </div>
    </section>
  );
}
