"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Megaphone } from "lucide-react";
import { news } from "../data/news";
import { site } from "../data/site";

// 最新のお知らせを1件、トップのスリムなバーで表示する。
// ヘッダー＋ニュースバー＋QuickNavのsticky3段が狭い画面を圧迫しないよう、
// 少しでもスクロールしたら畳み、ページ上端に戻ったら再表示する。
export function NewsBar() {
  const latest = news[0];
  const destination = latest?.url ? new URL(latest.url, site.siteUrl) : null;
  const external = destination !== null && destination.origin !== new URL(site.siteUrl).origin;
  const href = destination
    ? external ? destination.href : `${destination.pathname}${destination.search}${destination.hash}`
    : undefined;
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (!latest) return;
    const onScroll = () => setCollapsed(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [latest]);

  if (!latest) return null;

  return (
    <div
      className={`overflow-hidden transition-[max-height,opacity] duration-300 motion-reduce:transition-none ${
        collapsed ? "max-h-0 opacity-0" : "max-h-20 opacity-100"
      }`}
    >
      <a
        href={href}
        onClick={() => {
          if (external || !destination?.hash) return;
          const target = document.getElementById(decodeURIComponent(destination.hash.slice(1)));
          // Reveal archived events before the browser scrolls to the fragment.
          for (let parent = target?.parentElement; parent; parent = parent.parentElement) {
            if (parent instanceof HTMLDetailsElement) parent.open = true;
          }
        }}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        tabIndex={collapsed ? -1 : undefined}
        aria-hidden={collapsed}
        className="group block border-b border-mako-ink/10 bg-white"
      >
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2.5 sm:px-6 lg:px-8">
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-mako-primary/40 bg-mako-sand px-2 py-1 text-[10px] font-black uppercase tracking-wide text-mako-primary-ink">
            <Megaphone className="h-3.5 w-3.5" aria-hidden="true" />
            News
          </span>
          <span className="min-w-0 flex-1 truncate text-sm font-bold text-mako-ink">
            <span className="text-mako-ink/45">{latest.date}</span>
            {"　"}
            {latest.text}
          </span>
          <span className="hidden shrink-0 items-center gap-1 text-xs font-bold text-mako-secondary-ink group-hover:underline sm:inline-flex">
            {latest.label}で見る
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
        </div>
      </a>
    </div>
  );
}
