"use client";

import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { projectPageTypography as type } from "./project-page-typography";

export type ProjectScrollableCardItem = {
  id: string;
  title: string;
  content: ReactNode;
  eyebrow?: string;
};

type ProjectScrollableCardSectionProps = {
  intro?: ReactNode;
  introClassName?: string;
  items: ProjectScrollableCardItem[];
  trackClassName: string;
  cardClassName: string;
};

export function ProjectScrollableCardSection({
  intro,
  introClassName = "",
  items,
  trackClassName,
  cardClassName,
}: ProjectScrollableCardSectionProps) {
  return (
    <div className="space-y-4">
      {intro ? <div className={introClassName}>{intro}</div> : null}

      <div className="-mx-3 overflow-x-auto px-3 pb-1 lg:mx-0 lg:px-0">
        <div className={trackClassName}>
          {items.map((item) => (
            <Card key={item.id} variant="surface" className={cardClassName}>
              <div className="space-y-3">
                {item.eyebrow ? (
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-black/45 dark:text-white/45">
                    {item.eyebrow}
                  </p>
                ) : null}
                <h3 className={type.markdownHeading}>{item.title}</h3>
                {item.content}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
