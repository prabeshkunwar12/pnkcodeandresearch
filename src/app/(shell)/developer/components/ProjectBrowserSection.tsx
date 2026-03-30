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
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [pendingType, setPendingType] =
    useState<(typeof typeFilters)[number]["value"]>("featured");
  const [pendingTech, setPendingTech] =
    useState<(typeof techFilters)[number]>("all");

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

  useEffect(() => {
    if (!isMobileFilterOpen) return;
    setPendingType(activeType);
    setPendingTech(activeTech);
  }, [activeType, activeTech, isMobileFilterOpen]);

  const currentFilterSummary = `${typeFilters.find((filter) => filter.value === activeType)?.label ?? "Featured"} · ${formatTechLabel(activeTech)}`;

  const applyMobileFilters = () => {
    setActiveType(pendingType);
    setActiveTech(pendingTech);
    setIsMobileFilterOpen(false);
  };

  const resetMobileFilters = () => {
    setPendingType("featured");
    setPendingTech("all");
    setActiveType("featured");
    setActiveTech("all");
    setIsMobileFilterOpen(false);
  };

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

      <div className="flex items-center justify-between gap-4 md:hidden">
        <div className="min-w-0">
          <p className="text-sm font-medium text-black/60 dark:text-white/60">
            {filteredProjects.length} project{filteredProjects.length === 1 ? "" : "s"}
          </p>
          <p className="text-xs uppercase tracking-[0.16em] text-black/45 dark:text-white/45">
            {currentFilterSummary}
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setPendingType(activeType);
            setPendingTech(activeTech);
            setIsMobileFilterOpen(true);
          }}
          className="inline-flex shrink-0 items-center justify-center rounded-full border border-black/10 bg-black/5 px-4 py-2 text-sm font-medium text-black transition hover:bg-black/8 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/8"
        >
          Filter
        </button>
      </div>

      <div className="w-full max-w-full min-w-0 space-y-6 sm:rounded-[32px] sm:border sm:border-[color:var(--line)] sm:bg-[color:var(--surface)] sm:p-6 lg:p-8">
          <div className="sticky top-16 z-30 hidden border-b border-black/10 bg-white py-4 dark:border-white/10 dark:bg-[rgb(10,20,40)] md:block md:-mx-6 md:rounded-t-[32px] md:px-6 lg:-mx-8 lg:px-8">
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
              <div className="-mx-4 overflow-x-auto px-4 pb-2 md:hidden">
                <div className="flex w-max items-stretch gap-4 pr-4 snap-x snap-mandatory">
                  {filteredProjects.map((project) => (
                    <div
                      key={project.id}
                      className="flex h-[332px] w-[84vw] max-w-[340px] min-w-0 shrink-0 snap-start"
                    >
                      <ProjectView project={project} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="hidden grid-cols-1 gap-4 pt-1 md:grid md:gap-5 lg:grid-cols-2 lg:gap-6 xl:grid-cols-3">
                {filteredProjects.map((project) => (
                  <ProjectView key={project.id} project={project} />
                ))}
              </div>
            </>
          ) : (
            <div className="rounded-2xl border border-dashed border-black/10 bg-black/5 px-4 py-8 text-center text-sm text-black/60 dark:border-white/10 dark:bg-white/5 dark:text-white/60">
              No matching projects. Try a different type or tech filter.
            </div>
          )}
      </div>

      {isCompactMobile && isMobileFilterOpen ? (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true">
          <button
            type="button"
            aria-label="Close project filters"
            className="absolute inset-0 bg-black/45 backdrop-blur-[2px]"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="absolute inset-x-0 bottom-0 rounded-t-[28px] border border-black/10 bg-[color:var(--surface)] px-4 pb-6 pt-5 shadow-[0_-18px_50px_-30px_rgba(0,0,0,0.45)] dark:border-white/10">
            <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-black/10 dark:bg-white/10" />
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-black/45 dark:text-white/45">
                  Project Filters
                </p>
                <h3 className="mt-2 text-lg font-semibold text-black dark:text-white">
                  Browse projects
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="text-sm font-medium text-black/60 dark:text-white/60"
              >
                Close
              </button>
            </div>

            <div className="mt-5 space-y-5">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/50 dark:text-white/50">
                  Type
                </p>
                <div className="flex flex-wrap gap-2">
                  {typeFilters.map((filter) => {
                    const isActive = pendingType === filter.value;
                    return (
                      <button
                        key={filter.value}
                        type="button"
                        onClick={() => setPendingType(filter.value)}
                        className={`rounded-full px-3.5 py-2 text-sm font-medium transition ${
                          isActive
                            ? "bg-black text-white dark:bg-white dark:!text-black"
                            : "border border-black/10 bg-black/5 text-black/75 dark:border-white/10 dark:bg-white/5 dark:text-white/75"
                        }`}
                      >
                        {filter.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/50 dark:text-white/50">
                  Tech
                </p>
                <div className="flex flex-wrap gap-2">
                  {techFilters.map((tech) => {
                    const isActive = pendingTech === tech;
                    return (
                      <button
                        key={tech}
                        type="button"
                        onClick={() => setPendingTech(tech)}
                        className={`rounded-full px-3.5 py-2 text-sm font-medium transition ${
                          isActive
                            ? "bg-black text-white dark:bg-white dark:!text-black"
                            : "border border-black/10 bg-black/5 text-black/75 dark:border-white/10 dark:bg-white/5 dark:text-white/75"
                        }`}
                      >
                        {formatTechLabel(tech)}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={resetMobileFilters}
                className="rounded-full border border-black/10 px-4 py-2.5 text-sm font-medium text-black/75 dark:border-white/10 dark:text-white/75"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="rounded-full border border-black/10 px-4 py-2.5 text-sm font-medium text-black/75 dark:border-white/10 dark:text-white/75"
              >
                Close
              </button>
              <button
                type="button"
                onClick={applyMobileFilters}
                className="rounded-full bg-black px-4 py-2.5 text-sm font-semibold text-white dark:bg-white dark:!text-black"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
