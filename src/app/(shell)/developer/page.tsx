import { CertificationsSection } from "@/components/sections/certifications-section";
import { EducationSection } from "@/components/sections/education-section";
import { RevealSection } from "@/components/shared/reveal-section";
import Link from "next/link";
import { DeveloperSkillsSection } from "./components/DeveloperSkillsSection";
import { MobileCapabilityCarousel } from "./components/MobileCapabilityCarousel";
import { ProfessionalExperienceSection } from "./components/ProfessionalExperienceSection";
import { ProjectsSection } from "./components/ProjectsSection";

export default function DeveloperPage() {
  const mobileSectionSurface =
    "-mx-4 mt-10 w-[calc(100%+2rem)] max-w-none bg-[linear-gradient(180deg,rgba(255,255,255,0.62)_0%,rgba(255,255,255,0.18)_100%)] px-4 py-6 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.015)_100%)] sm:mx-0 sm:mt-0 sm:w-full sm:max-w-full sm:bg-none sm:px-0 sm:py-0 dark:sm:bg-none";
  const capabilityItems = [
    {
      title: "Realtime Systems",
      stack: [".NET", "State Flow"],
      lightSrc: "/tech_stack/NET.svg",
      darkSrc: "/tech_stack/NET.svg",
      filter: "runtime" as const,
    },
    {
      title: "Backend APIs",
      stack: ["Express", "MSSQL"],
      lightSrc: "/tech_stack/Express.Js.svg",
      darkSrc: "/tech_stack/Express.JsDark.svg",
      filter: "backend" as const,
    },
    {
      title: "Hardware",
      stack: ["Arduino", "Ethernet"],
      lightSrc: "/tech_stack/Arduino.svg",
      darkSrc: "/tech_stack/Arduino.svg",
      filter: "hardware" as const,
    },
    {
      title: "Frontend",
      stack: ["Next.js", "Realtime UI"],
      lightSrc: "/tech_stack/Next.js.svg",
      darkSrc: "/tech_stack/Next.jsDark.svg",
      filter: "frontend" as const,
    },
  ];
  const snapshotRows = [
    ["Primary Stack", "Next.js · .NET · Express · MSSQL"],
    ["Runtime", "Game state · scoring · timers · device comms"],
    ["Hardware", "NFC · COM · Ethernet · Arduino · ESP"],
    ["Delivery", "Deployment · troubleshooting · operations"],
  ] as const;

  return (
    <>
      <main
        id="intro"
        data-page-section="true"
        data-page-section-label="Intro"
        className="w-full max-w-full min-w-0"
      >
        <section className="space-y-5 sm:hidden">
          <p className="text-[11px] uppercase tracking-[0.28em] text-black/60 dark:text-white/60">
            Developer
          </p>
          <div className="space-y-3 pr-1">
            <h1 className="font-display text-[2.15rem] leading-[1] text-black dark:text-white">
              Production Systems Engineer
            </h1>
            <p className="text-[0.95rem] leading-6 text-black/70 dark:text-white/70">
              Full-stack product delivery across runtime systems, APIs,
              hardware integration, and operational UI.
            </p>
          </div>
          <MobileCapabilityCarousel items={capabilityItems} />
          <div className="flex flex-wrap gap-3 pt-1">
            <Link
              className="inline-flex items-center justify-center rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-black/20 dark:bg-white dark:text-black dark:hover:bg-white/90 dark:focus:ring-white/20"
              href="/developer#projects"
            >
              View Projects
            </Link>
            <Link
              className="inline-flex items-center justify-center rounded-full border border-black/15 px-5 py-2.5 text-sm font-semibold text-black transition hover:border-black/35 hover:bg-black/[0.03] dark:border-white/15 dark:text-white dark:hover:border-white/30 dark:hover:bg-white/[0.05]"
              href="/developer#contact"
            >
              Contact
            </Link>
          </div>
        </section>

        <div className="hidden w-full max-w-full min-w-0 gap-8 sm:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start lg:gap-10">
          <section className="space-y-6 sm:space-y-8">
            <p className="text-[11px] uppercase tracking-[0.28em] text-black/60 sm:text-xs sm:tracking-[0.35em]">
              Developer
            </p>
            <h1 className="font-display max-w-4xl text-3xl leading-[1.05] text-black sm:max-w-3xl sm:text-5xl lg:text-[3.5rem]">
              Building production systems across frontend, backend, and hardware
            </h1>
            <p className="max-w-2xl text-base leading-7 text-black/70 sm:text-lg sm:leading-8">
              I design and build real-world platforms that combine interactive
              UI, backend services, device communication, and operational
              tooling. My work spans kiosk systems, realtime game runtimes,
              controller networks, APIs, analytics, and staff applications used
              in live environments.
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "Full-stack systems",
                "Realtime platforms",
                "Hardware integration",
                "Production systems",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-black/10 bg-black/[0.03] px-3 py-1.5 text-xs font-semibold text-black/75 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/75"
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 pt-1 sm:gap-4">
              <Link
                className="inline-flex items-center justify-center rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-black/20 dark:bg-white dark:text-black dark:hover:bg-white/90 dark:focus:ring-white/20 sm:px-6 sm:py-3"
                href="/developer#projects"
              >
                View Projects
              </Link>
              <Link
                className="inline-flex items-center justify-center rounded-full border border-black/15 px-5 py-2.5 text-sm font-semibold text-black transition hover:border-black/35 hover:bg-black/[0.03] dark:border-white/15 dark:text-white dark:hover:border-white/30 dark:hover:bg-white/[0.05] sm:px-6 sm:py-3"
                href="/developer#contact"
              >
                Contact
              </Link>
            </div>
          </section>

          <aside className="border-t border-[color:var(--line)] pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <div className="space-y-5">
              <div className="space-y-2">
                <p className="text-[11px] uppercase tracking-[0.24em] text-black/50 dark:text-white/50">
                  Platform Snapshot
                </p>
                <h2 className="text-lg font-semibold text-black dark:text-white sm:text-xl">
                  Engineering overview
                </h2>
                <p className="text-sm leading-6 text-black/65 dark:text-white/65">
                  Most of the work shown here comes from shipping production
                  systems that connect UI, backend services, runtime logic, and
                  room hardware.
                </p>
              </div>

              <div className="divide-y divide-[color:var(--line)]">
                {snapshotRows.map(([label, value]) => (
                  <div
                    key={label}
                    className="space-y-1 py-3 first:pt-0 last:pb-0"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-black/50 dark:text-white/50">
                      {label}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-black/75 dark:text-white/75">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                href="/developer/aerosports"
                className="inline-flex items-center text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--accent-deep)]"
              >
                View AeroSports case study →
              </Link>
            </div>
          </aside>
        </div>
      </main>



      <RevealSection className={mobileSectionSurface}>
        <ProfessionalExperienceSection />
      </RevealSection>

      <RevealSection className={mobileSectionSurface}>
        <ProjectsSection />
      </RevealSection>

      <RevealSection className={mobileSectionSurface}>
        <DeveloperSkillsSection />
      </RevealSection>

      <RevealSection className={mobileSectionSurface}>
        <EducationSection context="developer" />
      </RevealSection>

      <RevealSection className={mobileSectionSurface}>
        <CertificationsSection
          context="developer"
          title="Developer Certifications"
          description="Credentials that reinforce my engineering practice and delivery focus."
        />
      </RevealSection>

      <RevealSection className={mobileSectionSurface}>
        <section
          id="contact"
          data-page-section="true"
          data-page-section-label="Contact"
          className="mt-16 w-full max-w-full min-w-0 rounded-[28px] border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-5 text-[color:var(--foreground)] sm:mt-20 sm:p-6"
        >
          <p className="text-[11px] uppercase tracking-[0.24em] text-[color:var(--muted)] sm:text-xs sm:tracking-[0.3em]">
            Interested?
          </p>
          <h2 className="font-display mt-3 text-xl sm:text-2xl">
            Interested in systems that bridge software and the real world?
          </h2>
          <p className="mt-4 text-sm leading-6 text-[color:var(--muted)]">
            I&apos;m especially interested in engineering roles involving
            full-stack platforms, backend systems, realtime products, device
            integration, and applied technical leadership.
          </p>
          <Link
            className="mt-6 inline-flex items-center justify-center rounded-full bg-[color:var(--foreground)] px-5 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--background)]"
            href="mailto:hello@example.com"
          >
            Get in Touch
          </Link>
        </section>
      </RevealSection>
    </>
  );
}
