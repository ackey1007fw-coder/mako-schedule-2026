import Image from "next/image";
import { CalendarCheck, Images } from "lucide-react";
import { profile } from "../data/profile";
import type { SocialLink } from "../types";
import { SocialLinkCards } from "./SocialLinkCards";

type HeroProps = {
  socialLinks: SocialLink[];
};

export function Hero({ socialLinks }: HeroProps) {
  return (
    <section id="top" className="relative border-b border-mako-ink/10 bg-mako-sand">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2 lg:items-stretch">
        <div className="relative order-1 overflow-hidden lg:order-2 lg:min-h-[70svh]">
          <Image
            src={profile.heroImage}
            alt={profile.name}
            width={1200}
            height={1500}
            priority
            className="block w-full lg:hidden"
          />
          <Image
            src={profile.heroImage}
            alt={profile.name}
            fill
            loading="eager"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="hidden object-cover object-[50%_20%] lg:block"
          />
        </div>

        <div className="order-2 flex flex-col justify-center px-4 py-10 sm:px-6 sm:py-14 lg:order-1 lg:px-10 lg:py-20">
          <p className="mb-5 inline-flex self-start rounded-full border border-mako-primary/40 bg-white/70 px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-mako-primary backdrop-blur">
            MAKO Schedule 2026
          </p>
          <h1 className="font-display text-6xl leading-[0.96] text-mako-ink sm:text-7xl">
            {profile.name}
          </h1>
          <p className="mt-4 font-display text-2xl text-mako-ink/65">{profile.romaji}</p>
          <p className="mt-6 max-w-xl text-base leading-8 text-mako-ink/78 sm:mt-7 sm:text-xl sm:leading-9">
            {profile.catchCopy}
          </p>
          <p className="mt-3 max-w-xl leading-8 text-mako-ink/62">{profile.intro}</p>

          <div className="mt-8">
            <SocialLinkCards socialLinks={socialLinks} />
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <a
              href="#schedule"
              className="mako-button mako-button-secondary min-h-12 px-5 py-3 text-sm"
            >
              <CalendarCheck className="h-4 w-4" aria-hidden="true" />
              次の予定を見る
            </a>
            <a href="#gallery" className="mako-button mako-button-soft min-h-12 px-4 py-3 text-sm">
              <Images className="h-4 w-4 text-mako-primary" aria-hidden="true" />
              写真を見る
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
