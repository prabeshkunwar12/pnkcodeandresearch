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
    <div className="relative w-full max-w-full min-w-0">
      <Card
        variant="surface"
        hover
        className="group flex h-full min-w-0 flex-col gap-2.5 p-3.5 text-black transition-all duration-300 dark:text-white sm:gap-4 sm:p-5 lg:cursor-pointer lg:hover:border-black/20 lg:hover:shadow-md dark:lg:hover:border-white/20 dark:hover:shadow-[0_10px_40px_-30px_rgba(0,0,0,0.6)] motion-reduce:transition-none"
      >
        <div className="flex min-w-0 items-start justify-between gap-3">
          <h3 className="min-w-0 text-[15px] font-semibold leading-6 sm:text-lg">
            {project.name}
          </h3>
          {project.company ? (
            <span className="shrink-0 rounded-full border border-black/10 bg-black/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-black/60 dark:border-white/10 dark:bg-white/5 dark:text-white/60 sm:px-3 sm:text-[11px] sm:tracking-[0.2em]">
              {project.company}
            </span>
          ) : null}
        </div>

        <p className="line-clamp-2 min-w-0 text-[13px] leading-5 text-black/60 dark:text-white/60 sm:line-clamp-2 sm:text-sm sm:leading-6">
          {project.shortDescription}
        </p>

        <div className="flex max-w-full flex-wrap gap-1.5 sm:gap-2">
          {stackPreview.map((item) => (
            <TechIconChip
              key={item.name}
              item={item}
              isDark={isDark}
              isMounted={isMounted}
            />
          ))}
          {extraCount > 0 ? (
            <span className="inline-flex h-8 items-center justify-center rounded-xl border border-black/10 bg-black/5 px-2.5 text-[10px] font-semibold text-black/60 dark:border-white/10 dark:bg-white/5 dark:text-white/60 sm:h-9 sm:px-3 sm:text-[11px]">
              +{extraCount}
            </span>
          ) : null}
        </div>

        <Link
          href={href}
          className="mt-auto inline-flex w-full items-center justify-center rounded-full border border-black/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-black transition hover:border-black dark:border-white/10 dark:text-white dark:hover:border-white sm:w-fit sm:text-xs lg:hidden"
        >
          View project
        </Link>
      </Card>

      <Link
        href={href}
        aria-label={`Open ${project.name} project page`}
        className="absolute inset-0 hidden rounded-[inherit] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 dark:focus-visible:ring-white/30 lg:block"
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
      className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/5 sm:h-9 sm:w-9"
    >
      {renderSrc ? (
        <Image
          src={renderSrc}
          alt={item.name}
          width={18}
          height={18}
          className="h-4 w-4 object-contain sm:h-5 sm:w-5"
        />
      ) : (
        <span className="text-[10px] font-semibold text-black/60 dark:text-white/60">
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
