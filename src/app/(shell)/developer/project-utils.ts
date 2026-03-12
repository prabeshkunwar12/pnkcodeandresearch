import { aerosportsMediaManifest, type MediaItem } from "@/data/aerosportsMediaManifest";
import { developerProjects, type Project } from "./data";

export function getProjectBySlug(slug: string) {
  return developerProjects.find((project) => project.slug === slug) ?? null;
}

export function getRelatedProjects(project: Project) {
  if (!project.relatedProjectIds?.length) return [];
  return developerProjects.filter((item) =>
    project.relatedProjectIds?.includes(item.id),
  );
}

export function getProjectMedia(project: Project): MediaItem[] {
  const keys = project.mediaKeys ?? [];
  const collected = keys.flatMap((key) => aerosportsMediaManifest[key] ?? []);

  if (!collected.length) return [];

  const deduped = new Map<string, MediaItem>();
  collected.forEach((item) => {
    if (!deduped.has(item.src)) {
      deduped.set(item.src, item);
    }
  });

  return Array.from(deduped.values());
}
