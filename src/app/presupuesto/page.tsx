import type { Metadata } from "next";
import Link from "next/link";
import { Art } from "@/components/ui/Art";
import { PageHero } from "@/components/ui/PageHero";
import { NextStep } from "@/components/ui/NextStep";
import { BAD_WEEK, BUCKETS, METHOD_STEPS } from "@/content/presupuesto";
import shared from "../subpage.module.css";

export const metadata: Metadata = {
  title: "Organizar tu plata",
  description:
    "Un método de presupuesto para quien cobra distinto cada día: separar apenas entra, calcular con el día malo y no con el bueno.",
  openGraph: {
    title: "Organizar tu plata",
    description: "Un método de presupuesto para quien cobra distinto cada día: separar apenas entra, calcular con el día malo y no con el bueno.",
    url: "/presupuesto",
  },
  alternates: { canonical: "/presupuesto" },
};

export default function Page() {
  return (
    <>
      <PageHero
        title="Organizar tu plata"
        answer={
          <>
            <p>
              Todos los días, apenas te pagan, parte la plata en tres: lo de
              hoy, lo fijo y lo guardado.
            </p>
            <p>Haz la cuenta con tu día malo, no con el bueno.</p>
          </>
        }
        art={<Art name="presupuesto" />}
        trail={[{ label: "Organizar tu plata" }]}
      />

      <section className={shared.body}>
        <div className="shell">
          <h2 className="h2">Las tres partes.</h2>
          <ol className="list-plain">
            {BUCKETS.map((b) => (
              <li key={b.name}>
                <strong>{b.name}:</strong> {b.what} {b.rule}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={shared.more}>
        <div className="shell">
          <h2 className="h2">Cómo sacar tu número.</h2>
          <ol className={shared.steps}>
            {METHOD_STEPS.map(([t, d], i) => (
              <li key={t}>
                <span className={shared.stepN}>{i + 1}</span>
                <div>
                  <p className={shared.stepT}>{t}</p>
                  <p className={shared.stepD}>{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={shared.details}>
        <div className="shell">
          <details className="more-details">
            <summary>¿Y si la semana viene mala?</summary>
            <div className="more-body">
              <ul className="list-plain">
                {BAD_WEEK.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </details>
          <details className="more-details">
            <summary>¿Lo puedo tener anotado?</summary>
            <div className="more-body">
              <p>
                Sí. Funciona mejor escrito que en la cabeza. En{" "}
                <Link href="/mi-plan" prefetch={false}>
                  Mi plan
                </Link>{" "}
                marcas lo que quieres hacer y sale una lista con espacio para
                anotar tu número.
              </p>
            </div>
          </details>
        </div>
      </section>

      <NextStep
        links={[
          { href: "/herramientas/ahorro", title: "¿Cuánto junto si guardo un poquito cada día?" },
          { href: "/empezando", title: "¿Puedo abrir una cuenta sin trabajo fijo?" },
        ]}
      />
    </>
  );
}
