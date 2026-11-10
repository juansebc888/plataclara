import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Bricolage_Grotesque } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { SITE } from "@/content/site";
import "./globals.css";

/**
 * Headings only. Self-hosted by next/font, but NOT preloaded: it must not
 * compete with the JS on a 3G link, and `swap` paints the fallback first.
 * Body text uses the system stack (Roboto on Android): zero bytes, no reflow.
 */
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-display",
  display: "swap",
  preload: false,
});

const BODY_STACK =
  'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    title: `${SITE.name} — ${SITE.tagline}`,
    siteName: SITE.name,
    description: SITE.description,
    locale: "es_CO",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#faf9f7",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es-CO"
      className={display.variable}
      style={{ ["--font-body" as string]: BODY_STACK }}
      // The inline script below adds `js` before hydration.
      suppressHydrationWarning
    >
      <head>
        {/* Opt in to the scroll-reveal hidden state only when JS runs. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body>
        {/* Without JS the Reveal observer never runs: show everything. */}
        <noscript>
          <style>{`.js [data-reveal],[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <a href="#contenido" className="skip">
          Saltar al contenido
        </a>
        <Navbar />
        <main id="contenido">{children}</main>
        <Footer />
        <RevealObserver />
        <Analytics />
      </body>
    </html>
  );
}
