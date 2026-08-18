import assert from "node:assert/strict";
import test from "node:test";

import { buildPortalFeed } from "../src/lib/portalFeed";
import type { SiteConfig } from "../src/data/site";
import type { NewsItem, ScheduleEvent } from "../src/types";

const siteConfig: Pick<SiteConfig, "siteName" | "siteUrl"> = {
  siteName: "MAKO Schedule 2026",
  siteUrl: "https://mako-schedule-2026.vercel.app",
};

const build = (newsItems: NewsItem[], eventItems: ScheduleEvent[]) =>
  buildPortalFeed({
    siteConfig,
    newsItems,
    eventItems,
    generatedAt: new Date("2026-08-18T03:00:00.000Z"),
  });

test("builds a valid empty feed", () => {
  assert.deepEqual(build([], []), {
    version: 1,
    personId: "mako",
    siteName: "MAKO Schedule 2026",
    siteUrl: "https://mako-schedule-2026.vercel.app/",
    generatedAt: "2026-08-18T03:00:00.000+00:00",
    items: [],
  });
});

test("maps news and events from fixtures without portal-only records", () => {
  const newsItem: NewsItem = {
    date: "2026-08-18T09:15:00+09:00",
    label: "Instagram",
    text: "投稿を更新しました",
    url: "https://www.instagram.com/p/example/",
  };
  const eventItem: ScheduleEvent = {
    id: "summer-stage-2026",
    title: "サマーステージ",
    shortTitle: "サマーステージ",
    category: "stage",
    startAt: "2026-08-18T19:30:00+09:00",
    endAt: "2026-08-18T21:00:00+09:00",
    displayDate: "2026年8月18日 19:30",
    image: "/images/gallery/g01.jpg",
    summary: "出演予定です。",
    badges: [],
    links: [{ label: "詳細", url: "https://example.com/event", kind: "info" }],
  };

  const first = build([newsItem], [eventItem]);
  const second = build([newsItem], [eventItem]);

  assert.equal(first.items.length, 2);
  assert.equal(first.items[0].id, second.items[0].id);
  assert.match(first.items[0].id, /^mako:news-[a-f0-9]{16}$/);
  assert.deepEqual(first.items[0], {
    id: first.items[0].id,
    personId: "mako",
    type: "news",
    title: "投稿を更新しました",
    summary: "投稿を更新しました",
    url: "https://mako-schedule-2026.vercel.app/",
    sourceUrl: "https://www.instagram.com/p/example/",
    publishedAt: "2026-08-18T09:15:00+09:00",
  });
  assert.deepEqual(first.items[1], {
    id: "mako:summer-stage-2026",
    personId: "mako",
    type: "event",
    title: "サマーステージ",
    summary: "出演予定です。",
    url: "https://mako-schedule-2026.vercel.app/#event-summer-stage-2026",
    sourceUrl: "https://example.com/event",
    startsAt: "2026-08-18T19:30:00+09:00",
    endsAt: "2026-08-18T21:00:00+09:00",
    image: "https://mako-schedule-2026.vercel.app/images/gallery/g01.jpg",
  });
});

test("does not guess a timezone for offset-less values", () => {
  const displayDateNews: NewsItem = {
    date: "2026.08.18",
    label: "Instagram",
    text: "日付だけのお知らせ",
  };
  assert.equal(build([displayDateNews], []).items[0].publishedAt, undefined);

  const eventItem: ScheduleEvent = {
    id: "offset-required",
    title: "Offset required",
    shortTitle: "Offset required",
    category: "event",
    startAt: "2026-08-18T19:30:00",
    displayDate: "2026年8月18日 19:30",
    summary: "Timezone fixture",
    badges: [],
    links: [],
  };

  assert.throws(
    () => build([], [eventItem]),
    /events\[0\]\.startAt must be a valid ISO 8601 date-time with an explicit offset/,
  );
});
