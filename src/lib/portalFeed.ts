import { createHash } from "node:crypto";

import type { SiteConfig } from "../data/site";
import type { NewsItem, ScheduleEvent } from "../types";

const PERSON_ID = "mako" as const;
const MAX_ITEMS = 20;
const JST_TIME_ZONE = "Asia/Tokyo";
const DATE_ONLY = /^(\d{4})([-.])(\d{1,2})\2(\d{1,2})$/;
const OFFSET_DATE_TIME =
  /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{1,9}))?)?(Z|([+-])(\d{2}):(\d{2}))$/;
const jstDateFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: JST_TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

export type PortalFeedItem = {
  id: string;
  personId: typeof PERSON_ID;
  type: "news" | "story" | "schedule" | "event" | "update";
  title: string;
  summary?: string;
  url: string;
  sourceUrl?: string;
  publishedAt: string;
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

function absoluteHttpUrl(value: string, field: string) {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new Error(`${field} must be an absolute URL`);
  }

  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new Error(`${field} must be an absolute HTTP(S) URL`);
  }
  return url;
}

function normalizeSiteUrl(value: string) {
  const url = absoluteHttpUrl(value, "siteUrl");
  url.hash = "";
  url.search = "";
  if (!url.pathname.endsWith("/")) url.pathname += "/";
  return url.toString();
}

