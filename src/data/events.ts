import type { ScheduleEvent } from "../types";

// 実イベントは本人確認・情報確定後に追加する（AGENTS.md「SNS投稿を追加する手順」参照）。
// プレースホルダーは0件のままにし、架空の予定は書かない。
export const events: ScheduleEvent[] = [
  {
    id: "showroom-legoland-reporter-20260914",
    title: "レゴランド®・ジャパン 地上波TVリポーターオーディション",
    shortTitle: "レゴランド® リポーターAD",
    category: "web",
    listedAt: "2026-09-19",
    startAt: "2026-09-14T18:00:00+09:00",
    endAt: "2026-09-20T21:59:59+09:00",
    displayDate: "2026年9月14日（月）18:00〜9月20日（日）21:59",
    summary:
      "MAKOさんがレゴランド®・ジャパンを紹介する地上波TVリポーターオーディションのSR枠に参加。SR枠1位を目標にした再挑戦です。9/19（土）は13:00から配信予定と案内されています（9/19確認時点）。",
    badges: ["SHOWROOM", "地上波TVリポーター", "オーディション"],
    links: [],
    isImportant: true,
    isNextFocus: true,
  },
];
