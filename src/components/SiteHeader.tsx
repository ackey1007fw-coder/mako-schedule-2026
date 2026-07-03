import { CalendarDays } from "lucide-react";
import { profile } from "../data/profile";
import { site } from "../data/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-mako-ink/10 bg-mako-sand/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex min-w-0 items-center gap-3 text-mako-ink">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-mako-primary/50 bg-white">
            <CalendarDays className="h-4 w-4 text-mako-primary" aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-base leading-none min-[430px]:text-lg">
              {profile.name} Schedule
            </span>
            <span className="mt-1 block text-[11px] font-semibold text-mako-ink/55">
              {site.modeLabel[site.mode].ja}
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-5 text-sm font-semibold text-mako-ink/70 md:flex">
          <a href="#next" className="transition-colors hover:text-mako-primary">
            次の予定
          </a>
          <a href="#schedule" className="transition-colors hover:text-mako-primary">
            スケジュール
          </a>
          <a href="#gallery" className="transition-colors hover:text-mako-primary">
            写真
          </a>
          <a href="#profile" className="transition-colors hover:text-mako-primary">
            プロフィール
          </a>
          <a href="#links" className="transition-colors hover:text-mako-primary">
            SNS
          </a>
        </nav>
      </div>
    </header>
  );
}