function isValidCalendarDate(year: number, month: number, day: number) {
  const leapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const daysInMonth = [31, leapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return month >= 1 && month <= 12 && day >= 1 && day <= daysInMonth[month - 1];
}

function normalizeOffsetDateTime(value: string, field: string) {
  const match = OFFSET_DATE_TIME.exec(value);
  if (!match) {
    throw new Error(`${field} must be a valid ISO 8601 date-time with an explicit offset`);
  }

  const [, yearValue, monthValue, dayValue, hourValue, minuteValue, secondValue, , , , offsetHourValue, offsetMinuteValue] =
    match;
  const year = Number(yearValue);
  const month = Number(monthValue);
  const day = Number(dayValue);
  const hour = Number(hourValue);
  const minute = Number(minuteValue);
  const second = Number(secondValue ?? "0");
  const offsetHour = Number(offsetHourValue ?? "0");
  const offsetMinute = Number(offsetMinuteValue ?? "0");

  if (
    !isValidCalendarDate(year, month, day) ||
    hour > 23 ||
    minute > 59 ||
    second > 59 ||
    offsetHour > 23 ||
    offsetMinute > 59 ||
    Number.isNaN(Date.parse(value))
  ) {
    throw new Error(`${field} must be a valid ISO 8601 date-time with an explicit offset`);
  }

  return value.endsWith("Z") ? `${value.slice(0, -1)}+00:00` : value;
}

function normalizePublishedAt(value: string, field: string) {
  if (value.includes("T")) return normalizeOffsetDateTime(value, field);

  const match = DATE_ONLY.exec(value);
  if (!match) {
    throw new Error(`${field} must be an offset ISO date-time or a valid date-only value`);
  }

  const [, yearValue, , monthValue, dayValue] = match;
  const year = Number(yearValue);
  const month = Number(monthValue);
  const day = Number(dayValue);
  if (!isValidCalendarDate(year, month, day)) {
    throw new Error(`${field} must be an offset ISO date-time or a valid date-only value`);
  }

  // A date-only source states only its JST calendar day. Midnight is a canonical
  // feed sorting timestamp, not a claim that publication actually happened at 00:00.
  return `${yearValue}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}T00:00:00+09:00`;
}

function generatedAt(value: Date) {
  if (Number.isNaN(value.getTime())) {
    throw new Error("generatedAt must be a valid Date");
  }
  return value.toISOString().replace(/Z$/, "+00:00");
}

function sameOriginImageUrl(value: string, siteUrl: string, field: string) {
  let imageUrl: URL;
  try {
    imageUrl = new URL(value, siteUrl);
  } catch {
    throw new Error(`${field} must be a valid same-origin URL`);
  }

  const expectedOrigin = new URL(siteUrl).origin;
  if (imageUrl.origin !== expectedOrigin) {
    throw new Error(`${field} must use the site origin ${expectedOrigin}`);
  }
  return imageUrl.toString();
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
  return {
    id: newsId(item),
    personId: PERSON_ID,
    type: "news",
    title: item.text,
    summary: item.text,
    url: siteUrl,
    ...(item.url ? { sourceUrl: item.url } : {}),
    publishedAt: normalizePublishedAt(item.date, `news[${index}].date`),
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
    publishedAt: normalizePublishedAt(item.listedAt, `events[${index}].listedAt`),
    startsAt: normalizeOffsetDateTime(item.startAt, `events[${index}].startAt`),
    ...(item.endAt
      ? { endsAt: normalizeOffsetDateTime(item.endAt, `events[${index}].endAt`) }
      : {}),
    ...(item.image
      ? { image: sameOriginImageUrl(item.image, siteUrl, `events[${index}].image`) }
      : {}),
  };
}

function compareIds(left: PortalFeedItem, right: PortalFeedItem) {
  return left.id < right.id ? -1 : left.id > right.id ? 1 : 0;
}

function newestFirst(left: PortalFeedItem, right: PortalFeedItem) {
  const publishedDifference = Date.parse(right.publishedAt) - Date.parse(left.publishedAt);
  return publishedDifference || compareIds(left, right);
}

function jstDateKey(value: Date) {
  const parts = Object.fromEntries(
    jstDateFormatter
      .formatToParts(value)
      .filter((part) => part.type === "year" || part.type === "month" || part.type === "day")
      .map((part) => [part.type, part.value]),
  );
  return `${parts.year}-${parts.month}-${parts.day}`;
}

function priorityEvents(items: readonly PortalFeedItem[], now: Date) {
  const today = jstDateKey(now);
  return items
    .filter(
      (item): item is PortalFeedItem & { startsAt: string } =>
        (item.type === "event" || item.type === "schedule") &&
        typeof item.startsAt === "string" &&
        jstDateKey(new Date(item.startsAt)) >= today,
    )
    .sort((left, right) => {
      const leftDate = jstDateKey(new Date(left.startsAt));
      const rightDate = jstDateKey(new Date(right.startsAt));
      const leftGroup = leftDate === today ? 0 : 1;
      const rightGroup = rightDate === today ? 0 : 1;
      const groupDifference = leftGroup - rightGroup;
      const startDifference = Date.parse(left.startsAt) - Date.parse(right.startsAt);
      return groupDifference || startDifference || compareIds(left, right);
    });
}

function selectItems(items: readonly PortalFeedItem[], now: Date) {
  // Selection protects JST-today and future schedule items before newer news can
  // consume the 20-item budget. Final display order is applied separately below.
  const selected = priorityEvents(items, now).slice(0, MAX_ITEMS);
  const selectedIds = new Set(selected.map((item) => item.id));
  const remaining = items
    .filter((item) => !selectedIds.has(item.id))
    .sort(newestFirst)
    .slice(0, MAX_ITEMS - selected.length);

  return [...selected, ...remaining].sort(newestFirst);
}

function validateItems(items: readonly PortalFeedItem[], siteUrl: string) {
  const ids = new Set<string>();
  for (const [index, item] of items.entries()) {
    if (ids.has(item.id)) throw new Error(`Duplicate portal feed item id: ${item.id}`);
    ids.add(item.id);

    absoluteHttpUrl(item.url, `items[${index}].url`);
    normalizeOffsetDateTime(item.publishedAt, `items[${index}].publishedAt`);
    if (item.updatedAt) normalizeOffsetDateTime(item.updatedAt, `items[${index}].updatedAt`);
    if (item.startsAt) normalizeOffsetDateTime(item.startsAt, `items[${index}].startsAt`);
    if (item.endsAt) normalizeOffsetDateTime(item.endsAt, `items[${index}].endsAt`);
    if (item.image) sameOriginImageUrl(item.image, siteUrl, `items[${index}].image`);
  }
}

export function buildPortalFeed({
  siteConfig,
  newsItems,
  eventItems,
  generatedAt: generatedAtDate = new Date(),
}: PortalFeedSource): PortalFeed {
  const siteUrl = normalizeSiteUrl(siteConfig.siteUrl);
  const candidates = [
    ...newsItems.map((item, index) => mapNews(item, index, siteUrl)),
    ...eventItems.map((item, index) => mapEvent(item, index, siteUrl)),
  ];

  validateItems(candidates, siteUrl);

  return {
    version: 1,
    personId: PERSON_ID,
    siteName: siteConfig.siteName,
    siteUrl,
    generatedAt: generatedAt(generatedAtDate),
    items: selectItems(candidates, generatedAtDate),
  };
}
