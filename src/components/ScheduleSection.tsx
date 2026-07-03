import { ChevronDown } from "lucide-react";
import type { ScheduleEvent } from "../types";
import { EventCard } from "./EventCard";
import { SectionHeader } from "./SectionHeader";

type ScheduleSectionProps = {
  upcomingEvents: ScheduleEvent[];
  pastEvents: ScheduleEvent[];
};

export function ScheduleSection({ upcomingEvents, pastEvents }: ScheduleSectionProps) {
  const nextId = upcomingEvents[0]?.id;

  return (
    <section id="schedule" className="scroll-mt-24 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader kicker="Schedule" title="スケジュール" />

        {upcomingEvents.length === 0 && pastEvents.length === 0 && (
          <p className="mako-card border border-mako-ink/10 bg-mako-sand p-8 text-center text-mako-ink/60">
            決まり次第、ここに掲載します。
          </p>
        )}

        {upcomingEvents.length > 0 && (
          <div className="mb-12">
            <div className="mb-5 flex items-end justify-between gap-4 border-b border-mako-primary/25 pb-4">
              <div>
                <p className="text-xs font-bold uppercase text-mako-secondary">Upcoming</p>
                <h3 className="mt-1 font-display text-3xl text-mako-ink">今後の予定</h3>
              </div>
              <span className="rounded-full border border-mako-ink/15 bg-mako-sand px-3 py-2 text-xs font-bold text-mako-ink/62">
                {upcomingEvents.length}件
              </span>
            </div>
            <div className="grid gap-5">
              {upcomingEvents.map((event) => (
                <div key={event.id} id={`event-${event.id}`} className="scroll-mt-24">
                  <EventCard event={event} isNext={event.id === nextId} />
                </div>
              ))}
            </div>
          </div>
        )}

        {pastEvents.length > 0 && (
          <details className="group border-y border-mako-ink/10">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 marker:hidden">
              <div>
                <p className="text-xs font-bold uppercase text-mako-secondary">Archive</p>
                <h3 className="mt-1 font-display text-3xl text-mako-ink">終了済みイベント</h3>
              </div>
              <span className="flex shrink-0 items-center gap-2 rounded-full border border-mako-ink/15 bg-mako-sand px-3 py-2 text-xs font-bold text-mako-ink/62">
                {pastEvents.length}件
                <ChevronDown className="h-4 w-4 text-mako-secondary transition group-open:rotate-180" aria-hidden="true" />
              </span>
            </summary>
            <div className="grid gap-5 pb-8 pt-2 lg:grid-cols-2">
              {pastEvents.map((event) => (
                <div key={event.id} id={`event-${event.id}`} className="scroll-mt-24">
                  <EventCard event={event} compact />
                </div>
              ))}
            </div>
          </details>
        )}
      </div>
    </section>
  );
}
