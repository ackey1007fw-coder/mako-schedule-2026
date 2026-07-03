import type { SocialLink } from "../types";

// これ以外のSNSを追加しない（X・SHOWROOMは本人希望により非掲載）。
export const socialLinks: SocialLink[] = [
  {
    label: "Instagram",
    handle: "@mako_hawaiian",
    url: "https://www.instagram.com/mako_hawaiian/",
    description: "日常の投稿やストーリーズはこちら。",
    kind: "instagram",
  },
  {
    label: "TikTok",
    handle: "@maaako0406",
    url: "https://www.tiktok.com/@maaako0406",
    description: "ショート動画の最新投稿をチェック。",
    kind: "tiktok",
  },
];
