import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { CTA } from "@/components/ui/CTA";
import { Reveal } from "@/components/ui/Reveal";
import { LazyAhorro } from "@/components/tools/LazyTools";
import styles from "../../subpage.module.css";

export const metadata: Metadata = {
  title: "Cuánto junto ahorrando",
  description:
    "Calculadora: cuánto se acumula guardando una cantidad fija cada día, y qué cambia si esa plata está en un CDT.",
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Herramienta"
        title="Cuánto junto ahorrando"
        intro="No hace falta ganar más para empezar a juntar. Cambia cuánto guardas al día y por cuánto tiempo, y mira qué pasa."
        tone="green"
        trail={[
          { href: "/herramientas", label: "Herramientas" },
          { label: "Cuánto junto ahorrando" },
        ]}
      />

      <section className={styles.body}>
        <div className={`shell ${styles.split}`}>
          <Reveal>
            <LazyAhorro />
          </Reveal>

          <Reveal delay={100}>
            <div className="prose">
              <h2 className="h2">Por qué el primer año importa menos.</h2>
              <p>
                En doce meses la diferencia entre guardar en la casa y guardar
                en un CDT es pequeña. Eso sorprende a mucha gente, y es
                justamente lo útil de verlo: al principio lo que construye el
                ahorro es la constancia, no la tasa.
              </p>
              <p>
                El interés se vuelve importante con el tiempo. Cambia a cinco
                años y vas a ver que la brecha se abre sin que hayas guardado un
                peso más por día.
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
