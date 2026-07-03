"use client";

import { useEffect, useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";
import { profile } from "../data/profile";
import { SITE_URL, lineShareUrl, threadsShareUrl } from "../lib/share";

export function ShareSection() {
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);
  const url = SITE_URL;
  const text = `${profile.name}さんの応援スケジュール`;

  useEffect(() => {
    setCanNativeShare(typeof navigator !== "undefined" && !!navigator.share);
  }, []);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* クリップボード非対応時は何もしない */
    }
  };

  const nativeShare = async () => {
    try {
      await navigator.share({ title: "MAKO Schedule 2026", text, url });
    } catch {
      /* キャンセル/非対応時は何もしない */
    }
  };

  return (
    <section id="share" className="scroll-mt-24 bg-mako-sand px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl border-y border-mako-primary/25 py-10 text-center">
        <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase text-mako-secondary">
          <Share2 className="h-4 w-4" aria-hidden="true" />
          Share
        </p>
        <h2 className="font-display text-3xl leading-tight text-mako-ink sm:text-4xl">このページをシェア</h2>

        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
          <a
            href={threadsShareUrl(text, url)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-mako-ink bg-mako-ink px-5 py-3 text-sm font-bold text-white transition hover:opacity-90 sm:w-auto"
          >
            Threadsでシェア
          </a>
          <a
            href={lineShareUrl(url)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-[#06c755] bg-[#06c755] px-5 py-3 text-sm font-bold text-mako-ink transition hover:opacity-90 sm:w-auto"
          >
            LINEで送る
          </a>
          {canNativeShare && (
            <button
              type="button"
              onClick={nativeShare}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-mako-primary bg-white px-5 py-3 text-sm font-bold text-mako-ink transition hover:bg-mako-sand sm:w-auto"
            >
              ストーリーズ等でシェア
            </button>
          )}
          <button
            type="button"
            onClick={copyLink}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-mako-ink/20 bg-white px-5 py-3 text-sm font-bold text-mako-ink transition hover:border-mako-primary sm:w-auto"
          >
            {copied ? <Check className="h-4 w-4 text-mako-secondary" aria-hidden="true" /> : <Copy className="h-4 w-4 text-mako-secondary" aria-hidden="true" />}
            {copied ? "コピーしました" : "リンクをコピー"}
          </button>
        </div>
      </div>
    </section>
  );
}
