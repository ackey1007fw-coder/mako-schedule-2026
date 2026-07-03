import { InstagramIcon, TikTokIcon } from "./icons";
import type { SocialLink } from "../types";

const iconFor = (kind: SocialLink["kind"]) => (kind === "instagram" ? InstagramIcon : TikTokIcon);

type SocialLinkCardsProps = {
  socialLinks: SocialLink[];
};

// Hero直下のリンクハブ本体。Instagramのリンクインバイオから来た人が
// 30秒で「フォローする場所」にたどり着けるよう、タップ領域を大きくする。
export function SocialLinkCards({ socialLinks }: SocialLinkCardsProps) {
  return (
    <div className="grid gap-3">
      {socialLinks.map((link) => {
        const Icon = iconFor(link.kind);
        return (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mako-card mako-card-interactive flex min-h-16 items-center gap-4 border-mako-ink/10 bg-white px-5 py-4"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-mako-primary/40 bg-mako-sand text-mako-primary">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-display text-xl text-mako-ink">{link.label}</span>
              <span className="block truncate text-sm font-semibold text-mako-secondary">
                {link.handle}
              </span>
            </span>
            <span className="ml-auto shrink-0 rounded-full bg-mako-primary px-4 py-2 text-xs font-bold text-mako-ink">
              フォローする
            </span>
          </a>
        );
      })}
    </div>
  );
}
