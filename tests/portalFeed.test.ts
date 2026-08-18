import assert from "node:assert/strict";
import test from "node:test";

import type { SiteConfig } from "../src/data/site";
import { buildPortalFeed, type PortalFeedItem } from "../src/lib/portalFeed";
import type { NewsItem, ScheduleEvent } from "../src/types";

const siteConfig: Pick<SiteConfig, "siteName" | "siteUrl"> = {
  siteName: "MAKO Schedule 2026",
  siteUrl: "https://mako-schedule-2026.vercel.app",
};
const defaultNow = new Date("2026-08-22T05:00:00.000Z"); // 2026-08-22 14:00 JST

const build = (
  newsItems: NewsItem[],
  eventItems: ScheduleEvent[],
  now = defaultNow,
) =>
  buildPortalFeed({
    siteConfig,
    newsItems,
    eventItems,
    generatedAt: now,
  });

function makeNews(index: number, date: string): NewsItem {
  return {
    date,
    label: "Instagram",
    text: `News ${index}`,
    url: `https://www.instagram.com/p/news-${index}/`,
  };
}

function makeEvent(
  values: Pick<ScheduleEvent, "id" | "listedAt" | "startAt"> & Partial<ScheduleEvent>,
): ScheduleEvent {
  return {
    title: values.id,
    shortTitle: values.id,
    category: "event",
    displayDate: values.startAt,
    summary: `Summary for ${values.id}`,
    badges: [],
    links: [],
    ...values,
  };
}

function assertNewestFirst(items: readonly PortalFeedItem[]) {
  for (let index = 1; index < items.length; index += 1) {
    const previous = items[index - 1];
    const current = items[index];
    const previousTime = Date.parse(previous.publishedAt);
    const currentTime = Date.parse(current.publishedAt);
    assert.ok(previousTime >= currentTime);
    if (previousTime === currentTime) assert.ok(previous.id < current.id);
  }
}

test("builds a valid empty feed", () => {
  assert.deepEqual(build([], []), {
    version: 1,
    personId: "mako",
    siteName: "MAKO Schedule 2026",
    siteUrl: "https://mako-schedule-2026.vercel.app/",
    generatedAt: "2026-08-22T05:00:00.000+00:00",
    items: [],
  });
});

test("maps offset news and event publication/start/end fields without mixing meanings", () => {
  const newsItem: NewsItem = {
    date: "2026-08-18T09:15:00+09:00",
    label: "Instagram",
    text: "投稿を更新しました",
    url: "https://www.instagram.com/p/example/",
  };
  const eventItem = makeEvent({
    id: "summer-stage-2026",
    listedAt: "2026-08-10",
    startAt: "2026-08-22T12:30:00+09:00",
    endAt: "2026-08-22T14:30:00+09:00",
    title: "サマーステージ",
    shortTitle: "サマーステージ",
    displayDate: "2026年8月22日 12:30",
    image: "/images/gallery/g01.jpg",
    summary: "出演予定です。",
    links: [{ label: "詳細", url: "https://example.com/event", kind: "info" }],
  });

  const feed = build([newsItem], [eventItem]);
  assert.deepEqual(feed.items[0], {
    id: feed.items[0].id,
    personId: "mako",
    type: "news",
    title: "投稿を更新しました",
    summary: "投稿を更新しました",
    url: "https://mako-schedule-2026.vercel.app/",
    sourceUrl: "https://www.instagram.com/p/example/",
    publishedAt: "2026-08-18T09:15:00+09:00",
  });
  assert.deepEqual(feed.items[1], {
    id: "mako:summer-stage-2026",
    personId: "mako",
    type: "event",
    title: "サマーステージ",
    summary: "出演予定です。",
    url: "https://mako-schedule-2026.vercel.app/#event-summer-stage-2026",
    sourceUrl: "https://example.com/event",
    publishedAt: "2026-08-10T00:00:00+09:00",
    startsAt: "2026-08-22T12:30:00+09:00",
    endsAt: "2026-08-22T14:30:00+09:00",
    image: "https://mako-schedule-2026.vercel.app/images/gallery/g01.jpg",
  });
});

test("canonicalizes supported date-only news values to JST midnight", () => {
  for (const date of ["2026-08-18", "2026.08.18", "2026.8.18"]) {
    const item = build([{ date, label: "Instagram", text: date }], []).items[0];
    assert.equal(item.publishedAt, "2026-08-18T00:00:00+09:00");
    assert.equal(new URL(item.url).origin, "https://mako-schedule-2026.vercel.app");
  }
});

