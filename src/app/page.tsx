import { BirthdayCountdown } from "../components/BirthdayCountdown";
import { ClipSection } from "../components/ClipSection";
import { Footer } from "../components/Footer";
import { Hero } from "../components/Hero";
import { LinkHubStrip } from "../components/LinkHubStrip";
import { LinksSection } from "../components/LinksSection";
import { NewsBar } from "../components/NewsBar";
import { NextEvent } from "../components/NextEvent";
import { PhotoGallerySection } from "../components/PhotoGallerySection";
import { ProfileSection } from "../components/ProfileSection";
import { QuickNav } from "../components/QuickNav";
import { ScheduleSection } from "../components/ScheduleSection";
import { ScrollToTop } from "../components/ScrollToTop";
import { ShareSection } from "../components/ShareSection";
import { SiteHeader } from "../components/SiteHeader";
import { events } from "../data/events";
import { socialLinks } from "../data/socialLinks";
import { isEventPast, sortEventsAsc, sortEventsDesc } from "../lib/date";

export const revalidate = 3600;

export default function Home() {
  const now = new Date();
  const upcomingEvents = sortEventsAsc(events.filter((event) => !isEventPast(event, now)));
  const pastEvents = sortEventsDesc(events.filter((event) => isEventPast(event, now)));
  const nextEvent = upcomingEvents[0];

  return (
    <div className="min-h-screen bg-mako-sand pb-[calc(6rem+env(safe-area-inset-bottom))] text-mako-ink md:pb-0">
      <SiteHeader />
      <NewsBar />
      <QuickNav />
      <main>
        <Hero socialLinks={socialLinks} />
        <NextEvent event={nextEvent} />
        <ScheduleSection upcomingEvents={upcomingEvents} pastEvents={pastEvents} />
        <ProfileSection />
        <PhotoGallerySection />
        <ClipSection />
        <BirthdayCountdown />
        <LinksSection socialLinks={socialLinks} />
        <ShareSection />
      </main>
      <Footer socialLinks={socialLinks} />
      <ScrollToTop />
      <LinkHubStrip socialLinks={socialLinks} />
    </div>
  );
}
