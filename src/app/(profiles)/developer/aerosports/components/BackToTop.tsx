import Link from "next/link";

export function BackToTop() {
  return (
    <div className="mt-12">
      <Link
        href="/developer/aerosports#top"
        className="inline-flex items-center rounded-full border border-black/20 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-black transition hover:border-black"
      >
        Back to top
      </Link>
    </div>
  );
}
