import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config/site";
import { services } from "@/data/services";
import { products } from "@/data/products";
import { portfolioProjects } from "@/data/portfolio";
import { founders } from "@/data/team";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/services/",
    "/products/",
    "/portfolio/",
    "/team/",
    "/about/",
    "/contact/",
    "/terms/",
    "/privacy/",
  ];

  const dynamicRoutes = [
    ...services.map((s) => `/services/${s.slug}/`),
    ...products.map((p) => `/products/${p.slug}/`),
    ...portfolioProjects.map((p) => `/portfolio/${p.slug}/`),
    ...founders.map((f) => `/team/${f.slug}/`),
  ];

  return [...staticRoutes, ...dynamicRoutes].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));
}