test("rejects impossible date-only publication dates", () => {
  assert.throws(
    () => build([{ date: "2026-02-30", label: "Instagram", text: "invalid" }], []),
    /news\[0\]\.date must be an offset ISO date-time or a valid date-only value/,
  );
  assert.throws(
    () =>
      build(
        [{ date: "2026-02-30T09:15:00+09:00", label: "Instagram", text: "invalid" }],
        [],
      ),
    /news\[0\]\.date must be a valid ISO 8601 date-time with an explicit offset/,
  );
});

test("rejects an event startAt without an explicit offset", () => {
  const eventItem = makeEvent({
    id: "offset-required",
    listedAt: "2026-08-10",
    startAt: "2026-08-22T12:30:00",
  });
  assert.throws(
    () => build([], [eventItem]),
    /events\[0\]\.startAt must be a valid ISO 8601 date-time with an explicit offset/,
  );
});

test("limits feeds with more than 20 candidates", () => {
  const newsItems = Array.from({ length: 25 }, (_, index) =>
    makeNews(index + 1, `2026-07-${String(index + 1).padStart(2, "0")}`),
  );
  const feed = build(newsItems, []);
  assert.equal(feed.items.length, 20);
  assertNewestFirst(feed.items);
});

test("retains today's started event and future event ahead of newer news during selection", () => {
  const newsItems = Array.from({ length: 25 }, (_, index) =>
    makeNews(index + 1, `2026-08-21T23:${String(index).padStart(2, "0")}:00+09:00`),
  );
  const todayEvent = makeEvent({
    id: "today-started",
    listedAt: "2026-07-01",
    startAt: "2026-08-22T12:30:00+09:00",
  });
  const futureEvent = makeEvent({
    id: "future-event",
    listedAt: "2026-07-02",
    startAt: "2026-08-23T12:30:00+09:00",
  });

  const feed = build(newsItems, [todayEvent, futureEvent]);
  const ids = feed.items.map((item) => item.id);
  assert.equal(feed.items.length, 20);
  assert.ok(ids.includes("mako:today-started"));
  assert.ok(ids.includes("mako:future-event"));
  assertNewestFirst(feed.items);
});

test("sorts the final selection by publishedAt newest first with an ID tie-break", () => {
  const samePublishedAt = "2026-08-20T10:00:00+09:00";
  const feed = build(
    [
      makeNews(1, "2026-08-18"),
      makeNews(2, samePublishedAt),
      makeNews(3, samePublishedAt),
    ],
    [
      makeEvent({
        id: "future-listed-19",
        listedAt: "2026-08-19",
        startAt: "2026-08-24T12:30:00+09:00",
      }),
    ],
  );

  assert.deepEqual(
    feed.items.map((item) => item.publishedAt),
    [
      samePublishedAt,
      samePublishedAt,
      "2026-08-19T00:00:00+09:00",
      "2026-08-18T00:00:00+09:00",
    ],
  );
  assertNewestFirst(feed.items);
});

test("keeps stable IDs and ordering across repeated builds", () => {
  const newsItems = [makeNews(1, "2026-08-21"), makeNews(2, "2026-08-20")];
  const eventItems = [
    makeEvent({
      id: "stable-future",
      listedAt: "2026-08-01",
      startAt: "2026-08-23T12:30:00+09:00",
    }),
  ];

  const first = build(newsItems, eventItems, new Date("2026-08-22T01:00:00Z"));
  const second = build(newsItems, eventItems, new Date("2026-08-22T10:00:00Z"));
  assert.deepEqual(
    first.items.map(({ id, publishedAt }) => ({ id, publishedAt })),
    second.items.map(({ id, publishedAt }) => ({ id, publishedAt })),
  );
});

test("rejects external image URLs", () => {
  const eventItem = makeEvent({
    id: "external-image",
    listedAt: "2026-08-10",
    startAt: "2026-08-23T12:30:00+09:00",
    image: "https://images.example.com/event.jpg",
  });
  assert.throws(
    () => build([], [eventItem]),
    /events\[0\]\.image must use the site origin https:\/\/mako-schedule-2026\.vercel\.app/,
  );
});
