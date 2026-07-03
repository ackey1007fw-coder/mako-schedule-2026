import { events } from "../data/events";
import { profile } from "../data/profile";
import { site } from "../data/site";
import { socialLinks } from "../data/socialLinks";
import { isEventPast } from "./date";

const toAbsolute = (path: string) => (path.startsWith("http") ? path : `${site.siteUrl}${path}`);

export function buildJsonLd() {
  const personId = `${site.siteUrl}/#person`;
  const isOfficial = site.mode === "official";

  const person: Record<string, unknown> = {
    "@type": "Person",
    "@id": personId,
    name: profile.name,
    alternateName: profile.romaji,
    image: toAbsolute(profile.heroImage),
    sameAs: socialLinks.map((link) => link.url),
  };
  if (isOfficial) person.url = site.siteUrl;

  const website = {
    "@type": "WebSite",
    "@id": `${site.siteUrl}/#website`,
    name: isOfficial ? site.siteName : `${site.siteName} (Approved Fan Site)`,
    url: site.siteUrl,
  };

  const eventNodes = events
    .filter((event) => !isEventPast(event))
    .map((event) => {
      const node: Record<string, unknown> = {
        "@type": "Event",
        "@id": `${site.siteUrl}/#event-${event.id}`,
        name: event.title,
        startDate: event.startAt,
        endDate: event.endAt ?? event.startAt,
        description: event.summary,
        performer: { "@id": personId },
        url: `${site.siteUrl}/#schedule`,
      };
      if (event.image) node.image = [toAbsolute(event.image)];
      if (event.venue) node.location = { "@type": "Place", name: event.venue };
      const ticketLink = event.links.find((link) => link.kind === "ticket");
      if (ticketLink) node.offers = { "@type": "Offer", url: ticketLink.url };
      return node;
    });

  return {
    "@context": "https://schema.org",
    "@graph": [person, website, ...eventNodes],
  };
}
