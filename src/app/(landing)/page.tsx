import { CertificationsSection } from "@/components/sections/certifications-section";
import { EducationSection } from "@/components/sections/education-section";
import { ThemeImage } from "@/components/theme-image";
import { FocusPreviewCard } from "./focus-preview-card";
import { LandingRevealSection } from "./landing-reveal-section";

export default function Home() {
  const mobileSectionSurface =
    "-mx-4 w-[calc(100%+2rem)] max-w-none bg-[linear-gradient(180deg,rgba(255,255,255,0.62)_0%,rgba(255,255,255,0.18)_100%)] px-4 py-6 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.015)_100%)] sm:mx-0 sm:w-full sm:max-w-full sm:bg-none sm:px-0 sm:py-0 dark:sm:bg-none";

  return (
    <>
      <main className="w-full max-w-full min-w-0">
        <section
          id="intro"
          data-page-section="true"
          data-page-section-label="Intro"
          className="animate-fade-up grid w-full max-w-full min-w-0 gap-5 py-2 sm:gap-5 sm:px-1 sm:py-2 md:soft-card md:rounded-[28px] md:border md:border-[color:var(--line)] md:p-5 lg:grid-cols-[280px_1fr] lg:items-center lg:gap-7 lg:p-8"
        >
          <div className="space-y-2.5 sm:space-y-0">
            <p className="animate-fade-up text-xs font-medium uppercase tracking-[0.18em] text-black/55 dark:text-white/55 sm:hidden">
              Portfolio Gateway
            </p>

            <div className="flex justify-center sm:block">
              <div className="relative h-36 w-36 shrink-0 overflow-hidden rounded-full border border-[color:var(--line)] shadow-[0_20px_60px_-45px_rgba(0,0,0,0.55)] sm:mx-auto sm:h-44 sm:w-44 md:h-48 md:w-48 lg:h-75 lg:w-75">
                <ThemeImage
                  lightSrc="/profile_light.png"
                  darkSrc="/profile_dark.png"
                  alt="Prabesh Narsingh Kunwar"
                  className="h-full w-full object-cover object-[58%_18%]"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4 md:space-y-6">
            <p className="animate-fade-up hidden text-xs font-medium uppercase tracking-[0.22em] text-[color:var(--muted)] sm:block md:tracking-[0.3em]">
              Portfolio Gateway
            </p>
            <h1 className="font-display animate-fade-up reveal-delay-1 text-2xl leading-tight sm:text-3xl md:text-5xl lg:text-6xl">
              Prabesh Narsingh Kunwar
            </h1>
            <p className="animate-fade-up reveal-delay-2 max-w-lg text-sm leading-6 text-black/70 dark:text-white/70 sm:max-w-xl md:max-w-2xl md:text-lg md:leading-7">
              I build <span className="text-highlight">full-stack products</span>{" "}
              and share my work through two focused profiles:{" "}
              <span className="text-highlight">engineering delivery</span> and{" "}
              <span className="text-highlight">research exploration</span>.
            </p>

            <div className="animate-fade-up reveal-delay-3 grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-2">
              <a
                href="/developer"
                className="rounded-2xl border border-black/10 bg-black px-3 py-3 text-center text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-black/90 hover:shadow-md motion-reduce:transition-none dark:border-white/10 dark:bg-white dark:text-black dark:hover:bg-white/90 sm:border-[color:var(--line)] sm:bg-[color:var(--surface)] sm:text-inherit sm:hover:bg-[color:var(--surface)] sm:p-3.5 md:soft-card md:border md:border-[color:var(--line)] md:bg-[color:var(--surface)] md:text-inherit md:hover:bg-[color:var(--surface)] md:dark:bg-[color:var(--surface)] md:dark:text-inherit md:dark:hover:bg-[color:var(--surface)] md:p-4"
              >
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/75 dark:text-black/70 sm:text-xs sm:tracking-[0.2em] sm:text-[color:var(--muted)] md:text-[color:var(--muted)] md:dark:text-[color:var(--muted)] md:tracking-[0.24em]">
                  Developer
                </p>
                <p className="mt-1.5 text-sm text-white/40 dark:text-black/30 sm:hidden">→</p>
                <p className="mt-1.5 hidden text-[12px] leading-5 text-[color:var(--muted)] sm:mt-2 sm:block sm:text-[13px] sm:leading-5 md:text-sm md:leading-6">
                  Full-stack systems engineer building real-world platforms
                  across frontend, backend, and hardware.
                </p>
              </a>

              <a
                href="/researcher"
                className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface)] px-3 py-3 text-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md motion-reduce:transition-none sm:p-3.5 md:soft-card md:border md:border-[color:var(--line)] md:bg-[color:var(--surface)] md:p-4"
              >
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[color:var(--muted)] sm:text-xs sm:tracking-[0.2em] md:tracking-[0.24em]">
                  Researcher
                </p>
                <p className="mt-1.5 text-sm text-[color:var(--muted)]/50 sm:hidden">→</p>
                <p className="mt-1.5 hidden text-[12px] leading-5 text-[color:var(--muted)] sm:mt-2 sm:block sm:text-[13px] sm:leading-5 md:text-sm md:leading-6">
                  Deep-dives into research topics, structured notes, and long-form
                  technical documentation.
                </p>
              </a>
            </div>
          </div>
        </section>
      </main>

      <section
        id="highlights"
        data-page-section="true"
        data-page-section-label="Highlights"
        className="mt-8 w-full max-w-full min-w-0 sm:mt-12"
      >
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          {[
            { label: "Projects", value: "15+" },
            { label: "Certifications", value: "8" },
            { label: "Research", value: "Active" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface)] p-2.5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md motion-reduce:transition-none sm:p-4 md:soft-card md:p-5"
            >
              <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[color:var(--muted)] sm:text-xs sm:tracking-[0.18em] md:tracking-[0.25em]">
                {item.label}
              </p>
              <p className="mt-1 text-base font-semibold sm:mt-2.5 sm:text-xl md:text-2xl">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <LandingRevealSection className={`mt-8 ${mobileSectionSurface} sm:mt-12`}>
        <section
          id="portfolio-overview"
          data-page-section="true"
          data-page-section-label="Portfolio Overview"
          className="grid w-full max-w-full min-w-0 gap-3 sm:gap-4 sm:px-1 md:soft-card md:rounded-[28px] md:border md:border-[color:var(--line)] md:p-5 lg:grid-cols-[1.15fr_0.85fr] lg:gap-6 lg:p-8"
        >
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--muted)] sm:tracking-[0.22em] md:tracking-[0.28em]">
              What You&apos;ll Find Here
            </p>
            <h2 className="font-display mt-2 text-2xl leading-tight sm:mt-2.5 sm:text-2xl md:mt-3 md:text-3xl">
              A focused portfolio with{" "}
              <span className="text-highlight">execution</span> on one side and{" "}
              <span className="text-highlight">depth</span> on the other.
            </h2>
            <p className="mt-2 hidden max-w-2xl text-sm leading-6 text-black/70 dark:text-white/70 sm:mt-3 sm:block md:mt-4 md:text-base md:leading-7">
              The developer side showcases{" "}
              <span className="text-highlight">production-ready</span>{" "}
              engineering work. The researcher side documents{" "}
              <span className="text-highlight">structured learning</span>, notes,
              and experiments with clear thinking and practical context.
            </p>
          </div>
          <div className="min-w-0 space-y-2 sm:space-y-3 md:space-y-4">
            {[
              "Full-stack development with product-focused execution.",
              "Documentation-first learning and clear technical writing.",
              "Practical experimentation with reproducible notes.",
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-[color:var(--line)] bg-[color:var(--surface)] px-3 py-2.5 text-sm leading-6 text-black/70 dark:text-white/70 sm:px-3.5 sm:py-3 md:soft-card md:px-4"
              >
                {item}
              </div>
            ))}
          </div>
        </section>
      </LandingRevealSection>

      <LandingRevealSection className={`mt-8 ${mobileSectionSurface} sm:mt-12`}>
        <section
          id="profiles"
          data-page-section="true"
          data-page-section-label="Profiles"
          className="grid w-full max-w-full min-w-0 gap-3.5 sm:gap-4 lg:grid-cols-2 lg:gap-6"
        >
          <FocusPreviewCard
            eyebrow="Developer Focus"
            title="Shipping robust products and clean interfaces."
            href="/developer"
            ctaLabel="Visit Developer Profile"
            paragraphs={[
              "I design and build end-to-end systems that operate in real-world environments - combining frontend interfaces, backend services, hardware communication, and operational workflows.",
              "At AeroSports, I led the development of a full interactive gaming platform that includes kiosk systems, game engines, IoT controllers, APIs, analytics tools, and staff-facing applications. These systems are used in production and support real users in a live facility.",
              "My work focuses on building scalable, reliable systems that integrate software and hardware seamlessly, while also improving usability for both customers and staff.",
            ]}
          />

          <FocusPreviewCard
            eyebrow="Research Focus"
            title="Structured exploration through technical documentation."
            href="/researcher"
            ctaLabel="Visit Researcher Profile"
            paragraphs={[
              "My research focus is in quantum computing, algorithms, and their applications in areas such as cryptography, optimization, and complex systems.",
              "I explore both theoretical foundations and practical implementations using tools like Qiskit, working with real quantum hardware and analyzing the limitations of NISQ systems.",
              "My goal is to contribute to advancing quantum algorithms and their real-world applications in fields like security, medicine, and data science.",
            ]}
          />
        </section>
      </LandingRevealSection>

      <LandingRevealSection className={mobileSectionSurface}>
        <EducationSection context="landing" />
      </LandingRevealSection>

      <LandingRevealSection className={mobileSectionSurface}>
        <CertificationsSection
          context="landing"
          title="Certifications"
          description="Credentials that support my work across quantum computing, software engineering, and project delivery."
        />
      </LandingRevealSection>
    </>
  );
}
