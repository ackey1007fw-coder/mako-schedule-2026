import { profile } from "../data/profile";
import { site } from "../data/site";
import type { SocialLink } from "../types";

const OUEN_ARCHIVE_URL = "https://ouen-archive-564c.vercel.app/";

type FooterProps = {
  socialLinks: SocialLink[];
};

export function Footer({ socialLinks }: FooterProps) {
  const year = new Date().getFullYear();
  const label = site.modeLabel[site.mode];

  return (
    <footer className="border-t border-mako-ink/10 bg-mako-ink px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-display text-2xl">{profile.name}</p>
            <p className="mt-1 text-sm text-white/60">{label.ja}（{label.en}）</p>
            <p className="mt-4 max-w-md text-xs leading-6 text-white/45">{label.footerNote}</p>
          </div>

          <div className="sm:text-right">
            <p className="mb-3 text-[11px] font-black uppercase tracking-[0.18em] text-mako-primary">
              Follow
            </p>
            <div className="flex flex-wrap gap-2 sm:justify-end">
              {socialLinks.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/18 px-3 py-2 text-xs font-bold text-white/75 transition hover:border-mako-primary hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10">
          <a
            href={OUEN_ARCHIVE_URL}
            className="inline-flex min-h-[44px] items-center gap-1.5 text-xs text-white/60 underline decoration-white/30 underline-offset-4 transition hover:text-white hover:decoration-mako-primary"
          >
            <span aria-hidden="true">←</span>
            応援アーカイブへ戻る
          </a>
          <p className="mt-1 text-[11px] text-white/40">
            5つの応援サイトをつなぐ非公式ポータル
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {profile.romaji} Schedule ・ Produced by あっきー</p>
          <p>掲載情報は変更される場合があります。</p>
        </div>
      </div>
    </footer>
  );
}
