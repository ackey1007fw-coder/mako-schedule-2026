"use client";

import { Gift } from "lucide-react";
import { useEffect, useState } from "react";
import { site } from "../data/site";
import { getBirthdayCountdown } from "../lib/date";
import { SectionHeader } from "./SectionHeader";

const SHOW_WITHIN_DAYS = 60;

export function BirthdayCountdown() {
  const birthday = site.birthday;
  const [mounted, setMounted] = useState(false);
  const [countdown, setCountdown] = useState(() =>
    birthday ? getBirthdayCountdown(birthday) : null,
  );

  useEffect(() => {
    setMounted(true);
    if (!birthday) return;
    const timer = window.setInterval(() => {
      setCountdown(getBirthdayCountdown(birthday));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [birthday]);

  // 誕生日が本人確認できていない間は非表示（AGENTS.md 絶対ルール2）。
  if (!birthday || !countdown) return null;

  const isApproaching = countdown.isBirthdayToday || countdown.days <= SHOW_WITHIN_DAYS;
  if (!isApproaching) return null;

  // マウント前はサーバー描画時刻と初回クライアント描画時刻がズレるため、
  // 秒単位まで含む数字部分だけプレースホルダーにしてhydration不整合を避ける。
  const values = [
    { label: "日", value: mounted ? countdown.days : undefined },
    { label: "時間", value: mounted ? countdown.hours : undefined },
    { label: "分", value: mounted ? countdown.minutes : undefined },
    { label: "秒", value: mounted ? countdown.seconds : undefined },
  ];

  return (
    <section id="birthday" className="scroll-mt-24 bg-mako-sand py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Birthday Countdown"
          title="お誕生日までのカウントダウン"
          copy={`${countdown.targetLabel}まで、あと少し。SNSで一緒にお祝いしよう。`}
        />
        <div className="mako-card border border-mako-primary/30 bg-white p-5 shadow-paper sm:p-6">
          <div className="mb-5 flex items-center gap-3 text-mako-primary">
            <Gift className="h-5 w-5" aria-hidden="true" />
            <p className="text-sm font-bold">{countdown.targetLabel}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {values.map((item) => (
              <div key={item.label} className="rounded-xl border border-mako-ink/10 bg-mako-sand p-4 text-center">
                <span className="block font-display text-4xl tabular-nums text-mako-ink sm:text-5xl">
                  {item.value === undefined ? "--" : String(item.value).padStart(2, "0")}
                </span>
                <div className="mt-2 text-xs font-bold text-mako-ink/55">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
