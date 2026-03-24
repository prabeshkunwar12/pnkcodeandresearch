type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
}: SectionHeaderProps) {
  return (
    <div className="w-full max-w-full min-w-0 space-y-1.5 sm:space-y-2">
      <p className="text-[11px] uppercase tracking-[0.24em] text-black/50 sm:text-xs sm:tracking-[0.3em]">
        {eyebrow}
      </p>
      <h2 className="font-display text-xl text-black sm:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-3xl text-sm leading-6 text-black/60 sm:text-base sm:leading-7">
          {description}
        </p>
      ) : null}
    </div>
  );
}
