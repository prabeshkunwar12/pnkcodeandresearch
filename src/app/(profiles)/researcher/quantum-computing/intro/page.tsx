import { quantumIntroQa } from "./qa";

export default function QuantumIntroPage() {
  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <h2 className="font-display text-2xl text-black">
          Quantum Computing: Separating Myth from Reality
        </h2>
        <p className="max-w-4xl text-sm leading-6 text-black/70 sm:text-base">
          Quantum computing is often described as the future of computing—faster,
          smarter, and capable of solving problems that classical computers never
          could. While there is truth behind the excitement, much of the popular
          narrative is incomplete or misleading. Before diving into algorithms
          or circuits, it’s important to understand what quantum computers
          really are, what they are not, and why they work so differently from
          classical machines.
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="font-display text-xl text-black">
          Common Myths About Quantum Computing
        </h3>
        <p className="text-sm text-black/70 sm:text-base">
          Quantum computing is surrounded by powerful myths. Let’s address the
          most common ones first.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              title: "Quantum computers are just faster computers",
              text: "A common belief is that quantum computers are simply faster versions of classical computers. In reality, they are not universally faster. Quantum computers only provide speedups for specific types of problems, and for most everyday tasks, classical computers remain far more efficient.",
            },
            {
              title: "Quantum computers can replace classical computers",
              text: "Quantum computers are not designed to replace classical computers. They are specialized machines meant to work alongside classical systems, solving particular subproblems rather than handling general-purpose workloads like web browsing, databases, or gaming.",
            },
            {
              title: "Quantum computers are always more efficient",
              text: "Quantum algorithms are not automatically more efficient. Many problems see no advantage at all, and some quantum approaches are slower once hardware limitations and error rates are considered.",
            },
          ].map((myth) => (
            <div
              key={myth.title}
              className="rounded-2xl border border-black/10 bg-white/70 p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md motion-reduce:transition-none"
            >
              <p className="text-sm font-semibold text-black">{myth.title}</p>
              <p className="mt-2 text-sm text-black/60 sm:text-base">
                {myth.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="font-display text-xl text-black">
          The Reality of Quantum Computing Today
        </h3>
        <p className="max-w-4xl text-sm leading-6 text-black/70 sm:text-base">
          Quantum computers today are powerful in a very narrow sense. They can
          exploit quantum mechanical effects such as superposition and
          interference, but only under highly controlled conditions.
        </p>
        <p className="max-w-4xl text-sm leading-6 text-black/70 sm:text-base">
          Current quantum devices belong to what is known as the NISQ era—Noisy
          Intermediate-Scale Quantum computing. These machines are error-prone,
          difficult to scale, and extremely sensitive to environmental noise.
        </p>
        <p className="max-w-4xl text-sm leading-6 text-black/70 sm:text-base">
          While quantum computers may become more general-purpose decades in the
          future, today they are experimental research tools. Their main value
          right now is helping us explore which problems might eventually
          benefit from quantum advantage.
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="font-display text-xl text-black">
          Why Quantum Mechanics Matters: The Double-Slit Intuition
        </h3>
        <p className="max-w-4xl text-sm leading-6 text-black/70 sm:text-base">
          To understand why quantum computers behave so differently, we need a
          glimpse into the quantum nature of reality itself. One of the most
          famous experiments that reveals this behavior is the double-slit
          experiment.
        </p>
        <p className="max-w-4xl text-sm leading-6 text-black/70 sm:text-base">
          In the double-slit experiment, light behaves in a way that defies
          classical intuition. When light passes through two slits, it produces
          an interference pattern—something we normally associate with waves.
          Surprisingly, this pattern still forms even when light is sent one
          particle at a time, as if each particle interferes with itself.
        </p>
        <p className="max-w-4xl text-sm leading-6 text-black/70 sm:text-base">
          This behavior shows that quantum particles do not behave strictly like
          classical particles or classical waves. Instead, they follow rules
          that allow probability amplitudes to combine and interfere. Quantum
          computing leverages this idea—using interference to amplify correct
          outcomes and suppress incorrect ones.
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="font-display text-xl text-black">
          Where Quantum Computers Are Used Today
        </h3>
        <p className="text-sm text-black/70 sm:text-base">
          Despite their limitations, quantum computers are already being
          explored in several focused areas.
        </p>
        <ul className="space-y-2 text-sm text-black/70 sm:text-base">
          <li>Quantum chemistry and material simulation</li>
          <li>Optimization problems with specific structures</li>
          <li>Cryptography research and security analysis</li>
          <li>Algorithm research and benchmarking</li>
        </ul>
        <p className="max-w-4xl text-sm leading-6 text-black/70 sm:text-base">
          In most cases, these applications are experimental. Results are often
          compared against classical simulations to understand whether a genuine
          advantage exists.
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="font-display text-xl text-black">
          Current Limitations and Challenges
        </h3>
        <ul className="space-y-2 text-sm text-black/70 sm:text-base">
          <li>High error rates and noisy qubits</li>
          <li>Short coherence times</li>
          <li>Limited number of reliable qubits</li>
          <li>Expensive calibration and maintenance</li>
          <li>Lack of fault-tolerant error correction</li>
        </ul>
        <p className="max-w-4xl text-sm leading-6 text-black/70 sm:text-base">
          These limitations mean that most quantum programs today are
          demonstrations rather than production solutions. Understanding these
          constraints is essential before exploring gates, circuits, and
          algorithms.
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="font-display text-xl text-black">
          Q&amp;A — Common Questions
        </h3>
        <div className="grid gap-4">
          {quantumIntroQa.map((item) => (
            <div
              key={item.question}
              className="rounded-2xl border border-black/10 bg-white/70 p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md motion-reduce:transition-none"
            >
              <p className="text-sm font-semibold text-black">
                {item.question}
              </p>
              <div className="mt-3 space-y-3 text-sm text-black/60 sm:text-base">
                {item.answer.split("\n\n").map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <p className="max-w-4xl text-sm leading-6 text-black/70 sm:text-base">
          With the hype addressed and the intuition set, we can now explore how
          quantum computation is actually modeled and programmed.
        </p>
        <a
          className="inline-flex rounded-xl border border-black/10 bg-white/80 px-5 py-2.5 text-sm font-semibold text-black shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-black/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2 motion-reduce:transition-none"
          href="/researcher/quantum-computing/qiskit-basics"
        >
          Continue to Foundations
        </a>
      </section>
    </div>
  );
}
