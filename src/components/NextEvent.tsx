import { CalendarPlus, Clock3, MapPin } from "lucide-react";
import Image from "next/image";
import { categoryMeta } from "../lib/eventMeta";
import { googleCalendarUrl } from "../lib/share";
import type { ScheduleEvent } from "../types";
import { Badge } from "./Badge";
import { ExternalButton } from "./ExternalButton";
import { SectionHeader } from "./SectionHeader";

type NextEventProps = {
  event?: ScheduleEvent;
};

export function NextEvent({ event }: NextEventProps) {
  if (!event) {
    return (
      <section id="next" className="scroll-mt-24 relative overflow-hidden bg-mako-sand py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            kicker="Next"
            title="次の予定"
            copy="次に会えるのはいつ？決まり次第ここに掲載します。最新情報はSNSでチェックできます。"
          />
          <article className="mako-card border border-mako-primary/40 bg-white p-8 text-center sm:p-12">
            <p className="inline-flex items-center gap-2 text-xs font-black uppercase text-mako-primary-ink">
              <Clock3 className="h-4 w-4" aria-hidden="true" />
              Coming soon
            </p>
            <h3 className="mt-4 font-display text-3xl leading-tight text-mako-ink sm:text-4xl">
              次の予定は調整中です
            </h3>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a href="#links" className="mako-button mako-button-secondary min-h-12 px-5 py-3 text-sm">
                SNSで最新情報を見る
              </a>
            </div>
          </article>
        </div>
      </section>
    );
  }

  const meta = categoryMeta[event.category];
  const Icon = meta.Icon;
  const ticketLink = event.links.find((link) => link.kind === "ticket") ?? event.links[0];

  return (
    <section id="next" className="scroll-mt-24 relative overflow-hidden bg-mako-sand py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader kicker="Next" title="次の予定" />

        <article
          id={`event-${event.id}`}
          className="mako-card scroll-mt-24 grid overflow-hidden border border-mako-primary/40 bg-white lg:grid-cols-[1.12fr_0.88fr]"
        >
          {event.image && (
            <div className="relative overflow-hidden bg-mako-ink lg:min-h-[420px]">
              <Image
                src={event.image}
                alt={event.title}
                width={900}
                height={600}
                className="block w-full object-cover object-top lg:hidden"
              />
              <Image
                src={event.image}
                alt={event.title}
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="hidden object-cover object-top lg:block"
              />
            </div>
          )}

          <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
            <div>
              <div className="mb-6 flex flex-wrap gap-2">
                <Badge strong>NEXT</Badge>
                <Badge category={event.category}>{meta.label}</Badge>
              </div>
              <div className="mb-6 flex items-start gap-4">
                <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-full border ${meta.tone}`}>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-3xl leading-tight text-mako-ink sm:text-4xl">
                    {event.title}
                  </h3>
                  <p className="mt-4 flex gap-2 text-sm font-bold text-mako-primary-ink">
                    <Clock3 className="h-4 w-4 shrink-0" aria-hidden="true" />
                    {event.displayDate}
                  </p>
                </div>
              </div>
              <p className="text-lg leading-9 text-mako-ink/72">{event.summary}</p>
              {event.venue && (
                <p className="mt-5 flex gap-2 border-l-2 border-mako-primary pl-4 text-sm font-bold text-mako-ink/70">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-mako-primary" aria-hidden="true" />
                  {event.venue}
                </p>
              )}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              {ticketLink && (
                <ExternalButton href={ticketLink.url} variant="primary" className="w-full sm:w-auto">
                  {ticketLink.kind === "ticket" ? "チケット予約" : ticketLink.label}
                </ExternalButton>
              )}
              <a
                href={googleCalendarUrl(event)}
                target="_blank"
                rel="noopener noreferrer"
                className="mako-button mako-button-soft min-h-12 px-4 py-3 text-sm"
              >
                <CalendarPlus className="h-4 w-4 text-mako-secondary" aria-hidden="true" />
                カレンダーに追加
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
