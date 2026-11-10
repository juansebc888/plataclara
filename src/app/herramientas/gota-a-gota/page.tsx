import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { NextStep } from "@/components/ui/NextStep";
import { Illustration } from "@/components/ui/Illustration";
import { Reveal } from "@/components/ui/Reveal";
import { LazyGotaAGota } from "@/components/tools/LazyTools";
import styles from "../../subpage.module.css";

export const metadata: Metadata = {
  title: "Cuánto cuesta el gota a gota",
  description:
    "Calculadora: cuánto terminas debiendo por el mismo préstamo con un prestamista informal y con crédito formal.",
  openGraph: {
    title: "Cuánto cuesta el gota a gota",
    description: "Calculadora: cuánto terminas debiendo por el mismo préstamo con un prestamista informal y con crédito formal.",
    url: "/herramientas/gota-a-gota",
  },
  alternates: { canonical: "/herramientas/gota-a-gota" },
};

export default function Page() {
  return (
    <>
      <PageHero
        title="Cuánto cuesta el gota a gota"
        answer={<p>El 20% al mes suena a poco. Pero en un año debes casi 9 veces lo que pediste. Toca un monto y mira.</p>}
        tone="red"
        trail={[
          { href: "/herramientas", label: "Herramientas" },
          { label: "Cuánto cuesta el gota a gota" },
        ]}
      />

      <section className={styles.body}>
        <div className={`shell ${styles.split}`}>
          <LazyGotaAGota />

          <Reveal delay={100}>
            <div className="prose">
              <h2 className="h2">Por qué crece tan rápido.</h2>
              <p>
                Cuando el interés se cobra otra vez sobre lo que ya debes, la
                deuda no sube en línea recta: sube cada vez más rápido. Por eso
                una cuota que al principio parecía posible se vuelve imposible a
                los pocos meses.
              </p>
              <p>
                No es un problema de disciplina de quien pide el préstamo. Es
                cómo está construido el préstamo.
              </p>
            </div>
            <Illustration
              name="deuda-crece"
              caption="Al 20% mensual, en un año debes casi 9 veces lo que pediste."
            />
          </Reveal>
        </div>
      </section>

      <NextStep
        links={[
          { href: "/deudas", title: "Le debo a un gota a gota. ¿Qué hago?" },
          { href: "/programas", title: "¿Hay préstamos del gobierno para mí?" },
        ]}
      />
    </>
  );
}
