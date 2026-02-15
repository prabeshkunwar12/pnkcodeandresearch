export default function QuantumDocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="mt-10 border-b border-black/10 pb-6">
        <p className="text-xs uppercase tracking-[0.35em] text-black/60">
          Quantum Computing Docs
        </p>
        <h1 className="font-display mt-3 text-3xl leading-tight text-black sm:text-4xl">
          Knowledge base, experiments, and Q&amp;A
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-black/70 sm:text-base">
          A living documentation hub for quantum computing topics, Qiskit
          workflows, and algorithm notes. Each page includes a Q&amp;A section for
          the questions I had while learning.
        </p>
      </header>

      <div className="mt-10">
        <main className="min-w-0">{children}</main>
      </div>
    </>
  );
}
