import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { CTA } from "@/components/ui/CTA";
import { Reveal } from "@/components/ui/Reveal";
import { LazyGotaAGota } from "@/components/tools/LazyTools";
import styles from "../../subpage.module.css";

export const metadata: Metadata = {
  title: "Cuánto cuesta el gota a gota",
  description:
    "Calculadora: cuánto terminas debiendo por el mismo préstamo con un prestamista informal y con crédito formal.",
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Herramienta"
        title="Cuánto cuesta el gota a gota"
        intro="La cuota diaria se ve pequeña. El total del año, no. Aquí están los dos números juntos."
        tone="red"
        trail={[
          { href: "/herramientas", label: "Herramientas" },
          { label: "Cuánto cuesta el gota a gota" },
        ]}
      />

      <section className={styles.body}>
        <div className={`shell ${styles.split}`}>
          <Reveal>
            <LazyGotaAGota />
          </Reveal>

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
          </Reveal>
        </div>
      </section>

      <CTA
        title="Hay crédito formal para quien no tiene historial."
        body="Los programas públicos existen justamente para este caso."
        href="/programas"
        label="Ver los programas"
      />
    </>
  );
}
