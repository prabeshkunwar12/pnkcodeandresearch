import Link from "next/link";
import { Card } from "@/components/ui/card";
import { capabilityBlocks } from "../data";
import { SectionHeader } from "./SectionHeader";

export function CoreStrengthsSection() {
  return (
    <section
      id="core-strengths"
      data-page-section="true"
      data-page-section-label="What I Build"
      className="mt-16 w-full max-w-full min-w-0 scroll-mt-28 space-y-6 sm:mt-20 sm:space-y-8"
    >
      <SectionHeader
        eyebrow="Capabilities"
        title="What I Build & How It Works"
        description="A breakdown of the systems I design, build, and operate - with direct links to real implementations."
      />

      <div className="space-y-4 sm:space-y-5">
        {capabilityBlocks.map((block) => (
          <Card
            key={block.title}
            variant="surface"
            className="w-full rounded-[28px] p-4 text-black dark:text-white sm:p-5 lg:p-6"
          >
            <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8">
              <div className="space-y-3">
                <div className="space-y-2">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-black/45 dark:text-white/45">
                    {block.heading}
                  </p>
                  <h3 className="text-lg font-semibold sm:text-xl">
                    {block.title}
                  </h3>
                  <p className="text-sm leading-6 text-black/70 dark:text-white/70 sm:text-[15px]">
                    {block.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {block.projects.map((project) => (
                    <Link
                      key={project.href}
                      href={project.href}
                      className="inline-flex items-center rounded-full border border-black/10 bg-black/5 px-3 py-1.5 text-xs font-medium text-black transition hover:border-black/20 hover:bg-black/8 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-white/20 dark:hover:bg-white/8"
                    >
                      {project.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/50 dark:text-white/50">
                  Implementation Notes
                </p>
                <ul className="space-y-3">
                  {block.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-3 text-sm leading-6 text-black/72 dark:text-white/72"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-black/60 dark:bg-white/60" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
