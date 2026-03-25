import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { heroButtons, platformScopeItems } from "../data";

export function HeroSection() {
  return (
    <main
      id="top"
      data-page-section="true"
      data-page-section-label="Overview"
      className="grid w-full max-w-full min-w-0 gap-8 sm:gap-12 lg:grid-cols-[1.1fr_0.9fr]"
    >
      <section className="space-y-6 sm:space-y-8">
        <p className="text-[11px] uppercase tracking-[0.24em] text-black/60 sm:text-xs sm:tracking-[0.35em]">
          Developer Experience
        </p>
        <h1 className="font-display text-3xl leading-tight text-black sm:text-5xl lg:text-6xl">
          AeroSports - Technical Lead &amp; Full-Stack Game Systems
        </h1>
        <div className="max-w-2xl space-y-3">
          <p className="text-sm leading-6 text-black/75 dark:text-white/75 sm:text-lg sm:leading-7">
            I build real-time systems that connect software, hardware, and people
            - from game runtimes and APIs to physical device networks and
            interactive environments.
          </p>
          <p className="text-sm leading-6 text-black/60 dark:text-white/60 sm:text-base sm:leading-7">
            Built and scaled a production interactive gaming platform across
            multiple real-world environments.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
          {heroButtons.map((button) => {
            if (button.variant === "secondary") {
              return (
                <Link
                  key={button.href}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-black/20 px-5 py-3 text-sm font-semibold text-black transition hover:border-black sm:w-auto sm:px-6"
                  href={button.href}
                >
                  {button.label}
                </Link>
              );
            }

            return (
              <Link
                key={button.href}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background transition hover:bg-[#1f1b16] sm:w-auto sm:px-6"
                href={button.href}
              >
                {button.label}
              </Link>
            );
          })}
        </div>
      </section>

      <Card
        as="aside"
        variant="surface"
        className="w-full max-w-full min-w-0 rounded-[28px] p-4 shadow-[0_20px_70px_-50px_rgba(0,0,0,0.45)] sm:p-6"
      >
        <div className="space-y-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.24em] text-black/50 sm:text-xs sm:tracking-[0.3em]">
              Platform Scope
            </p>
          </div>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3">
            {platformScopeItems.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-black/10 bg-black/[0.03] px-3.5 py-3 text-sm font-medium text-black/75 dark:border-white/10 dark:bg-white/[0.03] dark:text-white/75"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-5 overflow-hidden rounded-2xl border border-black/10">
          <Image
            src="/developer/aerosports/game-rooms/hexaquest_complete2.jpeg"
            alt="AeroSports game room"
            width={1000}
            height={700}
            className="h-44 w-full object-cover sm:h-56"
          />
        </div>
      </Card>
    </main>
  );
}
