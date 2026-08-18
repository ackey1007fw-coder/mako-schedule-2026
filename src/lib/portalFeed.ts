import { createHash } from "node:crypto";

import type { SiteConfig } from "../data/site";
import type { NewsItem, ScheduleEvent } from "../types";

const PERSON_ID = "mako" as const;
const OFFSET_DATE_TIME =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d{1,9})?)?(?:Z|[+-]\d{2}:\d{2})$/;

export type PortalFeedItem = {
  id: string;
  personId: typeof PERSON_ID;
  type: "news" | "story" | "schedule" | "event" | "update";
  title: string;
  summary: string;
  url?: string;
  sourceUrl?: string;
  publishedAt?: string;
  updatedAt?: string;
  startsAt?: string;
  endsAt?: string;
  image?: string;
};

export type PortalFeed = {
  version: 1;
  personId: typeof PERSON_ID;
  siteName: string;
  siteUrl: string;
  generatedAt: string;
  items: PortalFeedItem[];
};

type PortalFeedSource = {
  siteConfig: Pick<SiteConfig, "siteName" | "siteUrl">;
  newsItems: readonly NewsItem[];
  eventItems: readonly ScheduleEvent[];
  generatedAt?: Date;
};

function normalizeSiteUrl(value: string) {
  const url = new URL(value);
  url.hash = "";
  url.search = "";
  if (!url.pathname.endsWith("/")) url.pathname += "/";
  return url.toString();
}

function normalizeOffsetDateTime(value: string, field: string) {
  if (!OFFSET_DATE_TIME.test(value) || Number.isNaN(Date.parse(value))) {
    throw new Error(`${field} must be a valid ISO 8601 date-time with an explicit offset`);
  }

  return value.endsWith("Z") ? `${value.slice(0, -1)}+00:00` : value;
}

function newsPublishedAt(value: string, field: string) {
  if (!value.includes("T")) return undefined;
  return normalizeOffsetDateTime(value, field);
}

function generatedAt(value: Date) {
  if (Number.isNaN(value.getTime())) {
    throw new Error("generatedAt must be a valid Date");
  }

  return value.toISOString().replace(/Z$/, "+00:00");
}

function toAbsoluteUrl(value: string, siteUrl: string) {
  return new URL(value, siteUrl).toString();
}

function newsId(item: NewsItem) {
  const stableSource = item.url ?? [item.date, item.label, item.text].join("\u001f");
  const digest = createHash("sha256").update(stableSource).digest("hex").slice(0, 16);
  return `${PERSON_ID}:news-${digest}`;
}

function eventId(localId: string) {
  return localId.startsWith(`${PERSON_ID}:`) ? localId : `${PERSON_ID}:${localId}`;
}

function mapNews(item: NewsItem, index: number, siteUrl: string): PortalFeedItem {
  const itemPublishedAt = newsPublishedAt(item.date, `news[${index}].date`);

  return {
    id: newsId(item),
    personId: PERSON_ID,
    type: "news",
    title: item.text,
    summary: item.text,
    url: siteUrl,
    ...(item.url ? { sourceUrl: item.url } : {}),
    ...(itemPublishedAt ? { publishedAt: itemPublishedAt } : {}),
  };
}

function mapEvent(item: ScheduleEvent, index: number, siteUrl: string): PortalFeedItem {
  const sourceUrl = item.links[0]?.url;

  return {
    id: eventId(item.id),
    personId: PERSON_ID,
    type: "event",
    title: item.title,
    summary: item.summary,
    url: `${siteUrl}#event-${encodeURIComponent(item.id)}`,
    ...(sourceUrl ? { sourceUrl } : {}),
    startsAt: normalizeOffsetDateTime(item.startAt, `events[${index}].startAt`),
    ...(item.endAt
      ? { endsAt: normalizeOffsetDateTime(item.endAt, `events[${index}].endAt`) }
      : {}),
    ...(item.image ? { image: toAbsoluteUrl(item.image, siteUrl) } : {}),
  };
}

function assertUniqueIds(items: readonly PortalFeedItem[]) {
  const ids = new Set<string>();
  for (const item of items) {
    if (ids.has(item.id)) throw new Error(`Duplicate portal feed item id: ${item.id}`);
    ids.add(item.id);
  }
}

export function buildPortalFeed({
  siteConfig,
  newsItems,
  eventItems,
  generatedAt: generatedAtDate = new Date(),
}: PortalFeedSource): PortalFeed {
  const siteUrl = normalizeSiteUrl(siteConfig.siteUrl);
  const items = [
    ...newsItems.map((item, index) => mapNews(item, index, siteUrl)),
    ...eventItems.map((item, index) => mapEvent(item, index, siteUrl)),
  ];

  assertUniqueIds(items);

  return {
    version: 1,
    personId: PERSON_ID,
    siteName: siteConfig.siteName,
    siteUrl,
    generatedAt: generatedAt(generatedAtDate),
    items,
  };
}
