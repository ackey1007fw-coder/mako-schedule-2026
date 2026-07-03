import Image from "next/image";
import { profile } from "../data/profile";
import { SectionHeader } from "./SectionHeader";

export function ProfileSection() {
  return (
    <section id="profile" className="scroll-mt-24 bg-mako-sand py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.86fr_1.14fr] lg:px-8">
        <div>
          <SectionHeader kicker="Profile" title="プロフィール" />
          <div className="mako-card border border-mako-primary/30 bg-white p-5 shadow-paper">
            <p className="font-display text-4xl text-mako-ink">{profile.name}</p>
            <p className="mt-2 text-lg text-mako-ink/55">{profile.romaji}</p>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[0.88fr_1.12fr]">
          {profile.portraitImage && (
            <div className="mako-card relative overflow-hidden border-white bg-white lg:min-h-[380px]">
              <Image
                src={profile.portraitImage}
                alt={`${profile.name} portrait`}
                width={600}
                height={800}
                className="block h-auto w-full object-contain lg:hidden"
              />
              <Image
                src={profile.portraitImage}
                alt={`${profile.name} portrait`}
                fill
                sizes="(min-width: 1024px) 34vw, 100vw"
                className="hidden object-cover object-top lg:block"
              />
            </div>
          )}
          <div className="grid gap-3">
            {profile.facts.length > 0 ? (
              profile.facts.map((fact) => (
                <div key={fact.label} className="mako-card grid grid-cols-[88px_1fr] border-mako-ink/10 bg-white">
                  <div className="border-r border-mako-ink/10 bg-mako-sand px-4 py-4 text-xs font-bold text-mako-primary">
                    {fact.label}
                  </div>
                  <div className="px-4 py-4 text-sm font-semibold leading-7 text-mako-ink/75">
                    {fact.value}
                  </div>
                </div>
              ))
            ) : (
              <p className="mako-card border border-mako-ink/10 bg-white p-5 text-sm leading-7 text-mako-ink/60">
                プロフィール項目は本人確認が取れたものから順次追加していきます。
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
