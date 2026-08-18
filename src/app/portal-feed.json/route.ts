import { events } from "@/data/events";
import { news } from "@/data/news";
import { site } from "@/data/site";
import { buildPortalFeed } from "@/lib/portalFeed";

export const dynamic = "force-static";

export function GET() {
  return Response.json(
    buildPortalFeed({
      siteConfig: site,
      newsItems: news,
      eventItems: events,
    }),
  );
}
