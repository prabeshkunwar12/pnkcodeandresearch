import { aerosportsMediaManifest } from "@/data/aerosportsMediaManifest";
import { mediaAssetsBySrc } from "@/data/images";
import { developerProjects, type Project, type ProjectMedia } from "./data";

export function getProjectBySlug(slug: string) {
  return developerProjects.find((project) => project.slug === slug) ?? null;
}

export function getRelatedProjects(project: Project) {
  if (!project.relatedProjectIds?.length) return [];
  return developerProjects.filter((item) =>
    project.relatedProjectIds?.includes(item.id),
  );
}

export function getProjectMedia(project: Project): ProjectMedia[] {
  const keys = project.mediaKeys ?? [];
  const collected = keys.flatMap((key) => aerosportsMediaManifest[key] ?? []);
  const inlineMedia = project.media ?? [];

  if (!collected.length && !inlineMedia.length) return [];

  const deduped = new Map<string, ProjectMedia>();
  collected.forEach((item) => {
    if (!deduped.has(item.src)) {
      const metadata = mediaAssetsBySrc[item.src];
      deduped.set(item.src, {
        ...item,
        alt: metadata?.alt ?? item.alt,
        caption: metadata?.caption,
      });
    }
  });
  inlineMedia.forEach((item) => {
    const metadata = mediaAssetsBySrc[item.src];
    deduped.set(item.src, {
      ...metadata,
      ...item,
      alt: item.alt ?? metadata?.alt ?? item.src.split("/").pop() ?? "Media item",
      caption: item.caption ?? metadata?.caption,
    });
  });

  return Array.from(deduped.values());
}
