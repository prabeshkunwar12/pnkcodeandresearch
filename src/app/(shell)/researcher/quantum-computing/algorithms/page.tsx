export default function AlgorithmsPage() {
  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <h2 className="font-display text-2xl text-black">Algorithms</h2>
        <p className="max-w-4xl text-sm leading-6 text-black/70 sm:text-base">
          Create a page per algorithm to capture theory, math, and code. Use the
          links below to navigate to each algorithm note.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        {[
          {
            title: "Grover's Algorithm",
            desc: "Search speedups and amplitude amplification basics.",
            href: "/researcher/quantum-computing/algorithms/grover",
          },
          {
            title: "Quantum Fourier Transform",
            desc: "Circuit structure and key mathematical steps.",
            href: "#",
          },
          {
            title: "VQE",
            desc: "Variational circuits and classical optimization loops.",
            href: "#",
          },
          {
            title: "Shor's Algorithm",
            desc: "Integer factorization foundations and limitations.",
            href: "#",
          },
        ].map((algo) => (
          <a
            key={algo.title}
            href={algo.href}
            className="rounded-2xl border border-black/10 bg-white/70 p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-black/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2 motion-reduce:transition-none"
          >
            <h3 className="text-base font-semibold text-black">{algo.title}</h3>
            <p className="mt-2 text-sm text-black/60">{algo.desc}</p>
            <span className="mt-4 inline-flex text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--accent-deep)]">
              Open
            </span>
          </a>
        ))}
      </section>

      <section id="qa" className="space-y-4 border-t border-black/10 pt-6">
        <h3 className="font-display text-xl text-black">Q&amp;A</h3>
        <p className="text-sm text-black/70">
          Add any broader algorithm questions or comparisons here.
        </p>
        <div className="grid gap-4">
          {[1, 2].map((item) => (
            <div className="rounded-2xl border border-black/10 bg-white/70 p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md motion-reduce:transition-none" key={item}>
              <p className="text-sm font-semibold text-black">
                Question {item}
              </p>
              <p className="mt-2 text-sm text-black/60">
                Placeholder for your Q&amp;A content.
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
