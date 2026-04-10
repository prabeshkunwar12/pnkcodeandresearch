"use client";

import { useState } from "react";

type FocusPreviewCardProps = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  href: string;
  ctaLabel: string;
};

export function FocusPreviewCard({
  eyebrow,
  title,
  paragraphs,
  href,
  ctaLabel,
}: FocusPreviewCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="w-full max-w-full min-w-0 rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface)] p-3.5 sm:rounded-3xl sm:p-4 md:soft-card md:p-6">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--muted)] sm:tracking-[0.22em] md:tracking-[0.28em]">
        {eyebrow}
      </p>
      <h3 className="font-display mt-2 text-lg leading-tight sm:mt-2.5 sm:text-xl md:mt-3 md:text-2xl">
        {title}
      </h3>

      <div className="mt-2 space-y-2 sm:mt-2.5 md:mt-3 md:space-y-3">
        {paragraphs.map((paragraph, index) => (
          <p
            key={`${eyebrow}-${index}`}
            className={[
              "text-sm leading-6 text-black/70 dark:text-white/70 md:text-[15px]",
              index > 0 && !expanded ? "hidden md:block" : "",
              index === 0 && !expanded ? "line-clamp-3 md:line-clamp-none" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {paragraph}
          </p>
        ))}
      </div>

      <button
        type="button"
        className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--accent-deep)] md:hidden"
        onClick={() => setExpanded((value) => !value)}
      >
        {expanded ? "Show less" : "View more"}
      </button>

      <a
        className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-[color:var(--line)] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] transition hover:border-foreground sm:mt-4 sm:w-auto sm:px-5 sm:text-xs sm:tracking-[0.2em]"
        href={href}
      >
        {ctaLabel} →
      </a>
    </div>
  );
}
