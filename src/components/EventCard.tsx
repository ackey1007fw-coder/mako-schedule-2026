import Image from "next/image";
import { CalendarDays, CalendarPlus, MapPin } from "lucide-react";
import { categoryMeta } from "../lib/eventMeta";
import { isEventPast } from "../lib/date";
import { googleCalendarUrl } from "../lib/share";
import type { ScheduleEvent } from "../types";
import { Badge } from "./Badge";
import { ExternalButton } from "./ExternalButton";

type EventCardProps = {
  event: ScheduleEvent;
  isNext?: boolean;
  compact?: boolean;
};

export function EventCard({ event, isNext = false, compact = false }: EventCardProps) {
  const meta = categoryMeta[event.category];
  const Icon = meta.Icon;
  const upcoming = !isEventPast(event);

  return (
    <article
      className={`mako-card mako-card-interactive group relative grid overflow-hidden bg-white ${
        event.isImportant || isNext ? "border-mako-primary/60" : "border-mako-ink/10"
      } ${event.image ? (compact ? "sm:grid-cols-[160px_1fr]" : "sm:grid-cols-[220px_1fr]") : ""}`}
    >
      {(event.isImportant || isNext) && (
        <div className="absolute left-0 top-0 z-10 h-full w-1 bg-mako-primary" />
      )}

      {event.image && (
        <div className="relative bg-mako-sand">
          <Image
            src={event.image}
            alt={event.title}
            width={440}
            height={330}
            className="block w-full object-cover object-top sm:hidden"
          />
          <Image
            src={event.image}
            alt={event.title}
            fill
            sizes={compact ? "(min-width: 640px) 160px, 100vw" : "(min-width: 640px) 220px, 100vw"}
            className="hidden object-cover object-top sm:block"
          />
        </div>
      )}

      <div className={`${compact ? "p-5" : "p-6"} flex flex-col`}>
        <div className="mb-4 flex flex-wrap gap-2">
          {isNext && <Badge strong>NEXT</Badge>}
          <Badge category={event.category}>{meta.label}</Badge>
          {event.badges
            .filter((badge) => badge !== "NEXT" && badge !== meta.label)
            .slice(0, compact ? 3 : 5)
            .map((badge) => (
              <Badge key={badge}>{badge}</Badge>
            ))}
        </div>

        <div className="flex items-start gap-3">
          <span className={`mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border ${meta.tone}`}>
            <Icon className="h-4 w-4" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <h3 className={`font-display leading-tight text-mako-ink ${compact ? "text-xl" : "text-2xl"}`}>
              {event.title}
            </h3>
            <div className="mt-3 grid gap-2 text-sm text-mako-ink/62">
              <p className="flex gap-2">
                <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-mako-secondary" />
                <span>{event.displayDate}</span>
              </p>
              {event.venue && (
                <p className="flex gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-mako-secondary" />
                  <span>{event.venue}</span>
                </p>
              )}
            </div>
          </div>
        </div>

        <p className={`${compact ? "mt-4" : "mt-5"} leading-8 text-mako-ink/72`}>{event.summary}</p>

        {(event.links.length > 0 || upcoming) && (
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {event.links.map((link, index) => (
              <ExternalButton
                key={link.url}
                href={link.url}
                variant={link.kind === "ticket" ? "primary" : index === 0 ? "secondary" : "soft"}
              >
                {link.label}
              </ExternalButton>
            ))}
            {upcoming && (
              <a
                href={googleCalendarUrl(event)}
                target="_blank"
                rel="noopener noreferrer"
                className="mako-button mako-button-soft min-h-12 px-4 py-3 text-sm"
              >
                <CalendarPlus className="h-4 w-4 text-mako-secondary" aria-hidden="true" />
                カレンダー
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
