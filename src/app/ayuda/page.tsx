import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { CTA } from "@/components/ui/CTA";
import { Reveal } from "@/components/ui/Reveal";
import { Outcomes } from "@/components/ui/Outcomes";
import { getCategory } from "@/content/categories";
import { CHANNELS, RIGHTS_NOTES } from "@/content/ayuda";
import shared from "../subpage.module.css";
import styles from "./ayuda.module.css";

const CATEGORY = getCategory("ayuda")!;

export const metadata: Metadata = {
  title: "Hablar con alguien",
  description:
    "Dónde acudir cuando una entidad financiera no responde, te cobró de más o un prestamista te está amenazando. Todos estos canales son gratuitos.",
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Cuando la página no alcanza"
        title="Hablar con alguien"
        intro="Hay problemas que no se resuelven leyendo. Estos son los lugares donde atiende una persona, y ninguno te puede cobrar por atenderte."
        tone="blue"
        trail={[{ label: "Hablar con alguien" }]}
      >
        <Outcomes items={CATEGORY.outcomes} />
      </PageHero>

      <section className={shared.body}>
        <div className="shell">
          <Reveal>
            <h2 className="h2">Cada problema tiene su puerta.</h2>
            <p className="lede">
              Ir al lugar equivocado hace perder semanas. Esto es qué resuelve
              cada quién.
            </p>
          </Reveal>

          <div className={styles.grid}>
            {CHANNELS.map((c, i) => (
              <Reveal key={c.name} delay={i * 70}>
                <article className={`${styles.card} ${styles[c.tone]}`}>
                  <h3 className="h3">{c.name}</h3>

                  <p className={styles.label}>Para qué sirve</p>
                  <p className={styles.text}>{c.forWhat}</p>

                  <p className={styles.label}>Cómo llegar</p>
                  <p className={styles.text}>{c.how}</p>

                  <p className={styles.cost}>{c.cost}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.notes}>
        <div className="shell">
          <Reveal>
            <p className="eyebrow">Bueno saberlo</p>
            <h2 className="h2">Tres cosas que casi nadie te dice.</h2>
            <ul className={styles.noteList}>
              {RIGHTS_NOTES.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className={shared.body}>
        <div className="shell">
          <Reveal>
            <h2 className="h2">Si te están amenazando, eso no es una deuda.</h2>
            <div className="prose">
              <p>
                Cobrar con amenazas, intimidación o presión sobre tu familia es
                un delito, aunque tú sí debas la plata. Deber no le da a nadie
                derecho a asustarte.
              </p>
              <p>
                Denunciar no cuesta y no necesitas abogado para hacerlo.
              </p>
            </div>

            <div className={shared.pending}>
              <p>
                <strong>Pendiente:</strong> agregar los puntos de atención de
                Barranquilla con dirección, horario y teléfono verificados, y
                la línea nacional vigente para denuncias. No poner ningún número
                sin confirmarlo primero en la fuente oficial.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CTA
        title="¿Todavía no tienes cuenta?"
        body="Casi todo lo demás empieza ahí, y pide menos requisitos de los que crees."
        href="/empezando"
        label="Ver cómo abrir una"
      />
    </>
  );
}
