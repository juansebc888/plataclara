import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { CTA } from "@/components/ui/CTA";
import { Reveal } from "@/components/ui/Reveal";
import { FACTS_SOURCE } from "@/content/facts";
import styles from "../subpage.module.css";

export const metadata: Metadata = {
  title: "Sobre el proyecto",
  description:
    "Qué es Plata Clara, para quién está hecho, y de dónde salen las cifras que aparecen en el sitio.",
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Sobre el proyecto"
        title="Quién hace esto y por qué"
        intro="Plata Clara es un proyecto independiente, sin publicidad y sin venta de productos financieros."
        trail={[{ label: "Sobre el proyecto" }]}
      />

      <section className={styles.body}>
        <div className="shell">
          <Reveal>
            <div className="prose">
              <h2 className="h2">Para quién está escrito.</h2>
              <p>
                Para personas que trabajan y cobran en efectivo, sin contrato
                fijo, y que nunca han tenido una cuenta bancaria ni un historial
                de crédito. Casi toda la información financiera disponible
                asume lo contrario, y por eso no sirve.
              </p>

              <h2 className="h2">Qué no hacemos.</h2>
              <p>
                No vendemos productos, no recomendamos entidades a cambio de
                nada y no pedimos datos personales. Si en algún momento eso
                cambia, va a estar dicho en esta página.
              </p>

              <h2 className="h2">De dónde salen las cifras.</h2>
              <p>{FACTS_SOURCE}</p>
            </div>

            <div className={styles.pending}>
              <p>
                <strong>Pendiente:</strong> escribir la sección de autoría y
                agregar una forma de contacto una vez definida.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CTA
        title="Empieza por lo que más te sirva."
        body="Seis temas, cada uno con un primer paso concreto."
        href="/"
        label="Ver los temas"
      />
    </>
  );
}
