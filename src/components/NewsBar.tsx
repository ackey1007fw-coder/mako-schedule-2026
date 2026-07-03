import { ArrowUpRight, Megaphone } from "lucide-react";
import { news } from "../data/news";

export function NewsBar() {
  const latest = news[0];
  if (!latest) return null;

  return (
    <a
      href={latest.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block border-b border-mako-ink/10 bg-white"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2.5 sm:px-6 lg:px-8">
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-mako-primary/40 bg-mako-sand px-2 py-1 text-[10px] font-black uppercase tracking-wide text-mako-primary">
          <Megaphone className="h-3.5 w-3.5" aria-hidden="true" />
          News
        </span>
        <span className="min-w-0 flex-1 truncate text-sm font-bold text-mako-ink">
          <span className="text-mako-ink/45">{latest.date}</span>
          {"　"}
          {latest.text}
        </span>
        <span className="hidden shrink-0 items-center gap-1 text-xs font-bold text-mako-secondary group-hover:underline sm:inline-flex">
          {latest.label}で見る
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
      </div>
    </a>
  );
}
