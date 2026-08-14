import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { CTA } from "@/components/ui/CTA";
import { Reveal } from "@/components/ui/Reveal";
import { Outcomes } from "@/components/ui/Outcomes";
import { getCategory } from "@/content/categories";
import { BAD_WEEK, BUCKETS, METHOD_STEPS } from "@/content/presupuesto";
import shared from "../subpage.module.css";
import styles from "./presupuesto.module.css";

const CATEGORY = getCategory("presupuesto")!;

export const metadata: Metadata = {
  title: "Organizar tu plata",
  description:
    "Un método de presupuesto para quien cobra distinto cada día: separar apenas entra, calcular con el día malo y no con el bueno.",
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Paso 2"
        title="Organizar tu plata"
        intro="Los consejos normales de presupuesto asumen un sueldo fijo que llega el día 30. Si tu plata entra distinta cada día, ese método no sirve. Este sí."
        tone="green"
        trail={[{ label: "Organizar tu plata" }]}
      >
        <Outcomes items={CATEGORY.outcomes} />
      </PageHero>

      <section className={shared.body}>
        <div className="shell">
          <Reveal>
            <h2 className="h2">La plata se parte en tres, todos los días.</h2>
            <div className="prose">
              <p>
                No al final del mes: <strong>el mismo día que entra</strong>. Con
                ingreso variable no hay un momento después; si no lo separas de
                entrada, se gasta solo.
              </p>
            </div>
          </Reveal>

          <div className={styles.buckets}>
            {BUCKETS.map((b, i) => (
              <Reveal key={b.name} delay={i * 70}>
                <article className={`${styles.bucket} ${styles[b.tone]}`}>
                  <span className={styles.num}>{i + 1}</span>
                  <h3 className="h3">{b.name}</h3>
                  <p className={styles.what}>{b.what}</p>
                  <p className={styles.rule}>{b.rule}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.method}>
        <div className={`shell ${shared.split}`}>
          <Reveal>
            <p className="eyebrow">El método</p>
            <h2 className="h2">Cinco pasos, una sola vez.</h2>
            <div className="prose">
              <p>
                Lo difícil es el primer cálculo. Después es repetir el mismo
                gesto todos los días, y eso sí se vuelve costumbre.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
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
          </Reveal>
        </div>
      </section>

      <section className={shared.body}>
        <div className="shell">
          <Reveal>
            <p className="eyebrow">Cuando la semana viene mala</p>
            <h2 className="h2">Qué se toca primero y qué no.</h2>
            <ul className={styles.badWeek}>
              {BAD_WEEK.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>

            <div className={shared.pending}>
              <p>
                <strong>Pendiente:</strong> agregar una hoja imprimible para
                anotar el reparto diario, pensada para quien no usa aplicaciones.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CTA
        title="Mira qué pasa con lo que separas."
        body="Aunque sea poco al día, en un año la cifra sorprende."
        href="/herramientas/ahorro"
        label="Ver la calculadora"
      />
    </>
  );
}
