export type SiteMode = "official" | "approved-fan" | "fan";

export type SiteConfig = {
  mode: SiteMode;
  siteName: string;
  siteUrl: string;
  modeLabel: Record<SiteMode, { ja: string; en: string; footerNote: string }>;
  ogImage: string;
  /** "MM-DD" 形式。本人確認が取れるまでは undefined のまま（カウントダウン非表示）。 */
  birthday?: string;
};

export const site: SiteConfig = {
  mode: "approved-fan",
  siteName: "MAKO Schedule 2026",
  siteUrl: "https://mako-schedule-2026.vercel.app",
  modeLabel: {
    official: {
      ja: "オフィシャルサイト",
      en: "Official Site",
      footerNote: "本サイトはまこさん本人の公式サイトです。",
    },
    "approved-fan": {
      ja: "本人公認ファンサイト",
      en: "Approved Fan Site",
      footerNote: "本サイトはまこさん本人の了承を得て、ファンが運営しています。",
    },
    fan: {
      ja: "非公式ファンサイト",
      en: "Unofficial Fan Site",
      footerNote: "本サイトはファンによる非公式の応援ページです。掲載情報は変更される場合があります。",
    },
  },
  ogImage: "/images/og/og-default.png",
  // 本人のSHOWROOMプロフィール欄より本人確認済み（2026-07-03 あっきー確認）。
  birthday: "04-06",
};
