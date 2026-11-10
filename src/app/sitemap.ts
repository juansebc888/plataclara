import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";
import { PROGRAMS } from "@/content/programas";

/** Every static route. Keep in sync when a page is added under src/app. */
const ROUTES = [
  "/",
  "/empezando",
  "/presupuesto",
  "/credito",
  "/deudas",
  "/estafas",
  "/programas",
  "/programas/banca-de-las-oportunidades",
  "/ayuda",
  "/glosario",
  "/herramientas",
  "/herramientas/ahorro",
  "/herramientas/gota-a-gota",
  "/mi-plan",
  "/privacidad",
  "/sobre-el-proyecto",
];

export default function sitemap(): MetadataRoute.Sitemap {
  // Mirrors generateStaticParams in src/app/programas/[slug]/page.tsx.
  const programs = PROGRAMS.filter((p) => p.detail.sections.length > 0).map(
    (p) => `/programas/${p.slug}`
  );
  return [...new Set([...ROUTES, ...programs])].map((path) => ({
    url: new URL(path, SITE.url).toString(),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
