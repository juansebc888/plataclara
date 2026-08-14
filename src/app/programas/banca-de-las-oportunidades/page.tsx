import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { CTA } from "@/components/ui/CTA";
import { Reveal } from "@/components/ui/Reveal";
import styles from "../../subpage.module.css";

export const metadata: Metadata = {
  title: "Banca de las Oportunidades",
  description:
    "Qué es Banca de las Oportunidades, a quién está dirigido y qué hacer primero para acceder.",
};

const STEPS: [string, string][] = [
  ["Mira si aplicas", "Los requisitos en una lista, sin enredos."],
  ["Reúne los papeles", "Qué documento pide cada entidad."],
  ["Dónde ir", "Entidades aliadas cerca de ti."],
];

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Programa del gobierno"
        title="Banca de las Oportunidades"
        intro="Un programa del Gobierno que acerca crédito y servicios financieros a familias de menores ingresos y a microempresas."
        tone="green"
        trail={[
          { href: "/programas", label: "Programas" },
          { label: "Banca de las Oportunidades" },
        ]}
      />

      <section className={styles.body}>
        <div className={`shell ${styles.split}`}>
          <Reveal>
            <div className="prose">
              <h2 className="h2">Qué es, en palabras sencillas.</h2>
              <p>
                No es un banco y no presta plata directamente. Trabaja con
                bancos, cooperativas de ahorro y crédito y ONG microfinancieras
                para que ofrezcan productos a personas que el sistema financiero
                normalmente deja por fuera.
              </p>
              <p>
                También tiene programas de formación sobre ahorro, presupuesto,
                manejo responsable de deuda y seguros, que han llegado a
                municipios donde antes no había ninguna presencia de este tipo.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <ol className={styles.steps}>
              {STEPS.map(([t, d], i) => (
                <li key={t}>
                  <span className={styles.stepN}>{i + 1}</span>
                  <div>
                    <p className={styles.stepT}>{t}</p>
                    <p className={styles.stepD}>{d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        <div className="shell">
          <div className={styles.pending}>
            <p>
              <strong>Pendiente:</strong> los tres pasos de arriba son
              provisionales. Hay que confirmar en la fuente oficial los
              requisitos exactos, los documentos y las entidades aliadas que
              atienden en Barranquilla antes de publicar esta página.
            </p>
          </div>
        </div>
      </section>

      <CTA
        title="Antes de pedir prestado, mira el costo."
        body="La calculadora de deudas muestra la diferencia entre un crédito formal y el gota a gota."
        href="/deudas"
        label="Ver la calculadora"
      />
    </>
  );
}
