import type { MetadataRoute } from "next";
import { site } from "../data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.siteName,
    short_name: site.siteName,
    start_url: "/",
    display: "standalone",
    background_color: "#fff6ec",
    theme_color: "#ff6b8a",
  };
}
