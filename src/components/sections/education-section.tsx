import Image from "next/image";
import { Card } from "@/components/ui/card";

type EducationSectionProps = {
  context?: "landing" | "developer" | "researcher";
};

export function EducationSection({ context = "landing" }: EducationSectionProps) {
  return (
    <section
      id="education"
      data-page-section="true"
      data-page-section-label="Education"
      className={context === "landing" ? "mt-16 space-y-6" : "mt-16 space-y-6"}
    >
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.35em] text-black/60 dark:text-white/60">
          Education
        </p>
        <h2 className="font-display text-2xl text-black dark:text-white sm:text-3xl">
          Education
        </h2>
      </div>

      <Card variant="surface" className="rounded-[28px] p-6 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div
              className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-black/10 p-2 shadow-sm sm:h-[4.5rem] sm:w-[4.5rem]"
              style={{ backgroundColor: "#eeeeee" }}
            >
              <div
                className="flex h-full w-full items-center justify-center rounded-md"
              >
                <Image
                  src="/company_logo/UPEI_logo.avif"
                  alt="University of Prince Edward Island"
                  width={120}
                  height={120}
                  className="max-h-full max-w-full object-contain"
                  unoptimized
                />
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-lg font-semibold text-black dark:text-white">
                B.Sc. Computer Science
              </p>
              <p className="text-sm text-black/60 dark:text-white/60 sm:text-base">
                Undergraduate degree in computer science with a strong focus on
                software engineering and systems thinking.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-black/10 bg-black/5 px-4 py-3 text-sm font-medium text-black/80 dark:border-white/10 dark:bg-white/5 dark:text-white/80 sm:text-base">
            Dean&apos;s Honours List - 2022
          </div>
        </div>
      </Card>
    </section>
  );
}
