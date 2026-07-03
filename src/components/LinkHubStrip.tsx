import { CalendarDays } from "lucide-react";
import type { SocialLink } from "../types";
import { InstagramIcon, TikTokIcon } from "./icons";

type LinkHubStripProps = {
  socialLinks: SocialLink[];
};

// モバイル下部固定のアクションドック。Instagram / TikTok / スケジュールへの3ボタン。
export function LinkHubStrip({ socialLinks }: LinkHubStripProps) {
  const instagram = socialLinks.find((link) => link.kind === "instagram");
  const tiktok = socialLinks.find((link) => link.kind === "tiktok");

  return (
    <nav
      aria-label="応援メニュー"
      className="fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom))] left-2 z-[70] w-[calc(100vw-1rem)] max-w-[calc(100vw-1rem)] rounded-2xl border border-white/80 bg-white/92 p-1 shadow-lg backdrop-blur-xl md:hidden"
    >
      <div className="grid grid-cols-3 gap-0.5">
        <a
          href="#schedule"
          className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl border border-transparent bg-mako-sand text-center text-mako-ink transition hover:border-mako-ink/15"
        >
          <CalendarDays className="h-5 w-5" aria-hidden="true" />
          <span className="text-[10px] font-bold">スケジュール</span>
        </a>
        {instagram && (
          <a
            href={instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl border border-mako-primary bg-mako-primary text-center text-mako-ink"
          >
            <InstagramIcon className="h-5 w-5" />
            <span className="text-[10px] font-bold">Instagram</span>
          </a>
        )}
        {tiktok && (
          <a
            href={tiktok.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl border border-transparent bg-mako-sand text-center text-mako-ink transition hover:border-mako-ink/15"
          >
            <TikTokIcon className="h-5 w-5" />
            <span className="text-[10px] font-bold">TikTok</span>
          </a>
        )}
      </div>
    </nav>
  );
}
