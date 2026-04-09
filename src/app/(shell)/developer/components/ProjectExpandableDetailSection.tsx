"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Card } from "@/components/ui/card";

export type ProjectExpandableDetailItem = {
  id: string;
  title: string;
  summary: string;
  content: ReactNode;
};

type ProjectExpandableDetailSectionProps = {
  intro?: ReactNode;
  items: ProjectExpandableDetailItem[];
  desktopContainerClassName?: string;
};

export function ProjectExpandableDetailSection({
  intro,
  items,
  desktopContainerClassName = "hidden overflow-hidden rounded-[28px] border border-black/10 bg-white/75 shadow-[0_14px_48px_-32px_rgba(0,0,0,0.35)] backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.05] md:block",
}: ProjectExpandableDetailSectionProps) {
  const [activeDesktopItem, setActiveDesktopItem] = useState<string | null>(items[0]?.id ?? null);
  const [activeMobileItem, setActiveMobileItem] = useState<string | null>(null);

  const activeMobile = items.find((item) => item.id === activeMobileItem) ?? null;

  useEffect(() => {
    setActiveDesktopItem(items[0]?.id ?? null);
  }, [items]);

  useEffect(() => {
    if (!activeMobileItem) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [activeMobileItem]);

  return (
    <div className="space-y-4">
      {intro ? <div>{intro}</div> : null}

      <div className="space-y-3 md:hidden">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveMobileItem(item.id)}
            className="w-full rounded-2xl border border-black/10 bg-white/70 px-4 py-4 text-left dark:border-white/10 dark:bg-white/[0.05]"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-black dark:text-white">
                  {item.title}
                </h3>
                <p className="text-sm leading-6 text-black/70 dark:text-white/72">
                  {item.summary}
                </p>
              </div>
              <span className="pt-1 text-lg text-black/45 dark:text-white/45" aria-hidden="true">
                →
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className={desktopContainerClassName}>
        {items.map((item, index) => {
          const isActive = activeDesktopItem === item.id;
          return (
            <div
              key={item.id}
              className={index !== items.length - 1 ? "border-b border-black/10 dark:border-white/10" : ""}
            >
              <div
                role="button"
                tabIndex={0}
                onClick={() => setActiveDesktopItem(isActive ? null : item.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setActiveDesktopItem(isActive ? null : item.id);
                  }
                }}
                className={`grid w-full cursor-pointer gap-4 px-5 py-4 text-left transition hover:bg-black/[0.025] dark:hover:bg-white/[0.03] lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:px-6 ${
                  isActive ? "bg-black/[0.03] dark:bg-white/[0.04]" : ""
                }`}
              >
                <div className="space-y-2">
                  <h3 className="text-[1.02rem] font-semibold text-black dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-6 text-black/70 dark:text-white/72">
                    {item.summary}
                  </p>
                </div>

                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    isActive ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  {isActive ? (
                    <div className="space-y-4 pt-1 lg:pl-4">
                      {item.content}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {activeMobile
        ? createPortal(
            <div className="fixed inset-0 z-[90] md:hidden" role="dialog" aria-modal="true">
              <button
                type="button"
                className="absolute inset-0 bg-black/55"
                aria-label="Close details dialog"
                onClick={() => setActiveMobileItem(null)}
              />
              <div className="fixed inset-0 z-[91] flex items-center justify-center p-4">
                <Card
                  variant="surface"
                  className="max-h-[85vh] w-full max-w-lg overflow-hidden rounded-[28px] border border-black/10 bg-[color:var(--surface)] shadow-2xl dark:border-white/10"
                >
                  <div className="flex items-start justify-between gap-4 border-b border-black/10 px-5 py-4 dark:border-white/10">
                    <h3 className="text-xl font-semibold text-black dark:text-white">
                      {activeMobile.title}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setActiveMobileItem(null)}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-[color:var(--surface-strong)] text-lg text-black dark:border-white/10 dark:text-white"
                      aria-label="Close details dialog"
                    >
                      ×
                    </button>
                  </div>
                  <div className="max-h-[calc(85vh-88px)] overflow-y-auto px-5 py-5">
                    {activeMobile.content}
                  </div>
                </Card>
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}
