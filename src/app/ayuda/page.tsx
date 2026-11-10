import type { Metadata } from "next";
import { Art } from "@/components/ui/Art";
import { PageHero } from "@/components/ui/PageHero";
import { NextStep } from "@/components/ui/NextStep";
import { OfficialLink } from "@/components/ui/OfficialLink";
import { CHANNELS, RIGHTS_NOTES } from "@/content/ayuda";
import shared from "../subpage.module.css";

export const metadata: Metadata = {
  title: "Hablar con alguien",
  description:
    "Dónde acudir cuando una entidad financiera no responde, te cobró de más o un prestamista te está amenazando. Todos estos canales son gratuitos.",
  openGraph: {
    title: "Hablar con alguien",
    description: "Dónde acudir cuando una entidad financiera no responde, te cobró de más o un prestamista te está amenazando. Todos estos canales son gratuitos.",
    url: "/ayuda",
  },
  alternates: { canonical: "/ayuda" },
};

export default function Page() {
  return (
    <>
      <PageHero
        title="Hablar con alguien"
        answer={
          <>
            <p>
              Si un banco te cobró algo raro, reclama primero por escrito al
              banco. Si no responde, ve al Defensor del Consumidor.
            </p>
            <p>Todo es gratis. Nadie te puede cobrar por atenderte.</p>
          </>
        }
        art={<Art name="ayuda" />}
        trail={[{ label: "Hablar con alguien" }]}
      />

      <section className={shared.body}>
        <div className="shell">
          <div className="warn">
            <p>
              <strong>Si un prestamista te amenaza:</strong> eso es un delito,
              aunque sí debas la plata. Si estás en peligro ahora, llama al{" "}
              <strong>123</strong>. Después denuncia en la Policía o la
              Fiscalía. Es gratis.
            </p>
            <OfficialLink href="https://www.fiscalia.gov.co" label="fiscalia.gov.co" />
          </div>

          <h2 className={`h2 ${shared.gapTop}`}>A dónde ir, según el problema.</h2>
          <ol className="list-plain">
            {CHANNELS.map((c) => (
              <li key={c.name}>
                <strong>{c.name}.</strong> {c.forWhat}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={shared.details}>
        <div className="shell">
          {CHANNELS.map((c) => (
            <details key={c.name} className="more-details">
              <summary>Cómo llegar: {c.name}</summary>
              <div className="more-body">
                <p>{c.how}</p>
                <p>{c.cost}</p>
                {c.url && c.urlLabel ? (
                  <p>
                    <OfficialLink href={c.url} label={c.urlLabel} compact />
                  </p>
                ) : null}
              </div>
            </details>
          ))}

          <details className="more-details">
            <summary>Tres cosas que casi nadie te dice</summary>
            <div className="more-body">
              <ul className="list-plain">
                {RIGHTS_NOTES.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
              <p className={shared.gapTop}>
                No publicamos teléfonos ni direcciones de oficinas: cambian.
                El dato correcto está en cada enlace oficial.
              </p>
            </div>
          </details>
        </div>
      </section>

      <NextStep
        links={[
          { href: "/deudas", title: "Le debo a un gota a gota. ¿Qué hago?" },
          { href: "/estafas", title: "¿Cómo sé si es una estafa?" },
        ]}
      />
    </>
  );
}
