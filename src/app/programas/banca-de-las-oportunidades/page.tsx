import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { NextStep } from "@/components/ui/NextStep";
import { OfficialLink } from "@/components/ui/OfficialLink";
import { ALLIES, getProgram } from "@/content/programas";
import shared from "../../subpage.module.css";
import styles from "./banca.module.css";

export const metadata: Metadata = {
  title: "Banca de las Oportunidades",
  description:
    "Qué es Banca de las Oportunidades, por qué no presta plata directamente, y cómo llegar a un microcrédito para tu propio negocio.",
  openGraph: {
    title: "Banca de las Oportunidades",
    description: "Qué es Banca de las Oportunidades, por qué no presta plata directamente, y cómo llegar a un microcrédito para tu propio negocio.",
    url: "/programas/banca-de-las-oportunidades",
  },
  alternates: { canonical: "/programas/banca-de-las-oportunidades" },
};

const PROGRAM = getProgram("banca-de-las-oportunidades")!;

const STEPS: [string, string][] = [
  [
    "Ten una cuenta primero",
    "Sin cuenta el proceso ni arranca. Si todavía no tienes, empieza por ahí: solo necesitas la cédula.",
  ],
  [
    "Ten claro para qué es la plata",
    "«Para el negocio» no basta. Mercancía, una nevera, una moto de trabajo: te van a preguntar y la respuesta concreta ayuda.",
  ],
  [
    "Busca una entidad aliada",
    "Un banco, una cooperativa vigilada o una ONG microfinanciera. Pregunta directamente si manejan microcrédito.",
  ],
  [
    "Pregunta tres cosas antes de firmar",
    "Cuánto es la cuota, cuántas cuotas son, y cuánto vas a pagar en total. Si no te dan el total, no firmes.",
  ],
  [
    "Paga a tiempo desde la primera cuota",
    "Ese es el punto: este primer crédito pequeño es lo que construye el historial para el siguiente.",
  ],
];

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Programa del gobierno"
        title="Plata para tu propio negocio"
        answer={
          <>
            <p>
              Banca de las Oportunidades no presta plata. Te ayuda a que un
              banco, cooperativa u ONG te dé un microcrédito (un préstamo
              pequeño para tu negocio).
            </p>
            <p>Lo pides en esas entidades, no en una oficina del programa.</p>
          </>
        }
        trail={[
          { href: "/programas", label: "Ayuda del gobierno" },
          { label: "Banca de las Oportunidades" },
        ]}
      >
        <div className={styles.linkRow}>
          <OfficialLink href={PROGRAM.url} label={PROGRAM.urlLabel} />
        </div>
      </PageHero>

      <section className={shared.body}>
        <div className="shell">
          <h2 className="h2">Cinco pasos, en orden.</h2>
          <ol className={`${shared.steps} ${shared.gapTopSm}`}>
            {STEPS.map(([t, d], i) => (
              <li key={t}>
                <span className={shared.stepN}>{i + 1}</span>
                <div>
                  <p className={shared.stepT}>{t}</p>
                  <p className={shared.stepD}>{d}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className={shared.lead}>
            <strong>Una frase que sirve al llegar:</strong> «Buenos días, quiero
            preguntar si ustedes manejan microcrédito para negocio. No tengo
            historial crediticio.»
          </p>
          <div className="warn">
            <p>
              <strong>Nunca consignes plata para que te aprueben un
              préstamo.</strong> Eso es estafa.
            </p>
          </div>
        </div>
      </section>

      <section className={shared.details}>
        <div className="shell">
          <details className="more-details">
            <summary>¿Qué es un microcrédito?</summary>
            <div className="more-body">
              <p>
                Un préstamo pequeño para quien trabaja por su cuenta o tiene un
                negocio chico: una tienda, un puesto, una moto de trabajo, un
                carrito de comida, una peluquería.
              </p>
              <p>
                Es para quien <strong>no tiene contrato ni historial</strong>.
                En vez de una carta laboral, miran tu negocio: cuánto vendes,
                hace cuánto trabajas en eso, quién te conoce en el barrio.
              </p>
            </div>
          </details>

          <details className="more-details">
            <summary>¿En qué se diferencia de un gota a gota?</summary>
            <div className="more-body">
              <p><strong>Microcrédito formal:</strong></p>
              <ul className="list-plain">
                <li>Te dicen la tasa antes de firmar.</li>
                <li>Queda un contrato por escrito.</li>
                <li>La entidad está vigilada por el gobierno.</li>
                <li>Pagar a tiempo te ayuda a que te presten después.</li>
                <li>Si te tratan mal, puedes quejarte gratis.</li>
              </ul>
              <p className={shared.gapTop}><strong>Gota a gota:</strong></p>
              <ul className="list-plain">
                <li>Nunca te dicen la tasa real.</li>
                <li>No hay contrato ni respaldo.</li>
                <li>Nadie los vigila.</li>
                <li>Pagar no te sirve de nada después.</li>
                <li>Si te atrasas, te presionan para cobrar.</li>
              </ul>
            </div>
          </details>

          <details className="more-details">
            <summary>¿A dónde voy a preguntar?</summary>
            <div className="more-body">
              {ALLIES.map((a) => (
                <p key={a.name}>
                  <strong>{a.name}.</strong> {a.desc}{" "}
                  {a.url && a.urlLabel ? (
                    <OfficialLink href={a.url} label={a.urlLabel} compact />
                  ) : null}
                </p>
              ))}
            </div>
          </details>

          <details className="more-details">
            <summary>¿Cómo sé si la entidad es seria?</summary>
            <div className="more-body">
              <p>
                Los bancos los vigila la Superfinanciera. Las cooperativas, casi
                siempre la Supersolidaria. Son oficinas del gobierno y se
                consulta gratis en su página.
              </p>
              <p>
                Las ONG que solo prestan no aparecen en ninguna de las dos.
                Pregunta hace cuánto existen y nunca consignes plata para que
                te aprueben.
              </p>
              <div className={styles.linkRow}>
                <OfficialLink href="https://www.superfinanciera.gov.co" label="superfinanciera.gov.co" />
                <OfficialLink href="https://www.supersolidaria.gov.co" label="supersolidaria.gov.co" />
              </div>
            </div>
          </details>
        </div>
      </section>

      <NextStep
        links={[
          { href: "/herramientas/gota-a-gota", title: "¿Cuánto más caro es un gota a gota?" },
          { href: "/empezando", title: "¿Cómo abro una cuenta sin trabajo fijo?" },
        ]}
      />
    </>
  );
}
