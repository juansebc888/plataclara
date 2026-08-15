import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { CTA } from "@/components/ui/CTA";
import { Reveal } from "@/components/ui/Reveal";
import { Outcomes } from "@/components/ui/Outcomes";
import { getCategory } from "@/content/categories";
import { OfficialLink } from "@/components/ui/OfficialLink";
import { BUREAUS, CREDIT_MYTHS, CREDIT_RIGHTS, CREDIT_STEPS } from "@/content/credito";
import shared from "../subpage.module.css";
import styles from "./credito.module.css";

const CATEGORY = getCategory("credito")!;

export const metadata: Metadata = {
  title: "Pedir prestado",
  description:
    "Qué es el historial crediticio, cómo empezar uno desde cero y qué derechos tienes sobre tu propia información.",
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Paso 3"
        title="Pedir prestado"
        intro="Sin historial los bancos no prestan, y sin que presten no se construye historial. Ese círculo tiene una salida, y empieza más abajo de lo que la gente cree."
        tone="blue"
        trail={[{ label: "Pedir prestado" }]}
      >
        <Outcomes items={CATEGORY.outcomes} />
      </PageHero>

      <section className={shared.body}>
        <div className="shell">
          <Reveal>
            <h2 className="h2">Qué es el historial, en cristiano.</h2>
            <div className="prose">
              <p>
                Es el registro de si has pagado lo que debes y cuándo lo
                pagaste. Cuando pides un crédito, la entidad lo consulta para
                calcular qué tan probable es que le pagues.
              </p>
              <p>
                No mide cuánta plata tienes. Mide si cumples. Por eso alguien
                con ingresos bajos y pagos puntuales puede tener mejor historial
                que alguien que gana más y paga tarde.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className={styles.myths}>
        <div className="shell">
          <Reveal>
            <p className="eyebrow">Lo que se dice y lo que es</p>
            <h2 className="h2">Cuatro creencias que cuestan caro.</h2>
          </Reveal>

          <div className={styles.mythGrid}>
            {CREDIT_MYTHS.map(([myth, truth], i) => (
              <Reveal key={myth} delay={i * 60}>
                <article className={styles.myth}>
                  <p className={styles.mythQ}>{myth}</p>
                  <p className={styles.mythA}>{truth}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={shared.body}>
        <div className={`shell ${shared.split}`}>
          <Reveal>
            <p className="eyebrow">Desde cero</p>
            <h2 className="h2">Cómo se construye, paso a paso.</h2>
            <div className="prose">
              <p>
                No hay atajo y desconfía de quien te ofrezca uno. Lo que hay es
                un camino lento que sí funciona, y que empieza con algo que ya
                puedes hacer hoy.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
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
          </Reveal>
        </div>
      </section>

      <section className={styles.rights}>
        <div className="shell">
          <Reveal>
            <p className="eyebrow eyebrow-light">Tus derechos</p>
            <h2 className="h2 h2-light">
              Tu información es tuya, y puedes verla.
            </h2>
            <ul className={styles.rightsList}>
              {CREDIT_RIGHTS.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className={shared.body}>
        <div className="shell">
          <Reveal>
            <p className="eyebrow">Dónde consultarlo</p>
            <h2 className="h2">Ve directo a la fuente.</h2>
            <div className="prose">
              <p>
                Estas son las centrales de riesgo donde vive tu información. Se
                consulta en su propia página, sin intermediarios.
              </p>
            </div>

            <div className={styles.bureaus}>
              {BUREAUS.map((b) => (
                <div key={b.name} className={styles.bureau}>
                  <p className={styles.bureauName}>{b.name}</p>
                  <p className={styles.bureauNote}>{b.note}</p>
                  <OfficialLink href={b.url} label={b.urlLabel} compact />
                </div>
              ))}
            </div>

            <div className={styles.scam}>
              <p>
                <strong>Cuidado con esto:</strong> nadie puede «borrarte» de las
                centrales de riesgo por una tarifa. Los reportes salen solos
                cuando se cumple el plazo de ley. Quien te ofrezca limpiarte el
                historial a cambio de plata te está estafando.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CTA
        title="Antes de pedir, mira cuánto cuesta."
        body="La diferencia entre un crédito formal y uno informal es más grande de lo que parece."
        href="/deudas"
        label="Ver la comparación"
      />
    </>
  );
}
