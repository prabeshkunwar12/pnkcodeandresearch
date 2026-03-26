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
      className={context === "landing" ? "mt-10 space-y-4 sm:mt-14 sm:space-y-5" : "mt-16 space-y-6"}
    >
      <div className="space-y-1.5 sm:space-y-2">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-black/60 dark:text-white/60 sm:tracking-[0.3em]">
          Education
        </p>
        <h2 className="font-display text-2xl text-black dark:text-white sm:text-3xl">
          Education
        </h2>
      </div>

      <Card
        variant="surface"
        className={`rounded-[24px] ${context === "landing" ? "border-black/8 p-3.5 sm:rounded-[28px] sm:p-5 md:p-8" : "p-6 sm:p-8"}`}
      >
        <div className="flex flex-col gap-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
          <div className="flex items-center gap-3 sm:gap-4">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-black/10 p-2 shadow-sm sm:h-[4.5rem] sm:w-[4.5rem]"
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

            <div className="space-y-0.5 sm:space-y-1">
              <p className="text-base font-semibold text-black dark:text-white sm:text-lg">
                B.Sc. Computer Science
              </p>
              <p className="text-sm font-medium text-black/75 dark:text-white/75 md:text-base">
                University of Prince Edward Island
              </p>
              <p className="text-sm leading-6 text-black/65 dark:text-white/65 hidden lg:block md:text-base">
                Undergraduate degree in computer science with a strong focus on
                software engineering and systems thinking.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-black/10 bg-black/5 px-3 py-2 text-xs font-medium text-black/80 dark:border-white/10 dark:bg-white/5 dark:text-white/80 sm:px-4 sm:py-3 sm:text-base">
            Dean&apos;s Honours List - 2022
          </div>
        </div>
      </Card>
    </section>
  );
}
