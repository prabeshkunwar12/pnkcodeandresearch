import { CertificationsSection } from "@/components/sections/certifications-section";
import { EducationSection } from "@/components/sections/education-section";
import { ThemeImage } from "@/components/theme-image";

export default function Home() {
  return (
    <>
      <main className="w-full max-w-full min-w-0">
        <section
          id="intro"
          data-page-section="true"
          data-page-section-label="Intro"
          className="soft-card animate-fade-up grid w-full max-w-full min-w-0 gap-6 rounded-[28px] border border-[color:var(--line)] p-5 sm:gap-8 sm:p-8 lg:grid-cols-[280px_1fr] lg:items-center"
        >
          <div className="relative mx-auto h-44 w-44 overflow-hidden rounded-full border border-[color:var(--line)] shadow-[0_20px_60px_-45px_rgba(0,0,0,0.55)] sm:h-75 sm:w-75">
            <ThemeImage
              lightSrc="/profile_light.png"
              darkSrc="/profile_dark.png"
              alt="Prabesh Narsingh Kunwar"
              className="h-full w-full object-cover object-[58%_18%]"
            />
          </div>

          <div className="space-y-6 sm:space-y-8">
            <p className="animate-fade-up text-[11px] uppercase tracking-[0.3em] text-[color:var(--muted)] sm:text-xs sm:tracking-[0.35em]">
              Portfolio Gateway
            </p>
            <h1 className="font-display animate-fade-up reveal-delay-1 text-3xl leading-tight sm:text-5xl lg:text-6xl">
              Prabesh Narsingh Kunwar
            </h1>
            <p className="animate-fade-up reveal-delay-2 max-w-2xl text-sm leading-6 text-[color:var(--muted)] sm:text-lg sm:leading-7">
              I build <span className="text-highlight">full-stack products</span>{" "}
              and share my work through two focused profiles:{" "}
              <span className="text-highlight">engineering delivery</span> and{" "}
              <span className="text-highlight">research exploration</span>.
            </p>

            <div className="animate-fade-up reveal-delay-3 grid gap-4 lg:grid-cols-2">
              <a
                href="/developer"
                className="soft-card rounded-2xl border border-[color:var(--line)] p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md motion-reduce:transition-none sm:p-4"
              >
                <p className="text-[11px] uppercase tracking-[0.2em] text-[color:var(--muted)] sm:text-xs sm:tracking-[0.24em]">
                  Developer
                </p>
                <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                  Full-stack systems engineer building real-world platforms
                  across frontend, backend, and hardware.
                </p>
              </a>

              <a
                href="/researcher"
                className="soft-card rounded-2xl border border-[color:var(--line)] p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md motion-reduce:transition-none sm:p-4"
              >
                <p className="text-[11px] uppercase tracking-[0.2em] text-[color:var(--muted)] sm:text-xs sm:tracking-[0.24em]">
                  Researcher
                </p>
                <p className="mt-2 text-sm font-semibold">
                  Knowledge Exploration
                </p>
                <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
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
        className="mt-16 grid w-full max-w-full min-w-0 gap-4 sm:grid-cols-3"
      >
        {[
          { label: "Projects Built", value: "15+" },
          { label: "Certifications", value: "8" },
          { label: "Research Notes", value: "Growing" },
        ].map((item) => (
          <div
            key={item.label}
            className="soft-card rounded-2xl border border-[color:var(--line)] p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md motion-reduce:transition-none sm:p-5"
          >
            <p className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--muted)] sm:text-xs sm:tracking-[0.25em]">
              {item.label}
            </p>
            <p className="mt-2 text-xl font-semibold sm:mt-3 sm:text-2xl">{item.value}</p>
          </div>
        ))}
      </section>

      <section
        id="portfolio-overview"
        data-page-section="true"
        data-page-section-label="Portfolio Overview"
        className="soft-card mt-12 grid w-full max-w-full min-w-0 gap-5 rounded-[28px] border border-[color:var(--line)] p-5 sm:gap-6 sm:p-8 lg:grid-cols-[1.15fr_0.85fr]"
      >
        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-[0.24em] text-[color:var(--muted)] sm:text-xs sm:tracking-[0.28em]">
            What You&apos;ll Find Here
          </p>
          <h2 className="font-display mt-3 text-2xl leading-tight sm:text-3xl">
            A focused portfolio with{" "}
            <span className="text-highlight">execution</span> on one side and{" "}
            <span className="text-highlight">depth</span> on the other.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[color:var(--muted)] sm:mt-4 sm:text-base sm:leading-7">
            The developer side showcases{" "}
            <span className="text-highlight">production-ready</span>{" "}
            engineering work. The researcher side documents{" "}
            <span className="text-highlight">structured learning</span>, notes,
            and experiments with clear thinking and practical context.
          </p>
        </div>
        <div className="min-w-0 space-y-4">
          {[
            "Full-stack development with product-focused execution.",
            "Documentation-first learning and clear technical writing.",
            "Practical experimentation with reproducible notes.",
          ].map((item) => (
            <div
              key={item}
              className="soft-card rounded-xl border border-[color:var(--line)] px-4 py-3 text-sm text-[color:var(--muted)]"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <section
        id="profiles"
        data-page-section="true"
        data-page-section-label="Profiles"
        className="mt-12 grid w-full max-w-full min-w-0 gap-6 lg:grid-cols-2"
      >
        <div className="soft-card w-full max-w-full min-w-0 rounded-3xl border border-[color:var(--line)] p-5 sm:p-6">
          <p className="text-[11px] uppercase tracking-[0.24em] text-[color:var(--muted)] sm:text-xs sm:tracking-[0.28em]">
            Developer Focus
          </p>
          <h3 className="font-display mt-3 text-xl sm:text-2xl">
            Shipping <span className="text-highlight">robust products</span>{" "}
            and clean interfaces.
          </h3>
          <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
            I design and build end-to-end systems that operate in real-world
            environments - combining frontend interfaces, backend services,
            hardware communication, and operational workflows.
          </p>
          <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
            At AeroSports, I led the development of a full interactive gaming
            platform that includes kiosk systems, game engines, IoT
            controllers, APIs, analytics tools, and staff-facing applications.
            These systems are used in production and support real users in a
            live facility.
          </p>
          <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
            My work focuses on building scalable, reliable systems that
            integrate software and hardware seamlessly, while also improving
            usability for both customers and staff.
          </p>
          <a
            className="mt-5 inline-flex rounded-full border border-[color:var(--line)] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] transition hover:border-foreground"
            href="/developer"
          >
            Visit Developer Profile
          </a>
        </div>

        <div className="soft-card w-full max-w-full min-w-0 rounded-3xl border border-[color:var(--line)] p-5 sm:p-6">
          <p className="text-[11px] uppercase tracking-[0.24em] text-[color:var(--muted)] sm:text-xs sm:tracking-[0.28em]">
            Research Focus
          </p>
          <h3 className="font-display mt-3 text-xl sm:text-2xl">
            Structured exploration through{" "}
            <span className="text-highlight">technical documentation</span>.
          </h3>
          <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
            My research focus is in quantum computing, algorithms, and their
            applications in areas such as cryptography, optimization, and
            complex systems.
          </p>
          <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
            I explore both theoretical foundations and practical
            implementations using tools like Qiskit, working with real quantum
            hardware and analyzing the limitations of NISQ systems.
          </p>
          <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
            My goal is to contribute to advancing quantum algorithms and their
            real-world applications in fields like security, medicine, and data
            science.
          </p>
          <a
            className="mt-5 inline-flex rounded-full border border-[color:var(--line)] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] transition hover:border-foreground"
            href="/researcher"
          >
            Visit Researcher Profile
          </a>
        </div>
      </section>

      <EducationSection context="landing" />

      <CertificationsSection
        context="landing"
        title="Certifications"
        description="Credentials that support my work across quantum computing, software engineering, and project delivery."
      />
    </>
  );
}
