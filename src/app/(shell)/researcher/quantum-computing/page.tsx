export default function QuantumComputingDocsHome() {
  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <p className="text-xs uppercase tracking-[0.35em] text-black/60">
          CS-first, NISQ-aware learning journey
        </p>
        <h2 className="font-display text-2xl text-black">
          Quantum Computing — Learning Overview
        </h2>
        <p className="max-w-4xl text-sm leading-6 text-black/70 sm:text-base">
          This section documents my structured learning journey in quantum
          computing—from core concepts and circuits to algorithms, real hardware
          constraints, and practical experiments. I focus on a computer-science
          perspective: how quantum computation is represented, programmed,
          tested, and limited on today’s noisy (NISQ) devices.
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          {[
            "IBM Quantum",
            "Qiskit",
            "NISQ",
            "Algorithms",
            "Noise",
            "Complexity",
          ].map((chip) => (
            <span
              key={chip}
              className="rounded-xl border border-black/10 bg-white/70 px-4 py-2 shadow-sm"
            >
              {chip}
            </span>
          ))}
        </div>
        <a
          className="inline-flex rounded-xl border border-black/10 bg-white/80 px-5 py-2.5 text-sm font-semibold text-black shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-black/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2 motion-reduce:transition-none"
          href="/researcher/quantum-computing/intro"
        >
          Start here
        </a>
      </section>

      <section className="space-y-4">
        <h3 className="font-display text-xl text-black">
          Why I Started Learning Quantum Computing
        </h3>
        <p className="max-w-4xl text-sm leading-6 text-black/70 sm:text-base">
          I started in a very hands-on engineering environment—building
          interactive systems that connect software to hardware: sensors,
          controllers, timing systems, and real-time feedback loops. Working
          close to hardware made me curious about what “next-generation
          computing hardware” looks like when the rules change at the physical
          level. That curiosity led me into quantum computing—not through
          physics-heavy theory first, but through practical computing questions:
          how do we represent information, how do we program it, and what breaks
          on real devices?
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="font-display text-xl text-black">
          How I’m Learning (Course + Practice)
        </h3>
        <p className="max-w-4xl text-sm leading-6 text-black/70 sm:text-base">
          To learn in a structured way, I enrolled in a quantum computing course
          offered by Packt on Coursera and I build alongside the material. I
          also cross-check concepts and APIs using official documentation and
          examples, especially from IBM’s Qiskit documentation and community
          resources.
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="font-display text-xl text-black">
          What You’ll Find in This Learning Section
        </h3>
        <p className="max-w-4xl text-sm leading-6 text-black/70 sm:text-base">
          This learning area is organized as a set of topic pages. Each page
          includes:
        </p>
        <ul className="space-y-2 text-sm text-black/70 sm:text-base">
          <li>Clear explanations (CS-first; no heavy physics/maths unless needed)</li>
          <li>Implementation notes (what worked, what didn’t, and why)</li>
          <li>Updated code (modernized APIs where necessary)</li>
          <li>
            Practical perspective (simulation vs real hardware, noise and
            errors)
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h3 className="font-display text-xl text-black">
          Q&amp;A Pages (My Questions + My Answers)
        </h3>
        <p className="max-w-4xl text-sm leading-6 text-black/70 sm:text-base">
          Each topic also has a dedicated Q&amp;A page containing the questions I
          genuinely had while learning, the best answers I found, and short
          clarification notes. This is meant to show the learning process—not
          just the final summary.
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="font-display text-xl text-black">A Note on Scope</h3>
        <p className="max-w-4xl text-sm leading-6 text-black/70 sm:text-base">
          This section is intentionally not a physics deep-dive. The goal is to
          build intuition for circuits, measurement, algorithmic speedups, and
          today’s hardware limits—especially noise, calibration effects, and
          decoherence.
        </p>
        <div className="rounded-2xl border border-black/10 bg-white/70 p-5 text-sm text-black/70 shadow-sm sm:text-base">
          If you’re looking for a clean, practical, CS-oriented path into
          quantum computing—this section is built for that.
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-2">
        {[
          {
            title: "Quantum Computing Intro",
            desc: "Foundations, motivations, and where quantum advantage appears.",
            href: "/researcher/quantum-computing/intro",
          },
          {
            title: "Qiskit Basics & Gates",
            desc: "Qiskit syntax, circuit building, and common gate patterns.",
            href: "/researcher/quantum-computing/qiskit-basics",
          },
          {
            title: "Qiskit Cloud Provider",
            desc: "Connecting to IBM Quantum, backend selection, and job runs.",
            href: "/researcher/quantum-computing/qiskit-cloud",
          },
          {
            title: "Algorithms",
            desc: "Grover, VQE, QFT, and other algorithmic explorations.",
            href: "/researcher/quantum-computing/algorithms",
          },
        ].map((item) => (
          <a
            key={item.title}
            href={item.href}
            className="rounded-2xl border border-black/10 bg-white/70 p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-black/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2 motion-reduce:transition-none"
          >
            <h3 className="text-base font-semibold text-black">{item.title}</h3>
            <p className="mt-2 text-sm text-black/60">{item.desc}</p>
            <span className="mt-4 inline-flex text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--accent-deep)]">
              Open
            </span>
          </a>
        ))}
      </section>
    </div>
  );
}
