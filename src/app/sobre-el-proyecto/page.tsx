import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { CTA } from "@/components/ui/CTA";
import { Reveal } from "@/components/ui/Reveal";
import { OfficialLink } from "@/components/ui/OfficialLink";
import { FACTS_SOURCE } from "@/content/facts";
import { RATES, REFERENCE } from "@/lib/finance";
import { money, percent } from "@/lib/format";
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
              <p>
                Las calculadoras usan una tasa de CDT de{" "}
                <strong>{percent(RATES.cdtEA)} efectivo anual</strong>. Es a
                propósito conservadora: en {REFERENCE.year} los bancos
                tradicionales rondan tasas más altas y los digitales llegan más
                arriba todavía. Preferimos quedarnos cortos antes que prometer
                de más.
              </p>
              <p>
                Para los topes de cuentas usamos el salario mínimo de{" "}
                {REFERENCE.year}, que es {money(REFERENCE.smmlv)}. La cobertura
                de Fogafín es de {money(REFERENCE.fogafin)} por persona y por
                entidad.
              </p>
              <p>
                Todo esto cambia. Si ves un dato desactualizado, lo mejor es ir
                directo a la fuente oficial.
              </p>
            </div>

            <div className={styles.sources}>
              <p className={styles.sourcesTitle}>Fuentes oficiales</p>
              <div className={styles.sourceLinks}>
                <OfficialLink href="https://www.superfinanciera.gov.co" label="superfinanciera.gov.co" />
                <OfficialLink href="https://www.banrep.gov.co" label="banrep.gov.co" />
                <OfficialLink href="https://www.bancadelasoportunidades.gov.co" label="bancadelasoportunidades.gov.co" />
                <OfficialLink href="https://www.fogafin.gov.co" label="fogafin.gov.co" />
              </div>
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
