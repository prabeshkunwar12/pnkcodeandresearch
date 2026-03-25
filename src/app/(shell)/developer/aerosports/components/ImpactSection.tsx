"use client";

import { useEffect, useState } from "react";
import { impactItems } from "../data";
import { SectionHeader } from "./SectionHeader";

export function ImpactSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [showAllMobile, setShowAllMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const initialMobileCount = 3;
  const visibleItems =
    isMobile && !showAllMobile
      ? impactItems.slice(0, initialMobileCount)
      : impactItems;

  return (
    <section
      id="impact"
      data-page-section="true"
      data-page-section-label="Impact"
      className="mt-16 w-full max-w-full min-w-0 space-y-6 sm:mt-20 sm:space-y-8"
    >
      <SectionHeader
        eyebrow="Impact"
        title="What this enabled"
        description="High-level outcomes from owning systems architecture, game integration, and launch execution."
      />

      {isMobile ? (
        <div className="space-y-3">
          <ul className="space-y-3">
            {visibleItems.map((item) => (
              <li
                key={item.key}
                className="flex gap-3 text-sm leading-6 text-black/75 dark:text-white/75"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-black/65 dark:bg-white/65" />
                <div className="min-w-0">
                  <span className="font-semibold text-black dark:text-white">
                    {item.title}
                  </span>{" "}
                  <span className="text-black/68 dark:text-white/68">
                    {item.description}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          {impactItems.length > initialMobileCount ? (
            <button
              type="button"
              onClick={() => setShowAllMobile((value) => !value)}
              className="inline-flex items-center rounded-full border border-black/10 bg-black/5 px-4 py-2 text-sm font-medium text-black transition hover:bg-black/8 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/8"
            >
              {showAllMobile ? "Show fewer" : "Show more"}
            </button>
          ) : null}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {impactItems.map((item) => (
            <div
              key={item.key}
              className="rounded-2xl border border-black/10 bg-black/[0.03] px-4 py-4 text-black dark:border-white/10 dark:bg-white/[0.03] dark:text-white"
            >
              <p className="text-base font-semibold sm:text-lg">{item.title}</p>
              <p className="mt-2 text-sm leading-6 text-black/65 dark:text-white/65">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
