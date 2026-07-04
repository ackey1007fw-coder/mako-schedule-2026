import type { SocialLink } from "../types";
import { InstagramIcon, TikTokIcon } from "./icons";
import { SectionHeader } from "./SectionHeader";

type LinksSectionProps = {
  socialLinks: SocialLink[];
};

export function LinksSection({ socialLinks }: LinksSectionProps) {
  return (
    <section id="links" className="scroll-mt-24 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader kicker="Links" title="SNSリンク" />

        <div className="grid gap-5 sm:grid-cols-2">
          {socialLinks.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mako-card mako-card-interactive group flex min-h-32 items-start gap-4 border-mako-ink/10 bg-mako-sand p-5 hover:border-mako-primary hover:bg-white"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-mako-primary/40 bg-white text-mako-primary">
                {link.kind === "instagram" ? (
                  <InstagramIcon className="h-5 w-5" />
                ) : (
                  <TikTokIcon className="h-5 w-5" />
                )}
              </span>
              <span>
                <span className="block font-display text-2xl text-mako-ink">{link.label}</span>
                <span className="mt-1 block text-sm font-bold text-mako-secondary-ink">{link.handle}</span>
                <span className="mt-3 block text-sm leading-6 text-mako-ink/62">{link.description}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
