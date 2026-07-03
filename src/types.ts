export type EventCategory = "stage" | "event" | "media" | "web" | "birthday" | "collab";

export type EventLink = {
  label: string;
  url: string;
  kind?: "ticket" | "stream" | "info" | "sns";
};

export type ScheduleEvent = {
  id: string;
  title: string;
  shortTitle: string;
  category: EventCategory;
  startAt: string;
  endAt?: string;
  dates?: string[];
  displayDate: string;
  venue?: string;
  image?: string;
  summary: string;
  badges: string[];
  links: EventLink[];
  isImportant?: boolean;
  isNextFocus?: boolean;
};

export type SocialLink = {
  label: string;
  handle: string;
  url: string;
  description: string;
  kind: "instagram" | "tiktok" | "web";
};

export type GalleryPhoto = {
  src: string;
  alt: string;
  date?: string;
};

export type NewsItem = {
  date: string;
  label: string;
  text: string;
  url?: string;
};

export type Clip = {
  src: string;
  platform: "TikTok" | "Instagram";
  title: string;
  caption: string;
  bgm?: string;
  url: string;
};
