"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { companyLogos, resolveTechIcon } from "@/data/images";
import { useThemeContext } from "@/components/theme-context";
import type { Project, TechItem } from "../data";

type ProjectViewProps = {
  project: Project;
};

const ambientProjectBackgrounds: Record<
  string,
  { src: string; alt: string; objectPosition?: string }
> = {
  "kiosk-ui-nextjs": {
    src: "/developer/aerosports/frontend-screens/game-selection/game-selection.png",
    alt: "Kiosk game selection screen",
    objectPosition: "center center",
  },
  "kiosk-host-dotnet": {
    src: "/developer/aerosports/frontend-screens/game-selection/game-selection.png",
    alt: "Kiosk host game selection interface",
    objectPosition: "center center",
  },
  "scorecard-nextjs": {
    src: "/developer/aerosports/frontend-screens/game-selection/scorecards/competitive.png",
    alt: "Scorecard screen",
    objectPosition: "center center",
  },
  "game-engine-dotnet": {
    src: "/developer/aerosports/game-rooms/cybershot_complete1.jpeg",
    alt: "AeroSports game room powered by the engine",
    objectPosition: "center center",
  },
  "room-devices-access-control": {
    src: "/developer/aerosports/PowerAndControllerSetup.jpg",
    alt: "Power and controller setup",
    objectPosition: "center center",
  },
  "game-controllers-sensor-network": {
    src: "/developer/aerosports/USR-N540.jpeg",
    alt: "USR controller hardware",
    objectPosition: "center center",
  },
  "pos-wpf": {
    src: "/developer/aerosports/frontend-screens/pos/pos-lookup-modal.png",
    alt: "POS lookup screen",
    objectPosition: "center center",
  },
  "registration-tablet": {
    src: "/developer/aerosports/frontend-screens/registration.jpeg",
    alt: "Registration screen",
    objectPosition: "center center",
  },
  "axe-wrapper-maui": {
    src: "/developer/aerosports/frontend-screens/axe/axe-process-1.png",
    alt: "Axe process screen",
    objectPosition: "center center",
  },
  "admin-portal": {
    src: "/developer/aerosports/frontend-screens/admin_portal/Admin_home.png",
    alt: "Admin portal screen",
    objectPosition: "center center",
  },
};

export function ProjectView({ project }: ProjectViewProps) {
  const { resolvedTheme } = useThemeContext();
  const [isMounted, setIsMounted] = useState(false);
  const orderedTechStack = orderTechStack(project.techStack);
  const stackPreview = orderedTechStack.slice(0, 6);
  const extraCount = Math.max(orderedTechStack.length - 6, 0);
  const href = `/developer/projects/${project.slug}`;
  const isDark = resolvedTheme === "dark";
  const backgroundImage =
    project.cardBackgroundImage ?? ambientProjectBackgrounds[project.id];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="relative w-full max-w-full min-w-0">
      <Card
        variant="surface"
        hover
        className="group relative flex h-full min-h-[332px] min-w-0 flex-col overflow-hidden p-4 text-black transition-all duration-300 dark:text-white sm:min-h-[356px] sm:p-5 lg:cursor-pointer lg:hover:border-black/20 lg:hover:shadow-md dark:lg:hover:border-white/20 dark:hover:shadow-[0_10px_40px_-30px_rgba(0,0,0,0.6)] motion-reduce:transition-none"
      >
        {backgroundImage ? (
          <div className="pointer-events-none absolute inset-0 z-0">
            <Image
              src={backgroundImage.src}
              alt={backgroundImage.alt}
              fill
              sizes="(max-width: 768px) 85vw, (max-width: 1200px) 50vw, 33vw"
              className="scale-[1.08] object-cover opacity-[0.24] blur-[0.5px] dark:opacity-[0.2]"
              style={{ objectPosition: backgroundImage.objectPosition ?? "center" }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.78)_0%,rgba(255,255,255,0.64)_36%,rgba(255,255,255,0.42)_72%,rgba(255,255,255,0.56)_100%)] dark:bg-[linear-gradient(135deg,rgba(8,14,28,0.9)_0%,rgba(8,14,28,0.82)_36%,rgba(8,14,28,0.72)_72%,rgba(8,14,28,0.82)_100%)]" />
          </div>
        ) : null}

        <div className="relative z-10 flex h-full min-w-0 flex-1 flex-col">
          <div className="flex min-w-0 items-start justify-between gap-3">
            <h3 className="min-w-0 text-[1.05rem] font-semibold leading-6 text-black dark:text-white sm:text-[1.18rem] sm:leading-7">
              {project.name}
            </h3>
            {project.company ? (
              project.company === "AeroSports" && companyLogos.AeroSports ? (
                <span className="shrink-0 self-start pt-0.5">
                  <Image
                    src={companyLogos.AeroSports}
                    alt="AeroSports"
                    width={84}
                    height={26}
                    className="h-6 w-auto object-contain opacity-90 dark:opacity-95"
                  />
                </span>
              ) : (
                <span className="shrink-0 rounded-full border border-black/10 bg-black/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-black/70 dark:border-white/10 dark:bg-white/5 dark:text-white/60 sm:px-3 sm:text-[11px] sm:tracking-[0.2em]">
                  {project.company}
                </span>
              )
            ) : null}
          </div>

          <div className="flex flex-1 flex-col justify-center py-4 sm:py-5">
            <div className="space-y-3.5">
              <p className="min-w-0 text-[14px] leading-6 text-black/80 dark:text-white/72 sm:line-clamp-3 sm:text-[15px] sm:leading-6">
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
                  <span className="inline-flex h-8 items-center justify-center rounded-xl border border-black/10 bg-black/5 px-2.5 text-[10px] font-semibold text-black/70 dark:border-white/10 dark:bg-white/5 dark:text-white/60 sm:h-9 sm:px-3 sm:text-[11px]">
                    +{extraCount}
                  </span>
                ) : null}
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href={href}
              className="inline-flex w-full items-center justify-center rounded-full border border-[color:var(--line)] bg-[color:var(--surface-strong)] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--foreground)] transition hover:border-[color:var(--foreground)] hover:bg-[color:var(--surface)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--foreground)]/25 sm:w-fit sm:px-5 sm:text-xs lg:hidden"
            >
              View project
            </Link>
          </div>
        </div>
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
