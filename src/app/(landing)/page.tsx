import { CertificationsSection } from "@/components/sections/certifications-section";
import { ThemeImage } from "@/components/theme-image";

export default function Home() {
  return (
    <>
      <main>
        <section
          id="intro"
          data-page-section="true"
          data-page-section-label="Intro"
          className="soft-card animate-fade-up grid gap-8 rounded-[28px] border border-(--line) p-6 sm:p-8 lg:grid-cols-[280px_1fr] lg:items-center"
        >
          <div className="relative mx-auto h-65 w-65 overflow-hidden rounded-full border border-(--line) shadow-[0_20px_60px_-45px_rgba(0,0,0,0.55)] sm:h-75 sm:w-75">
            <ThemeImage
              lightSrc="/profile_light.png"
              darkSrc="/profile_dark.png"
              alt="Prabesh Narsingh Kunwar"
              className="h-full w-full object-cover object-[58%_18%]"
            />
          </div>

          <div className="space-y-8">
            <p className="animate-fade-up text-xs uppercase tracking-[0.35em] text-(--muted)">
              Portfolio Gateway
            </p>
            <h1 className="font-display animate-fade-up reveal-delay-1 text-4xl leading-tight sm:text-5xl lg:text-6xl">
              Prabesh Narsingh Kunwar
            </h1>
            <p className="animate-fade-up reveal-delay-2 max-w-2xl text-base leading-7 text-(--muted) sm:text-lg">
              I build <span className="text-highlight">full-stack products</span>{" "}
              and share my work through two focused profiles:{" "}
              <span className="text-highlight">engineering delivery</span> and{" "}
              <span className="text-highlight">research exploration</span>.
            </p>

            <div className="animate-fade-up reveal-delay-3 grid gap-4 lg:grid-cols-2">
              <a
                href="/developer"
                className="soft-card rounded-2xl border border-(--line) p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md motion-reduce:transition-none"
              >
                <p className="text-xs uppercase tracking-[0.24em] text-(--muted)">
                  Developer
                </p>
                <p className="mt-2 text-sm font-semibold">
                  Engineering Delivery
                </p>
                <p className="mt-2 text-sm text-(--muted)">
                  Production-focused projects, system design, and full-stack case
                  studies.
                </p>
              </a>

              <a
                href="/researcher"
                className="soft-card rounded-2xl border border-(--line) p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md motion-reduce:transition-none"
              >
                <p className="text-xs uppercase tracking-[0.24em] text-(--muted)">
                  Researcher
                </p>
                <p className="mt-2 text-sm font-semibold">
                  Knowledge Exploration
                </p>
                <p className="mt-2 text-sm text-(--muted)">
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
        className="mt-16 grid gap-4 sm:grid-cols-3"
      >
        {[
          { label: "Projects Built", value: "15+" },
          { label: "Certifications", value: "8" },
          { label: "Research Notes", value: "Growing" },
        ].map((item) => (
          <div
            key={item.label}
            className="soft-card rounded-2xl border border-(--line) p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md motion-reduce:transition-none"
          >
            <p className="text-xs uppercase tracking-[0.25em] text-(--muted)">
              {item.label}
            </p>
            <p className="mt-3 text-2xl font-semibold">{item.value}</p>
          </div>
        ))}
      </section>

      <section
        id="portfolio-overview"
        data-page-section="true"
        data-page-section-label="Portfolio Overview"
        className="soft-card mt-12 grid gap-6 rounded-[28px] border border-(--line) p-6 sm:p-8 lg:grid-cols-[1.15fr_0.85fr]"
      >
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-(--muted)">
            What You&apos;ll Find Here
          </p>
          <h2 className="font-display mt-3 text-3xl leading-tight">
            A focused portfolio with{" "}
            <span className="text-highlight">execution</span> on one side and{" "}
            <span className="text-highlight">depth</span> on the other.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-(--muted) sm:text-base">
            The developer side showcases{" "}
            <span className="text-highlight">production-ready</span>{" "}
            engineering work. The researcher side documents{" "}
            <span className="text-highlight">structured learning</span>, notes,
            and experiments with clear thinking and practical context.
          </p>
        </div>
        <div className="space-y-4">
          {[
            "Full-stack development with product-focused execution.",
            "Documentation-first learning and clear technical writing.",
            "Practical experimentation with reproducible notes.",
          ].map((item) => (
            <div
              key={item}
              className="soft-card rounded-xl border border-(--line) px-4 py-3 text-sm text-(--muted)"
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
        className="mt-12 grid gap-6 lg:grid-cols-2"
      >
        <div className="soft-card rounded-3xl border border-(--line) p-6">
          <p className="text-xs uppercase tracking-[0.28em] text-(--muted)">
            Developer Focus
          </p>
          <h3 className="font-display mt-3 text-2xl">
            Shipping <span className="text-highlight">robust products</span>{" "}
            and clean interfaces.
          </h3>
          <p className="mt-3 text-sm leading-6 text-(--muted)">
            System design, modern frontend architecture, and backend services
            with attention to{" "}
            <span className="text-highlight">reliability</span> and developer
            experience.
          </p>
          <a
            className="mt-5 inline-flex rounded-full border border-(--line) px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] transition hover:border-foreground"
            href="/developer"
          >
            Visit Developer Profile
          </a>
        </div>

        <div className="soft-card rounded-3xl border border-(--line) p-6">
          <p className="text-xs uppercase tracking-[0.28em] text-(--muted)">
            Research Focus
          </p>
          <h3 className="font-display mt-3 text-2xl">
            Structured exploration through{" "}
            <span className="text-highlight">technical documentation</span>.
          </h3>
          <p className="mt-3 text-sm leading-6 text-(--muted)">
            Topic-based learning pages, practical notes, and question-driven
            insights designed to make{" "}
            <span className="text-highlight">complex ideas easier</span> to
            follow.
          </p>
          <a
            className="mt-5 inline-flex rounded-full border border-(--line) px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] transition hover:border-foreground"
            href="/researcher"
          >
            Visit Researcher Profile
          </a>
        </div>
      </section>

      <CertificationsSection
        context="landing"
        title="Certifications"
        description="Credentials that support my work across quantum computing, software engineering, and project delivery."
      />
    </>
  );
}
