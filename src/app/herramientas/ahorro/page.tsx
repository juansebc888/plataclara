import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { CTA } from "@/components/ui/CTA";
import { Reveal } from "@/components/ui/Reveal";
import { LazyAhorro } from "@/components/tools/LazyTools";
import { REFERENCE } from "@/lib/finance";
import { money } from "@/lib/format";
import styles from "../../subpage.module.css";

export const metadata: Metadata = {
  title: "Cuánto junto ahorrando",
  description:
    "Calculadora: cuánto se acumula guardando una cantidad fija, y qué cambia si cada vez que juntas el mínimo lo pasas a un CDT.",
  openGraph: {
    title: "Cuánto junto ahorrando",
    description: "Calculadora: cuánto se acumula guardando una cantidad fija, y qué cambia si cada vez que juntas el mínimo lo pasas a un CDT.",
    url: "/herramientas/ahorro",
  },
  alternates: { canonical: "/herramientas/ahorro" },
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Herramienta"
        title="Cuánto junto ahorrando"
        intro="No hace falta ganar más para empezar a juntar. Cambia cuánto guardas y por cuánto tiempo, y mira qué pasa."
        tone="green"
        trail={[
          { href: "/herramientas", label: "Herramientas" },
          { label: "Cuánto junto ahorrando" },
        ]}
      />

      <section className={styles.body}>
        <div className={`shell ${styles.split}`}>
          <LazyAhorro />

          <Reveal delay={100}>
            <div className="prose">
              <h2 className="h2">Por qué el primer año importa menos.</h2>
              <p>
                Un CDT no recibe plata de a poquitos: se abre con una suma
                completa, y en las entidades digitales el mínimo suele ser{" "}
                <strong>{money(REFERENCE.cdtMinimoDigital)}</strong>. Por eso la
                calculadora va juntando lo que guardas y, cada vez que alcanza,
                lo pasa a un CDT a un año.
              </p>
              <p>
                Los intereses se pagan cuando el CDT vence, no antes. En el
                primer año todavía no ha vencido ninguno, así que la diferencia
                es cero. Eso sorprende a mucha gente, y es justamente lo útil de
                verlo: al principio lo que construye el ahorro es la constancia,
                no la tasa.
              </p>
              <p>
                El interés se vuelve importante con el tiempo. Cambia a cinco o
                diez años y vas a ver que la brecha se abre sin que hayas
                guardado un peso más.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CTA
        title="Para guardar en un CDT hace falta una cuenta."
        body="Abrir una cuenta básica pide menos requisitos de los que la mayoría cree."
        href="/empezando"
        label="Ver cómo abrir una"
      />
    </>
  );
}
