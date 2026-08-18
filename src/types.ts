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
  /** この予定をサイトへ掲載した日。日付のみの場合はPortal FeedでJST日付として扱う。 */
  listedAt: string;
  /** 実際の開催開始日時（offset付きISO datetime）。 */
  startAt: string;
  /** 実際の開催終了日時。UIの終了判定・カレンダー・JSON-LDでも同じ意味で使用する。 */
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
  poster?: string; // 動画1フレーム目の画像(/images/clips/xxx.jpg)。読み込み中の黒い箱を防ぐ
  platform: "TikTok" | "Instagram";
  title: string;
  caption: string;
  bgm?: string;
  url: string;
};
