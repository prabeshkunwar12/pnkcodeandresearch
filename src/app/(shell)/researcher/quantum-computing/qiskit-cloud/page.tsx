export default function QiskitCloudPage() {
  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <h2 className="font-display text-2xl text-black">
          Connecting to the Qiskit Cloud Provider
        </h2>
        <p className="max-w-4xl text-sm leading-6 text-black/70 sm:text-base">
          Explain how you connect to IBM Quantum, configure credentials, select
          backends, and submit jobs. Add screenshots or code snippets for setup
          steps.
        </p>
        <div className="rounded-2xl border border-black/10 bg-white/70 p-5 shadow-sm">
          <p className="text-xs uppercase tracking-[0.25em] text-black/50">
            Suggested Sections
          </p>
          <ul className="mt-3 space-y-2 text-sm text-black/70">
            <li>Creating an IBM Quantum account.</li>
            <li>Authenticating in Qiskit.</li>
            <li>Selecting and running on real hardware.</li>
          </ul>
        </div>
      </section>

      <section id="qa" className="space-y-4 border-t border-black/10 pt-6">
        <h3 className="font-display text-xl text-black">Q&amp;A</h3>
        <p className="text-sm text-black/70">
          Add your questions about cloud backends, job queues, and results.
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
