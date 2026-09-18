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
      "MAKOさんがSHOWROOMの「人気テーマパーク『レゴランド®・ジャパン』を盛り上げよう！地上波TVリポーター」SR枠に参加中。本人プロフィールでは、前回最終面接まで進んだ企画へのリベンジとして、今回はSR枠1位を目標に掲げています。",
    badges: ["SHOWROOM", "地上波TVリポーター", "参加中"],
    links: [],
    isImportant: true,
    isNextFocus: true,
  },
];
