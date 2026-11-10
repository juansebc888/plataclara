import type { Metadata } from "next";
import { Art } from "@/components/ui/Art";
import { PageHero } from "@/components/ui/PageHero";
import { NextStep } from "@/components/ui/NextStep";
import { OfficialLink } from "@/components/ui/OfficialLink";
import { BUREAUS, CREDIT_MYTHS, CREDIT_RIGHTS, CREDIT_STEPS } from "@/content/credito";
import shared from "../subpage.module.css";

export const metadata: Metadata = {
  title: "Pedir prestado",
  description:
    "Qué es el historial crediticio, cómo empezar uno desde cero y qué derechos tienes sobre tu propia información.",
  openGraph: {
    title: "Pedir prestado",
    description: "Qué es el historial crediticio, cómo empezar uno desde cero y qué derechos tienes sobre tu propia información.",
    url: "/credito",
  },
  alternates: { canonical: "/credito" },
};

export default function Page() {
  return (
    <>
      <PageHero
        title="Pedir prestado"
        answer={
          <>
            <p>
              Empieza con una cuenta de ahorros y después un préstamo pequeño
              que sí puedas pagar a tiempo.
            </p>
            <p>Pagar a tiempo es lo que hace que después te presten más.</p>
          </>
        }
        art={<Art name="credito" />}
        trail={[{ label: "Pedir prestado" }]}
      />

      <section className={shared.body}>
        <div className="shell">
          <h2 className="h2">Paso a paso, desde cero.</h2>
          <ol className={shared.steps}>
            {CREDIT_STEPS.map(([t, d], i) => (
              <li key={t}>
                <span className={shared.stepN}>{i + 1}</span>
                <div>
                  <p className={shared.stepT}>{t}</p>
                  <p className={shared.stepD}>{d}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="warn">
            <p>
              <strong>Cuidado:</strong> nadie puede «borrarte» de Datacrédito
              (la lista donde los bancos ven si pagas a tiempo) por una tarifa.
              Quien te cobre por limpiar tu historial te está estafando.
            </p>
          </div>
        </div>
      </section>

      <section className={shared.details}>
        <div className="shell">
          <details className="more-details">
            <summary>¿Qué es el historial de crédito?</summary>
            <div className="more-body">
              <p>
                Es el registro de si pagas lo que debes y cuándo. Cuando pides
                un préstamo, la entidad lo mira para saber si le vas a pagar.
              </p>
              <p>
                No mide cuánta plata tienes. Mide si cumples. Alguien que gana
                poco y paga a tiempo puede tener mejor historial que alguien
                que gana más y paga tarde.
              </p>
            </div>
          </details>

          <details className="more-details">
            <summary>Cuatro creencias que no son ciertas</summary>
            <div className="more-body">
              {CREDIT_MYTHS.map(([myth, truth]) => (
                <p key={myth}>
                  <strong>{myth}</strong> {truth}
                </p>
              ))}
            </div>
          </details>

          <details className="more-details">
            <summary>Tus derechos sobre tu información</summary>
            <div className="more-body">
              <ul className="list-plain">
                {CREDIT_RIGHTS.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
          </details>

          <details className="more-details">
            <summary>¿Dónde reviso mi historial gratis?</summary>
            <div className="more-body">
              {BUREAUS.map((b) => (
                <p key={b.name}>
                  <strong>{b.name}.</strong> {b.note}{" "}
                  <OfficialLink href={b.url} label={b.urlLabel} compact />
                </p>
              ))}
            </div>
          </details>
        </div>
      </section>

      <NextStep
        links={[
          { href: "/herramientas/gota-a-gota", title: "¿Cuánto cuesta de verdad un gota a gota?" },
          { href: "/programas", title: "¿Hay préstamos del gobierno para mí?" },
        ]}
      />
    </>
  );
}
