export default function QiskitBasicsPage() {
  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <h2 className="font-display text-2xl text-black">
          Qiskit Basics & Gates
        </h2>
        <p className="max-w-4xl text-sm leading-6 text-black/70 sm:text-base">
          Document your Qiskit setup, core syntax, circuit creation, and common
          gates. Include annotated code snippets and references to your notebook
          cells.
        </p>
        <div className="rounded-2xl border border-black/10 bg-white/70 p-5 shadow-sm">
          <p className="text-xs uppercase tracking-[0.25em] text-black/50">
            Suggested Sections
          </p>
          <ul className="mt-3 space-y-2 text-sm text-black/70">
            <li>Installing Qiskit and environment setup.</li>
            <li>Building circuits and visualizing results.</li>
            <li>Common gates: H, X, CNOT, Z, and rotations.</li>
          </ul>
        </div>
      </section>

      <section id="qa" className="space-y-4 border-t border-black/10 pt-6">
        <h3 className="font-display text-xl text-black">Q&amp;A</h3>
        <p className="text-sm text-black/70">
          Capture the questions you had while learning Qiskit and the answers
          that helped you understand it.
        </p>
        <div className="grid gap-4">
          {[1, 2, 3].map((item) => (
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
