import type { MetadataRoute } from "next";
import { routes, site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((route) => ({
    url: route.path === "/" ? site.url : `${site.url}${route.path}`,
    lastModified,
    changeFrequency: route.path === "/" || route.path === "/announcements" ? "weekly" : "monthly",
    priority: route.path === "/" ? 1 : route.path === "/join" ? 0.9 : 0.7,
  }));
}
