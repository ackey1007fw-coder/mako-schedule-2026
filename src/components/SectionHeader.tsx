type SectionHeaderProps = {
  kicker: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
};

export function SectionHeader({ kicker, title, copy, align = "left" }: SectionHeaderProps) {
  return (
    <div className={`mb-8 max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-mako-secondary">
        {kicker}
      </p>
      <h2 className="font-display text-3xl leading-tight text-mako-ink sm:text-4xl">{title}</h2>
      {copy && <p className="mt-4 leading-8 text-mako-ink/70">{copy}</p>}
    </div>
  );
}
