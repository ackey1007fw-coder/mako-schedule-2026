import { categoryMeta } from "../lib/eventMeta";
import type { EventCategory } from "../types";

type BadgeProps = {
  children: string;
  category?: EventCategory;
  strong?: boolean;
};

export function Badge({ children, category, strong = false }: BadgeProps) {
  const tone = category
    ? categoryMeta[category].tone
    : strong
      ? "border-mako-primary bg-mako-primary text-mako-ink"
      : "border-mako-ink/15 bg-white/80 text-mako-ink/70";

  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-bold uppercase ${tone}`}>
      {children}
    </span>
  );
}
