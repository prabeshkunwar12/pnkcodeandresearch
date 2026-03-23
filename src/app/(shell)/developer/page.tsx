import { CertificationsSection } from "@/components/sections/certifications-section";
import { EducationSection } from "@/components/sections/education-section";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { ProfessionalExperienceSection } from "./components/ProfessionalExperienceSection";
import { ProjectsSection } from "./components/ProjectsSection";

export default function DeveloperPage() {
  return (
    <>
      <main className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <section
          id="intro"
          data-page-section="true"
          data-page-section-label="Intro"
          className="space-y-8"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-black/60">
            Developer Profile
          </p>
          <h1 className="font-display text-4xl leading-tight text-black sm:text-5xl lg:text-6xl">
            Building product-ready software and scalable systems.
          </h1>
          <p className="max-w-xl text-base leading-7 text-black/70 sm:text-lg">
            I focus on full-stack delivery, performance, and thoughtful user
            experiences. Here are the skills, projects, and proof points that
            define my developer journey.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              className="inline-flex items-center gap-2 rounded-full bg-[color:var(--foreground)] px-6 py-3 text-sm font-semibold text-[color:var(--background)] transition hover:bg-[#1f1b16]"
              href="/developer#projects"
            >
              View Projects
            </Link>
            <Link
              className="inline-flex items-center gap-2 rounded-full border border-black/20 px-6 py-3 text-sm font-semibold text-black transition hover:border-black"
              href="/developer#contact"
            >
              Contact
            </Link>
          </div>
        </section>

        <Card
          as="aside"
          variant="surface"
          className="rounded-[28px] p-6 shadow-[0_20px_70px_-50px_rgba(0,0,0,0.45)]"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-black/50">
            Core Stack
          </p>
          <div className="mt-4 grid gap-3">
            {[
              "Next.js · React",
              "TypeScript · Node.js",
              "PostgreSQL · Prisma",
              "AWS · Serverless",
              "CI/CD · Testing",
            ].map((item) => (
              <Card
                key={item}
                className="px-4 py-3 text-sm text-black/70"
              >
                {item}
              </Card>
            ))}
          </div>
        </Card>
      </main>

      <ProfessionalExperienceSection />

      <ProjectsSection />

      <Card
        as="section"
        id="skills"
        data-page-section="true"
        data-page-section-label="Skills"
        className="mt-20 grid gap-6 rounded-[32px] px-6 py-10 backdrop-blur"
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-black/50">
              Developer Skills
            </p>
            <h2 className="font-display mt-3 text-2xl text-black">
              Engineering depth across the stack.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-black/60">
            From architecture to frontend polish, I focus on scalable and
            resilient software.
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
              className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold text-black/80"
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
        className="mt-20 rounded-[28px] border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-6 text-[color:var(--foreground)]"
      >
        <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
          Let&apos;s build
        </p>
        <h2 className="font-display mt-3 text-2xl">
          Open for product collaborations and engineering roles.
        </h2>
        <p className="mt-4 text-sm text-[color:var(--muted)]">
          Add your email, portfolio PDF, or scheduling link here.
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
