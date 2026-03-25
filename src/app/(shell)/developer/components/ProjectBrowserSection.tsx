"use client";

import { useEffect, useMemo, useState } from "react";
import type { Project } from "../data";
import { ProjectView } from "./ProjectView";
import { SectionHeader } from "./SectionHeader";

const typeFilters = [
  { value: "featured", label: "Featured" },
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

type ProjectFilterEventDetail = {
  sectionId?: string;
  type?: (typeof typeFilters)[number]["value"];
  tech?: (typeof techFilters)[number];
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
    useState<(typeof typeFilters)[number]["value"]>("featured");
  const [activeTech, setActiveTech] =
    useState<(typeof techFilters)[number]>("all");
  const [isCompactMobile, setIsCompactMobile] = useState(false);
  const [showAllMobile, setShowAllMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsCompactMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const handleFilterEvent = (event: Event) => {
      const detail = (event as CustomEvent<ProjectFilterEventDetail>).detail;
      if (detail?.sectionId && detail.sectionId !== id) return;
      if (detail?.type) setActiveType(detail.type);
      if (detail?.tech) setActiveTech(detail.tech);
      if (!detail?.tech) setActiveTech("all");
      setShowAllMobile(false);
    };

    window.addEventListener(
      "project-browser:set-filter",
      handleFilterEvent as EventListener,
    );
    return () =>
      window.removeEventListener(
        "project-browser:set-filter",
        handleFilterEvent as EventListener,
      );
  }, [id]);

  const filteredProjects = useMemo(() => {
    return projects
      .filter((project) => {
        const typeTags = project.typeTags ?? [];
        const techTags = project.techTags ?? [];

        const matchesType =
          activeType === "featured"
            ? Boolean(project.featured)
            : activeType === "all"
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

  useEffect(() => {
    setShowAllMobile(false);
  }, [activeType, activeTech]);

  const typeCounts = useMemo(() => {
    return Object.fromEntries(
      typeFilters.map((filter) => {
        const count = projects.filter((project) => {
          const typeTags = project.typeTags ?? [];
          if (filter.value === "featured") return Boolean(project.featured);
          if (filter.value === "all") return true;
          if (filter.value === "runtime") {
            return typeTags.includes("runtime") || typeTags.includes("systems");
          }
          if (filter.value === "hardware") {
            return typeTags.includes("hardware") || typeTags.includes("iot");
          }
          if (filter.value === "operations") {
            return typeTags.includes("operations") || typeTags.includes("admin");
          }
          return typeTags.includes(filter.value);
        }).length;
        return [filter.value, count];
      }),
    ) as Record<(typeof typeFilters)[number]["value"], number>;
  }, [projects]);

  const initialVisibleCount = 4;
  const visibleProjects =
    isCompactMobile && !showAllMobile
      ? filteredProjects.slice(0, initialVisibleCount)
      : filteredProjects;

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

      <div className="w-full max-w-full min-w-0 space-y-6">
        <div className="sticky top-16 z-30 -mx-4 border-b border-black/10 bg-white px-4 py-4 dark:border-white/10 dark:bg-[rgb(10,20,40)] sm:mx-0 sm:px-0">
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
                  {filter.label}{" "}
                  <span className="text-[11px] opacity-70">
                    ({typeCounts[filter.value]})
                  </span>
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
        </div>

        {filteredProjects.length ? (
          <>
            <div className="grid grid-cols-1 gap-4 pt-1 sm:gap-5 sm:grid-cols-2 lg:gap-6 xl:grid-cols-3">
            {visibleProjects.map((project) => (
              <ProjectView key={project.id} project={project} />
            ))}
          </div>
            {isCompactMobile && filteredProjects.length > initialVisibleCount ? (
              <div className="flex justify-center pt-1">
                <button
                  type="button"
                  onClick={() => setShowAllMobile((value) => !value)}
                  className="inline-flex items-center justify-center rounded-full border border-black/10 bg-black/5 px-4 py-2 text-sm font-medium text-black transition hover:bg-black/8 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/8"
                >
                  {showAllMobile ? "Show fewer" : "Show more projects"}
                </button>
              </div>
            ) : null}
          </>
        ) : (
          <div className="rounded-2xl border border-dashed border-black/10 bg-black/5 px-4 py-8 text-center text-sm text-black/60 dark:border-white/10 dark:bg-white/5 dark:text-white/60">
            No matching projects. Try a different type or tech filter.
          </div>
        )}
      </div>
    </section>
  );
}
