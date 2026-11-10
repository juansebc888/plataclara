import type { Metadata } from "next";
import { Art } from "@/components/ui/Art";
import { PageHero } from "@/components/ui/PageHero";
import { NextStep } from "@/components/ui/NextStep";
import { OfficialLink } from "@/components/ui/OfficialLink";
import { GOLDEN_RULES, SCAMS } from "@/content/estafas";
import shared from "../subpage.module.css";

export const metadata: Metadata = {
  title: "No caer en estafas",
  description:
    "Las cinco estafas financieras más comunes en Colombia, cómo se ven por dentro y qué hacer si ya caíste.",
  openGraph: {
    title: "No caer en estafas",
    description: "Las cinco estafas financieras más comunes en Colombia, cómo se ven por dentro y qué hacer si ya caíste.",
    url: "/estafas",
  },
  alternates: { canonical: "/estafas" },
};

export default function Page() {
  return (
    <>
      <PageHero
        title="No caer en estafas"
        answer={
          <>
            <p>
              Si te piden plata antes de prestarte, es estafa. Ningún préstamo
              de verdad cobra por adelantado.
            </p>
            <p>No consignes nada. Pregúntale a alguien de confianza.</p>
          </>
        }
        art={<Art name="estafas" />}
        trail={[{ label: "No caer en estafas" }]}
      />

      <section className={shared.body}>
        <div className="shell">
          <h2 className="h2">Cinco señales de estafa.</h2>
          <ol className="list-plain">
            {GOLDEN_RULES.map(([t, d]) => (
              <li key={t}>
                <strong>{t}.</strong> {d}
              </li>
            ))}
          </ol>

          <div className="warn">
            <p>
              <strong>Si ya consignaste o diste tu clave, hoy mismo:</strong>
            </p>
            <ol>
              <li>No consignes más. Eso no te devuelve lo anterior.</li>
              <li>
                Si diste la clave o el código, llama a tu banco al número que
                está en la tarjeta y bloquéala.
              </li>
              <li>Guarda los chats, los números y los comprobantes.</li>
              <li>Denuncia en la Fiscalía. Es gratis y no necesitas abogado.</li>
            </ol>
            <OfficialLink href="https://www.fiscalia.gov.co" label="fiscalia.gov.co" />
          </div>
        </div>
      </section>

      <section className={shared.details}>
        <div className="shell">
          <h2 className={`h2 ${shared.detailsHead}`}>Las estafas más comunes.</h2>
          {SCAMS.map((s) => (
            <details key={s.slug} className="more-details">
              <summary>{s.name}</summary>
              <div className="more-body">
                <blockquote className={shared.quote}>{s.looksLike}</blockquote>
                <p>
                  <strong>La señal:</strong> {s.tell}
                </p>
                <ul className="list-plain">
                  {s.how.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
                <p className={shared.gapTop}>
                  <strong>Si ya caíste:</strong> {s.ifCaught}
                </p>
              </div>
            </details>
          ))}

          <details className="more-details">
            <summary>Si ya te pasó, no es culpa tuya</summary>
            <div className="more-body">
              <p>
                Los estafadores son profesionales. Usan la prisa, el susto y
                la esperanza. Caer no te hace ingenuo.
              </p>
              <p>
                Lo único que sí es un error es callarse por vergüenza.
                Denunciar ayuda a que agarren al que lo hizo.
              </p>
              <p>
                Si la estafa usó un banco o una entidad vigilada, pon también
                la queja en la Superfinanciera (la oficina del gobierno que
                vigila a los bancos).
              </p>
              <p>
                <OfficialLink href="https://www.superfinanciera.gov.co" label="superfinanciera.gov.co" />
              </p>
            </div>
          </details>
        </div>
      </section>

      <NextStep
        links={[
          { href: "/programas", title: "¿Dónde pido un préstamo de verdad?" },
          { href: "/ayuda", title: "¿A quién le reclamo?" },
        ]}
      />
    </>
  );
}
