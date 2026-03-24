import { CertificationsSection } from "@/components/sections/certifications-section";
import { EducationSection } from "@/components/sections/education-section";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { CoreStrengthsSection } from "./components/CoreStrengthsSection";
import { ProfessionalExperienceSection } from "./components/ProfessionalExperienceSection";
import { ProjectsSection } from "./components/ProjectsSection";

export default function DeveloperPage() {
  return (
    <>
      <main className="grid w-full max-w-full min-w-0 gap-8 lg:gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <section
          id="intro"
          data-page-section="true"
          data-page-section-label="Intro"
          className="space-y-6 sm:space-y-8"
        >
          <p className="text-[11px] uppercase tracking-[0.28em] text-black/60 sm:text-xs sm:tracking-[0.35em]">
            Developer
          </p>
          <h1 className="font-display text-3xl leading-tight text-black sm:text-5xl lg:text-6xl">
            Building production systems across frontend, backend, and hardware
          </h1>
          <p className="max-w-xl text-sm leading-6 text-black/70 sm:text-lg sm:leading-7">
            I design and build real-world platforms that combine interactive
            UI, backend services, device communication, and operational
            tooling. My work spans kiosk systems, realtime game runtimes,
            IoT/controller networks, APIs, analytics, and staff-facing
            applications used in live facilities.
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              "Full-stack systems",
              "Realtime platforms",
              "Hardware integration",
              "Production workflows",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-black/10 bg-white/80 px-3 py-1.5 text-[11px] font-semibold text-black/75 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/75"
              >
                {item}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <Link
              className="inline-flex items-center gap-2 rounded-full bg-[color:var(--foreground)] px-5 py-2.5 text-sm font-semibold text-[color:var(--background)] transition hover:bg-[#1f1b16] sm:px-6 sm:py-3"
              href="/developer#projects"
            >
              View Projects
            </Link>
            <Link
              className="inline-flex items-center gap-2 rounded-full border border-black/20 px-5 py-2.5 text-sm font-semibold text-black transition hover:border-black sm:px-6 sm:py-3"
              href="/developer#contact"
            >
              Contact
            </Link>
          </div>
        </section>

        <Card
          as="aside"
          variant="surface"
          className="w-full max-w-full min-w-0 rounded-[28px] p-4 shadow-[0_20px_70px_-50px_rgba(0,0,0,0.45)] sm:p-6"
        >
          <p className="text-[11px] uppercase tracking-[0.24em] text-black/50 sm:text-xs sm:tracking-[0.3em]">
            Engineering Focus
          </p>
          <div className="mt-4 grid gap-3">
            {[
              "Kiosk UI · Next.js · React",
              "Runtime host · .NET · WebView",
              "Backend API · Express · MSSQL",
              "Controllers · Arduino · ESP · COM/Ethernet",
              "Operations · Analytics · Admin tooling",
            ].map((item) => (
              <Card
                key={item}
                className="px-4 py-3 text-sm leading-6 text-black/70"
              >
                {item}
              </Card>
            ))}
          </div>
        </Card>
      </main>

      <ProfessionalExperienceSection />

      <CoreStrengthsSection />

      <ProjectsSection />

      <Card
        as="section"
        id="skills"
        data-page-section="true"
        data-page-section-label="Skills"
        className="mt-16 grid w-full max-w-full min-w-0 gap-5 rounded-[32px] px-4 py-8 backdrop-blur sm:mt-20 sm:gap-6 sm:px-6 sm:py-10"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-[0.24em] text-black/50 sm:text-xs sm:tracking-[0.3em]">
              Developer Skills
            </p>
            <h2 className="font-display mt-3 text-xl text-black sm:text-2xl">
              Supporting skills that help systems ship.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-black/60">
            Architecture, delivery, and reliability work that supports the
            product-facing systems shown above.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {[
            "API design",
            "System architecture",
            "Performance tuning",
            "Design systems",
            "Security best practices",
            "Team mentorship",
          ].map((item) => (
            <span
              key={item}
              className="rounded-full border border-black/10 bg-white px-3 py-2 text-[11px] font-semibold text-black/80 sm:px-4 sm:text-xs"
            >
              {item}
            </span>
          ))}
        </div>
      </Card>

      <EducationSection context="developer" />

      <CertificationsSection
        context="developer"
        title="Developer Certifications"
        description="Credentials that reinforce my engineering practice and delivery focus."
      />

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
    </>
  );
}
