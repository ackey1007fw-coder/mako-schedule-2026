"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-[calc(5.75rem+env(safe-area-inset-bottom))] right-4 z-[45] grid h-11 w-11 place-items-center rounded-full border border-mako-ink/15 bg-white/92 text-mako-ink shadow-lg backdrop-blur-xl transition hover:-translate-y-1 hover:border-mako-primary md:bottom-6"
      aria-label="ページのトップに戻る"
    >
      <ArrowUp className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
