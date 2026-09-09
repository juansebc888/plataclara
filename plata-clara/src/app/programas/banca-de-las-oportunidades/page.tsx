import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { CTA } from "@/components/ui/CTA";
import { Reveal } from "@/components/ui/Reveal";
import { Outcomes } from "@/components/ui/Outcomes";
import { OfficialLink } from "@/components/ui/OfficialLink";
import { ALLIES, getProgram } from "@/content/programas";
import shared from "../../subpage.module.css";
import styles from "./banca.module.css";

export const metadata: Metadata = {
  title: "Banca de las Oportunidades",
  description:
    "Qué es Banca de las Oportunidades, por qué no presta plata directamente, y cómo llegar a un microcrédito para tu propio negocio.",
};

const PROGRAM = getProgram("banca-de-las-oportunidades")!;

const OUTCOMES = [
  "Por qué Banca de las Oportunidades no te presta plata directamente",
  "Qué es un microcrédito y en qué se diferencia de un gota a gota",
  "A qué entidad ir y qué preguntar cuando llegues",
];

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
        intro="Banca de las Oportunidades es el programa del Gobierno que existe para que la gente sin cuenta ni historial pueda acceder a crédito. Sobre todo, crédito para trabajar por su cuenta."
        tone="green"
        trail={[
          { href: "/programas", label: "Ayuda del gobierno" },
          { label: "Banca de las Oportunidades" },
        ]}
      >
        <Outcomes items={OUTCOMES} />
        <div className={styles.linkRow}>
          <OfficialLink href={PROGRAM.url} label={PROGRAM.urlLabel} />
        </div>
      </PageHero>

      {/* The single biggest misconception */}
      <section className={shared.body}>
        <div className="shell">
          <Reveal>
            <div className={styles.bust}>
              <p className={styles.bustTag}>Lo que casi todo el mundo entiende mal</p>
              <p className={styles.bustText}>
                Banca de las Oportunidades <strong>no es un banco y no te
                presta plata</strong>. No existe una oficina donde hagas fila
                para pedirle a ellos.
              </p>
              <p className={styles.bustText}>
                Es una política del Gobierno que trabaja con bancos,
                cooperativas de ahorro y crédito y ONG microfinancieras para
                que <strong>ellos</strong> ofrezcan productos a personas de
                menores ingresos y a microempresas que normalmente quedan por
                fuera. La plata la pides en esas entidades.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What a microcrédito actually is */}
      <section className={styles.micro}>
        <div className="shell">
          <Reveal>
            <p className="eyebrow">El producto que te interesa</p>
            <h2 className="h2">Qué es un microcrédito.</h2>
            <div className="prose">
              <p>
                Es un préstamo pequeño para una persona que trabaja por su
                cuenta o tiene un negocio chico: una tienda, un puesto, una
                moto de trabajo, un carrito de comida, una peluquería.
              </p>
              <p>
                Está pensado justamente para quien <strong>no tiene contrato de
                trabajo ni historial bancario</strong>. En vez de una carta
                laboral, miran tu negocio: cuánto vendes, hace cuánto trabajas
                en eso, quién te conoce en el barrio.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className={styles.compare}>
              <div className={`${styles.col} ${styles.good}`}>
                <p className={styles.colHead}>Microcrédito formal</p>
                <ul>
                  <li>Te dicen la tasa antes de firmar</li>
                  <li>Queda un contrato por escrito</li>
                  <li>La entidad está vigilada por la Superfinanciera</li>
                  <li>Pagar a tiempo te construye historial</li>
                  <li>Si te tratan mal, hay a quién quejarse gratis</li>
                </ul>
              </div>
              <div className={`${styles.col} ${styles.bad}`}>
                <p className={styles.colHead}>Gota a gota</p>
                <ul>
                  <li>Nunca te dicen la tasa real</li>
                  <li>No hay contrato ni respaldo</li>
                  <li>Nadie los vigila</li>
                  <li>Pagar no te sirve de nada después</li>
                  <li>Si te atrasas, la presión es el método de cobro</li>
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* How to actually do it */}
      <section className={shared.body}>
        <div className={`shell ${shared.split}`}>
          <Reveal>
            <p className="eyebrow">El camino</p>
            <h2 className="h2">Cinco pasos, en orden.</h2>
            <div className="prose">
              <p>
                Nadie te va a llamar a ofrecerte esto. Hay que ir a preguntar, y
                llegar sabiendo qué preguntar cambia mucho la conversación.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <ol className={shared.steps}>
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
          </Reveal>
        </div>
      </section>

      {/* Where */}
      <section className={styles.where}>
        <div className="shell">
          <Reveal>
            <p className="eyebrow">Dónde preguntar</p>
            <h2 className="h2">Cuatro tipos de puerta.</h2>
            <div className={styles.allied}>
              {ALLIES.map((a) => (
                <div key={a.name} className={styles.ally}>
                  <p className={styles.allyName}>{a.name}</p>
                  <p className={styles.allyDesc}>{a.desc}</p>
                  {a.url && a.urlLabel ? (
                    <OfficialLink href={a.url} label={a.urlLabel} compact />
                  ) : null}
                </div>
              ))}
            </div>

            <div className={styles.tip}>
              <p>
                <strong>Una frase que sirve al llegar:</strong> «Buenos días,
                quiero preguntar si ustedes manejan microcrédito para negocio.
                No tengo historial crediticio.» Decirlo de entrada te ahorra
                media hora y te dice rápido si ese es el lugar.
              </p>
            </div>

            <div className={styles.tip}>
              <p>
                <strong>Antes de entregarle plata a una entidad,</strong>{" "}
                confirma que esté vigilada por la Superintendencia Financiera.
                Se consulta gratis en su página y toma un minuto.
              </p>
              <div className={styles.linkRow}>
                <OfficialLink
                  href="https://www.superfinanciera.gov.co"
                  label="superfinanciera.gov.co"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CTA
        title="Mira la diferencia en pesos."
        body="Un microcrédito y un gota a gota por el mismo monto no se parecen en nada al cabo de un año."
        href="/herramientas/gota-a-gota"
        label="Ver la calculadora"
      />
    </>
  );
}
