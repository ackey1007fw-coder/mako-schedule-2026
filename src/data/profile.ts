export type Profile = {
  name: string;
  romaji: string;
  catchCopy: string;
  intro: string;
  heroImage: string;
  portraitImage?: string;
  facts: { label: string; value: string }[];
};

// 表示名は本人DMのヘッダー表記「MAKO / mako_hawaiian」に準拠。
// facts は本人のSHOWROOMプロフィール欄より本人確認済み（2026-07-03 あっきー確認）。
// 贈り物送付先住所・電話番号・所属事務所名は、個人情報保護のためこのサイトには掲載しない。
export const profile: Profile = {
  name: "まこ",
  romaji: "MAKO",
  catchCopy: "30秒でわかる、まこの「いま」。",
  intro: "Instagram・TikTokの更新やスケジュールをここでまとめてチェックできます。",
  heroImage: "/images/mako-hero.jpg",
  portraitImage: "/images/mako-portrait.jpg",
  facts: [
    { label: "誕生日", value: "4月6日" },
    { label: "身長", value: "161cm" },
    { label: "故郷", value: "鹿児島県 徳之島" },
    { label: "居住歴", value: "大阪・千葉・名古屋 → 現在は和歌山県" },
    { label: "趣味", value: "料理 / 食べること / 旅行 / ウォーキング / ヨガ / 水泳 / ダンス" },
  ],
};
