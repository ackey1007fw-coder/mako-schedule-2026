"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { clips } from "../data/clips";
import type { Clip } from "../types";

function ClipCard({ clip }: { clip: Clip }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.4 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [reduceMotion]);

  return (
    <figure className="mako-card mx-auto w-full max-w-[320px] overflow-hidden p-0">
      <a
        href={clip.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block aspect-[9/16] bg-mako-ink/5"
        aria-label={`${clip.platform}「${clip.title}」を見る`}
      >
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src={clip.src}
          muted
          loop
          playsInline
          preload="metadata"
          autoPlay={!reduceMotion}
          controls={reduceMotion}
          disablePictureInPicture
        />
        <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/45 px-2 py-0.5 text-[11px] font-black text-white backdrop-blur-sm">
          {clip.platform}
        </span>
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-white/85 text-mako-ink shadow-lg">
            <Play className="h-5 w-5 translate-x-0.5" aria-hidden="true" />
          </span>
        </span>
      </a>
      <figcaption className="space-y-1 px-4 py-3 text-center">
        <p className="font-display text-lg text-mako-ink">{clip.title}</p>
        <p className="text-xs text-mako-ink/65">{clip.caption}</p>
      </figcaption>
    </figure>
  );
}

export function ClipSection() {
  if (clips.length === 0) return null;

  return (
    <section id="clips" className="scroll-mt-24 bg-mako-sand px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-mako-secondary">Short Movie</p>
          <h2 className="mt-1 font-display text-2xl text-mako-ink sm:text-3xl">動くまこ</h2>
          <p className="mt-2 text-sm text-mako-ink/60">
            音声はオフで流しているので、本編はタップして元の投稿でどうぞ。
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {clips.map((clip) => (
            <ClipCard key={clip.src} clip={clip} />
          ))}
        </div>
      </div>
    </section>
  );
}
