import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { CTA } from "@/components/ui/CTA";
import { Reveal } from "@/components/ui/Reveal";
import { CheckList } from "@/components/ui/CheckList";
import { Outcomes } from "@/components/ui/Outcomes";
import { getCategory } from "@/content/categories";
import {
  ACCOUNT_TYPES,
  BASIC_PHONE_STEPS,
  NEEDED,
  NOT_NEEDED,
} from "@/content/empezando";
import shared from "../subpage.module.css";
import styles from "./empezando.module.css";

export const metadata: Metadata = {
  title: "Abrir tu primera cuenta",
  description:
    "Qué necesitas de verdad para abrir una cuenta de ahorros en Colombia: solo la cédula. Sin fiador, sin contrato de trabajo y sin saldo mínimo.",
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Paso 1"
        title="Abrir tu primera cuenta"
        intro="La mayoría de la gente cree que le van a pedir un fiador, un contrato de trabajo o una plata que no tiene. Para una cuenta básica, nada de eso es cierto."
        tone="blue"
        trail={[{ label: "Abrir una cuenta" }]}
      >
        <Outcomes items={getCategory("empezando")!.outcomes} />
      </PageHero>

      {/* 1 — the myth, first, because it is the actual barrier */}
      <section className={shared.body}>
        <div className="shell">
          <Reveal>
            <h2 className="h2">Lo primero: qué te van a pedir.</h2>
            <div className="prose">
              <p>
                Una cuenta de ahorros no es un préstamo. El banco no te está
                prestando nada, así que no tiene por qué revisar si tienes
                ingresos fijos ni quién responde por ti.
              </p>
            </div>
            <CheckList yes={NEEDED} no={NOT_NEEDED} />
          </Reveal>
        </div>
      </section>

      {/* 2 — the three kinds of account */}
      <section className={styles.types}>
        <div className="shell">
          <Reveal>
            <p className="eyebrow">Tres opciones</p>
            <h2 className="h2">No todas las cuentas son iguales.</h2>
            <p className="lede">
              Antes de ir a una oficina conviene saber cuál te sirve. Estas son
              las tres más comunes.
            </p>
          </Reveal>

          <div className={styles.grid}>
            {ACCOUNT_TYPES.map((t, i) => (
              <Reveal key={t.name} delay={i * 70}>
                <article className={`${styles.card} ${styles[t.tone]}`}>
                  <h3 className="h3">{t.name}</h3>
                  <p className={styles.what}>{t.what}</p>
                  <p className={styles.row}>
                    <span className={styles.tagGood}>A favor</span>
                    {t.good}
                  </p>
                  <p className={styles.row}>
                    <span className={styles.tagWatch}>Ojo</span>
                    {t.watch}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3 — the detail nobody explains */}
      <section className={shared.body}>
        <div className={`shell ${shared.split}`}>
          <Reveal>
            <p className="eyebrow">Sin teléfono inteligente</p>
            <h2 className="h2">Se puede abrir desde un celular básico.</h2>
            <div className="prose">
              <p>
                Esto casi nadie lo explica: una cuenta de trámite simplificado
                se puede activar desde el menú de la SIM de un celular
                corriente. <strong>No necesitas plan de datos ni wifi</strong>, y
                el trámite no cuesta nada.
              </p>
              <p>
                Si tienes teléfono inteligente, el camino más rápido suele ser
                la aplicación del banco. Pero si no lo tienes, no estás por
                fuera.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <ol className={shared.steps}>
              {BASIC_PHONE_STEPS.map(([t, d], i) => (
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

      {/* 4 — the honest caveat */}
      <section className={styles.limits}>
        <div className="shell">
          <Reveal>
            <h2 className="h2">Lo que sí tienes que saber antes.</h2>
            <div className={styles.warnBox}>
              <p>
                Las cuentas de trámite simplificado tienen un límite de cuánto
                puedes tener guardado y cuánto puedes retirar cada mes. Esos
                topes están amarrados al salario mínimo, así que cambian todos
                los años. Si vas a mover cantidades grandes, pregunta en la
                entidad cuál es el tope vigente antes de abrirla.
              </p>
              <p>
                También: solo puedes tener <strong>una</strong> cuenta de este
                tipo a tu nombre.
              </p>
            </div>

            <div className={shared.pending}>
              <p>
                <strong>Pendiente:</strong> confirmar los topes vigentes de
                saldo y retiro, y agregar una lista de entidades que ofrecen
                este producto en Barranquilla, con direcciones verificadas.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CTA
        title="Ya con cuenta, guardar rinde más."
        body="La calculadora muestra qué pasa con lo que guardas cuando está en una entidad y no debajo del colchón."
        href="/herramientas/ahorro"
        label="Ver la calculadora"
      />
    </>
  );
}
