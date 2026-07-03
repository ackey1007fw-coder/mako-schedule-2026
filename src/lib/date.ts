import type { ScheduleEvent } from "../types";

export const toDateKey = (iso: string) => iso.slice(0, 10);

export const eventStartDate = (event: ScheduleEvent) => new Date(event.startAt);

export const eventEndDate = (event: ScheduleEvent) =>
  new Date(event.endAt ?? event.startAt);

export const isEventPast = (event: ScheduleEvent, now = new Date()) =>
  eventEndDate(event).getTime() < now.getTime();

export const sortEventsAsc = (events: ScheduleEvent[]) =>
  [...events].sort((a, b) => eventStartDate(a).getTime() - eventStartDate(b).getTime());

export const sortEventsDesc = (events: ScheduleEvent[]) =>
  [...events].sort((a, b) => eventStartDate(b).getTime() - eventStartDate(a).getTime());

export type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  targetLabel: string;
  isBirthdayToday: boolean;
};

// "MM-DD" 形式の誕生日から、次回の誕生日までのカウントダウンを算出する。
export const getBirthdayCountdown = (monthDay: string, now = new Date()): CountdownParts => {
  const [month, day] = monthDay.split("-").map(Number);
  const isBirthdayToday = now.getMonth() + 1 === month && now.getDate() === day;

  if (isBirthdayToday) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      targetLabel: `${now.getFullYear()}年${month}月${day}日`,
      isBirthdayToday: true,
    };
  }

  let target = new Date(now.getFullYear(), month - 1, day, 0, 0, 0);
  if (target.getTime() < now.getTime()) {
    target = new Date(now.getFullYear() + 1, month - 1, day, 0, 0, 0);
  }

  const diff = Math.max(target.getTime() - now.getTime(), 0);
  const secondsTotal = Math.floor(diff / 1000);

  return {
    days: Math.floor(secondsTotal / 86400),
    hours: Math.floor((secondsTotal % 86400) / 3600),
    minutes: Math.floor((secondsTotal % 3600) / 60),
    seconds: secondsTotal % 60,
    targetLabel: `${target.getFullYear()}年${month}月${day}日`,
    isBirthdayToday: false,
  };
};
