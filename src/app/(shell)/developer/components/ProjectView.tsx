"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { resolveTechIcon } from "@/data/images";
import { useThemeContext } from "@/components/theme-context";
import type { Project, TechItem } from "../data";

type ProjectViewProps = {
  project: Project;
};

export function ProjectView({ project }: ProjectViewProps) {
  const { resolvedTheme } = useThemeContext();
  const [isMounted, setIsMounted] = useState(false);
  const orderedTechStack = orderTechStack(project.techStack);
  const stackPreview = orderedTechStack.slice(0, 6);
  const extraCount = Math.max(orderedTechStack.length - 6, 0);
  const href = `/developer/projects/${project.slug}`;
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="relative">
      <Card
        variant="surface"
        hover
        className="group flex h-full flex-col gap-4 p-5 text-[color:var(--foreground)] transition-all duration-300 lg:cursor-pointer lg:hover:shadow-md lg:hover:border-black/20 dark:lg:hover:border-white/20 dark:hover:shadow-[0_10px_40px_-30px_rgba(0,0,0,0.6)] motion-reduce:transition-none"
      >
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-base font-semibold">{project.name}</h3>
          {project.company ? (
            <span className="rounded-full border border-[color:var(--line)] bg-[color:var(--chip)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)]">
              {project.company}
            </span>
          ) : null}
        </div>

        <p className="text-sm text-[color:var(--muted)] line-clamp-2">
          {project.shortDescription}
        </p>

        <div className="flex flex-wrap gap-2">
          {stackPreview.map((item) => (
            <TechIconChip
              key={item.name}
              item={item}
              isDark={isDark}
              isMounted={isMounted}
            />
          ))}
          {extraCount > 0 ? (
            <span className="inline-flex h-9 items-center justify-center rounded-xl border border-[color:var(--line)] bg-[color:var(--chip)] px-3 text-[11px] font-semibold text-[color:var(--muted)]">
              +{extraCount}
            </span>
          ) : null}
        </div>

        <Link
          href={href}
          className="mt-auto inline-flex w-fit items-center rounded-full border border-[color:var(--line)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--foreground)] transition hover:border-[color:var(--foreground)] lg:hidden"
        >
          View project
        </Link>
      </Card>

      <Link
        href={href}
        aria-label={`Open ${project.name} project page`}
        className="absolute inset-0 hidden rounded-[inherit] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--foreground)]/30 lg:block"
      />
    </div>
  );
}

function TechIconChip({
  item,
  isDark,
  isMounted,
}: {
  item: TechItem;
  isDark: boolean;
  isMounted: boolean;
}) {
  const resolved = item.iconSrc || item.lightIconSrc || item.darkIconSrc
    ? {
        iconSrc: item.iconSrc,
        lightIconSrc: item.lightIconSrc ?? item.iconSrc,
        darkIconSrc: item.darkIconSrc ?? item.iconSrcDark,
      }
    : resolveTechIcon(item.name);
  const fallback = item.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();

  const currentIcon = resolved.darkIconSrc || resolved.lightIconSrc || resolved.iconSrc;
  const iconSrc = isMounted
    ? isDark
      ? resolved.darkIconSrc ?? resolved.lightIconSrc ?? resolved.iconSrc
      : resolved.lightIconSrc ?? resolved.iconSrc
    : resolved.lightIconSrc ?? resolved.iconSrc;
  const renderSrc = iconSrc ?? currentIcon;
  return (
    <span
      title={item.name}
      className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[color:var(--line)] bg-[color:var(--chip)]"
    >
      {renderSrc ? (
        <Image src={renderSrc} alt={item.name} width={18} height={18} className="h-5 w-5 object-contain" />
      ) : (
        <span className="text-[10px] font-semibold text-[color:var(--muted)]">
          {fallback}
        </span>
      )}
    </span>
  );
}

function orderTechStack(items: TechItem[]) {
  const withIcons: TechItem[] = [];
  const withoutIcons: TechItem[] = [];

  items.forEach((item) => {
    const resolved = item.iconSrc || item.lightIconSrc || item.darkIconSrc
      ? { iconSrc: item.iconSrc ?? item.lightIconSrc }
      : resolveTechIcon(item.name);
    if (resolved.iconSrc) {
      withIcons.push(item);
    } else {
      withoutIcons.push(item);
    }
  });

  return [...withIcons, ...withoutIcons];
}
