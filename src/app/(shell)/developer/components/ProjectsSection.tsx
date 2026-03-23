"use client";

import { useMemo, useState } from "react";
import { SectionHeader } from "./SectionHeader";
import { developerProjects } from "../data";
import { ProjectView } from "./ProjectView";

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

export function ProjectsSection() {
  const [activeType, setActiveType] =
    useState<(typeof typeFilters)[number]["value"]>("all");
  const [activeTech, setActiveTech] =
    useState<(typeof techFilters)[number]>("all");

  const filteredProjects = useMemo(() => {
    return developerProjects.filter((project) => {
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

      const matchesTech = activeTech === "all" ? true : techTags.includes(activeTech);

      return matchesType && matchesTech;
    });
  }, [activeTech, activeType]);

  return (
    <section
      id="projects"
      data-page-section="true"
      data-page-section-label="Projects"
      className="mt-20 space-y-8"
    >
      <SectionHeader
        eyebrow="Projects"
        title="Projects"
        description="A filterable view of the systems, tools, runtime platforms, and operational software I have built."
      />

      <div className="space-y-5 rounded-[28px] border border-black/10 bg-white/70 p-5 shadow-[0_10px_40px_-30px_rgba(0,0,0,0.25)] dark:border-white/10 dark:bg-white/[0.04] sm:p-6">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {typeFilters.map((filter) => {
              const isActive = filter.value === activeType;
              return (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => setActiveType(filter.value)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
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

          <div className="flex flex-wrap gap-2">
            {techFilters.map((tech) => {
              const isActive = tech === activeTech;
              return (
                <button
                  key={tech}
                  type="button"
                  onClick={() => setActiveTech(tech)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
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
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
