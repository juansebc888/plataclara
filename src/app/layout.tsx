import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Atkinson_Hyperlegible, Source_Serif_4 } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SITE } from "@/content/site";
import "./globals.css";

/**
 * Titulares en serif, como una cartilla impresa. Texto en Atkinson
 * Hyperlegible, diseñada por el Braille Institute para que las letras
 * que se confunden (I, l, 1 / 0, O) sean fáciles de distinguir.
 * next/font las sirve desde el mismo dominio: sin petición a Google.
 */
const display = Source_Serif_4({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    title: SITE.name,
    description: SITE.description,
    locale: "es_CO",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#fbf8f1",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-CO" className={`${display.variable} ${body.variable}`}>
      <body>
        <a href="#contenido" className="skip">
          Saltar al contenido
        </a>
        <Navbar />
        <main id="contenido">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
