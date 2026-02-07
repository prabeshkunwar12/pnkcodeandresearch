export default function GroverAlgorithmPage() {
  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <h2 className="font-display text-2xl text-black">Grover's Algorithm</h2>
        <p className="max-w-4xl text-sm leading-6 text-black/70 sm:text-base">
          Document the theory, mathematical steps, and Qiskit implementation of
          Grover&apos;s algorithm. Include diagrams, circuit screenshots, and code
          cells from your notebook.
        </p>
        <div className="rounded-2xl border border-black/10 bg-white/70 p-5 shadow-sm">
          <p className="text-xs uppercase tracking-[0.25em] text-black/50">
            Suggested Sections
          </p>
          <ul className="mt-3 space-y-2 text-sm text-black/70">
            <li>Problem setup and oracle definition.</li>
            <li>Amplitude amplification intuition.</li>
            <li>Qiskit implementation notes.</li>
          </ul>
        </div>
      </section>

      <section id="qa" className="space-y-4 border-t border-black/10 pt-6">
        <h3 className="font-display text-xl text-black">Q&amp;A</h3>
        <p className="text-sm text-black/70">
          Add your Grover-specific questions and answers here.
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
