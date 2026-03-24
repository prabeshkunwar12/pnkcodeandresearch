type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
}: SectionHeaderProps) {
  return (
    <div className="w-full max-w-full min-w-0">
      <p className="text-[11px] uppercase tracking-[0.24em] text-black/50 sm:text-xs sm:tracking-[0.3em]">
        {eyebrow}
      </p>
      <h2 className="font-display mt-2.5 text-xl text-black sm:mt-3 sm:text-3xl">
        {title}
      </h2>
      <p className="mt-3 max-w-4xl text-sm leading-6 text-black/60 sm:mt-4 sm:leading-7">
        {description}
      </p>
    </div>
  );
}
