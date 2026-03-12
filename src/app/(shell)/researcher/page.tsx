import { CertificationsSection } from "@/components/sections/certifications-section";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function ResearchPage() {
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
            Research Page
          </p>
          <h1 className="font-display text-4xl leading-tight text-black sm:text-5xl lg:text-6xl">
            Exploring quantum computing with practical curiosity.
          </h1>
          <p className="max-w-xl text-base leading-7 text-black/70 sm:text-lg">
            My research focus is centered on quantum computing, from
            foundational theory to applied experiments. This page highlights
            the projects, topics, and learning notes I&apos;m developing.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition hover:bg-[#1f1b16]"
              href="#projects"
            >
              View Projects
            </Link>
            <Link
              className="inline-flex items-center gap-2 rounded-full border border-black/20 px-6 py-3 text-sm font-semibold text-black transition hover:border-black"
              href="#blog"
            >
              Read Blog
            </Link>
          </div>
        </section>

        <Card
          as="aside"
          id="research-interests"
          data-page-section="true"
          data-page-section-label="Research Interests"
          variant="surface"
          className="rounded-[28px] p-6 shadow-[0_20px_70px_-50px_rgba(0,0,0,0.45)]"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-black/50">
            Research Interests
          </p>
          <div className="mt-4 grid gap-3">
            {[
              "Quantum algorithms",
              "Quantum error correction",
              "Quantum simulation",
              "Qubit architectures",
              "Hybrid classical-quantum workflows",
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

      <section
        id="projects"
        data-page-section="true"
        data-page-section-label="Projects"
        className="mt-20 grid gap-6 lg:grid-cols-[0.45fr_0.55fr]"
      >
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-black/50">
            Quantum Projects
          </p>
          <h2 className="font-display mt-3 text-3xl text-black">
            Experiments and prototypes in quantum computing.
          </h2>
          <p className="mt-4 text-sm text-black/60">
            Replace these with your actual experiments and write-ups.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              title: "Foundational Quantum Computing Notes",
              desc: "Updated Qiskit notebooks with explanations and Q&A.",
              href: "/researcher/quantum-computing",
            },
            {
              title: "Quantum Error Mitigation",
              desc: "Techniques to improve results on NISQ devices.",
              href: "#",
            },
            {
              title: "Grover Search Demo",
              desc: "Hands-on implementation with Qiskit workflows.",
              href: "#",
            },
            {
              title: "Quantum Simulation Notes",
              desc: "Modeling simple physical systems with circuits.",
              href: "#",
            },
          ].map((project) => (
            <Card
              key={project.title}
              variant="surface"
              hover
              className="p-5"
            >
              <h3 className="text-base font-semibold text-black">
                {project.title}
              </h3>
              <p className="mt-2 text-sm text-black/60">{project.desc}</p>
              <Link
                className="mt-4 inline-flex text-xs font-semibold uppercase tracking-[0.25em] text-(--accent-deep)"
                href={project.href}
              >
                View Project
              </Link>
            </Card>
          ))}
        </div>
      </section>

      <Card
        as="section"
        id="blog"
        data-page-section="true"
        data-page-section-label="Blog Notes"
        className="mt-20 grid gap-6 rounded-4xl px-6 py-10 backdrop-blur"
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-black/50">
              Blog Notes
            </p>
            <h2 className="font-display mt-3 text-2xl text-black">
              Learning logs and research reflections.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-black/60">
            Posts can live here or link out to a dedicated blog section.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              title: "Quantum Computing Roadmap",
              desc: "What I&apos;m learning first and why it matters.",
            },
            {
              title: "Notes on Qiskit",
              desc: "Practical experiments with circuit building.",
            },
            {
              title: "Error Correction Primer",
              desc: "Key ideas behind stabilizer codes.",
            },
            {
              title: "Future Work",
              desc: "Ideas I want to explore in upcoming months.",
            },
          ].map((post) => (
            <Card
              as="article"
              key={post.title}
              hover
              className="px-5 py-4"
            >
              <h3 className="text-base font-semibold text-black">
                {post.title}
              </h3>
              <p className="mt-2 text-sm text-black/60">{post.desc}</p>
              <Link
                className="mt-4 inline-flex text-xs font-semibold uppercase tracking-[0.25em] text-(--accent-deep)"
                href="#"
              >
                Read Post
              </Link>
            </Card>
          ))}
        </div>
      </Card>

      <CertificationsSection
        context="researcher"
        title="Research & Quantum Certifications"
        description="Coursework and credentials that anchor my quantum computing research path."
      />

      <section
        id="contact"
        data-page-section="true"
        data-page-section-label="Contact"
        className="mt-20 rounded-[28px] border border-(--line) bg-(--surface-strong) p-6 text-foreground"
      >
        <p className="text-xs uppercase tracking-[0.3em] text-(--muted)">
          Let&apos;s research
        </p>
        <h2 className="font-display mt-3 text-2xl">
          Open to collaborations and quantum computing discussions.
        </h2>
        <p className="mt-4 text-sm text-(--muted)">
          Add your email, research profiles, or academic links here.
        </p>
        <Link
          className="mt-6 inline-flex items-center justify-center rounded-full bg-foreground px-5 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-background"
          href="mailto:hello@example.com"
        >
          Reach Out
        </Link>
      </section>
    </>
  );
}
