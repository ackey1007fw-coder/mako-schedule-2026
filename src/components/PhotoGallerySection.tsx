"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Images, X } from "lucide-react";
import { galleryPhotos } from "../data/photos";
import { SectionHeader } from "./SectionHeader";

const wrapIndex = (index: number) => (index + galleryPhotos.length) % galleryPhotos.length;
const SWIPE_THRESHOLD_PX = 50;

export function PhotoGallerySection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const lastOpenedIndexRef = useRef<number | null>(null);
  const touchStartXRef = useRef<number | null>(null);

  const openPhoto = useCallback((index: number) => {
    lastOpenedIndexRef.current = index;
    setSelectedIndex(index);
  }, []);
  const closePhoto = useCallback(() => setSelectedIndex(null), []);
  const showPrevious = useCallback(() => {
    setSelectedIndex((current) => (current === null ? current : wrapIndex(current - 1)));
  }, []);
  const showNext = useCallback(() => {
    setSelectedIndex((current) => (current === null ? current : wrapIndex(current + 1)));
  }, []);

  useEffect(() => {
    if (selectedIndex === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePhoto();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closePhoto, selectedIndex, showNext, showPrevious]);

  useEffect(() => {
    document.body.style.overflow = selectedIndex === null ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedIndex]);

  // モーダルを閉じたら、開くきっかけになったサムネイルへフォーカスを戻す。
  useEffect(() => {
    if (selectedIndex !== null) return;
    const indexToFocus = lastOpenedIndexRef.current;
    if (indexToFocus === null) return;
    thumbnailRefs.current[indexToFocus]?.focus();
    lastOpenedIndexRef.current = null;
  }, [selectedIndex]);

  const onTouchStart = (event: React.TouchEvent) => {
    touchStartXRef.current = event.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (event: React.TouchEvent) => {
    const startX = touchStartXRef.current;
    const endX = event.changedTouches[0]?.clientX;
    touchStartXRef.current = null;
    if (startX === null || endX === undefined) return;
    const delta = endX - startX;
    if (Math.abs(delta) < SWIPE_THRESHOLD_PX) return;
    if (delta > 0) showPrevious();
    else showNext();
  };

  if (galleryPhotos.length === 0) return null;

  const selectedPhoto = selectedIndex === null ? null : galleryPhotos[selectedIndex];

  return (
    <section id="gallery" className="scroll-mt-24 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader kicker="Photo Gallery" title="写真" />
        <div className="mb-4 flex items-center gap-2 text-sm font-bold text-mako-ink/70">
          <Images className="h-5 w-5 text-mako-primary" aria-hidden="true" />
          <span>{galleryPhotos.length}枚</span>
        </div>

        <div className="columns-2 gap-4 sm:columns-3 lg:columns-4 [&>figure]:mb-4 [&>figure]:break-inside-avoid">
          {galleryPhotos.map((photo, index) => (
            <figure key={photo.src} className="mako-card overflow-hidden border-mako-ink/10 bg-mako-sand">
              <button
                type="button"
                ref={(el) => {
                  thumbnailRefs.current[index] = el;
                }}
                onClick={() => openPhoto(index)}
                className="block w-full text-left"
                aria-label={`${photo.alt}を大きく表示`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={600}
                  height={450}
                  className="block h-auto w-full"
                />
              </button>
            </figure>
          ))}
        </div>
      </div>

      {selectedPhoto && selectedIndex !== null && (
        <div
          className="fixed inset-0 z-[999] h-[100dvh] overscroll-contain bg-mako-ink px-3 py-4 text-white sm:px-6"
          role="dialog"
          aria-modal="true"
          aria-label="写真拡大表示"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="mx-auto flex h-full max-w-5xl flex-col">
            <div className="flex items-center justify-between gap-3">
              <p className="truncate text-sm font-semibold text-white/75">{selectedPhoto.alt}</p>
              <button
                type="button"
                onClick={closePhoto}
                className="grid min-h-12 min-w-12 place-items-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/20"
                aria-label="閉じる"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="relative mt-4 grid min-h-0 flex-1 place-items-center">
              <button
                type="button"
                onClick={showPrevious}
                className="absolute left-0 z-10 grid min-h-12 min-w-12 place-items-center rounded-full border border-white/15 bg-black/60 text-white transition hover:bg-black sm:left-4"
                aria-label="前の写真"
              >
                <ChevronLeft className="h-6 w-6" aria-hidden="true" />
              </button>
              <Image
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                width={1200}
                height={900}
                className="max-h-[74vh] w-auto max-w-full object-contain"
              />
              <button
                type="button"
                onClick={showNext}
                className="absolute right-0 z-10 grid min-h-12 min-w-12 place-items-center rounded-full border border-white/15 bg-black/60 text-white transition hover:bg-black sm:right-4"
                aria-label="次の写真"
              >
                <ChevronRight className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
