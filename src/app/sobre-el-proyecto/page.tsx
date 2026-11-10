import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { NextStep } from "@/components/ui/NextStep";
import { Facts } from "@/components/ui/Facts";
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
  openGraph: {
    title: "Sobre el proyecto",
    description: "Qué es Plata Clara, para quién está hecho, y de dónde salen las cifras que aparecen en el sitio.",
    url: "/sobre-el-proyecto",
  },
  alternates: { canonical: "/sobre-el-proyecto" },
};

export default function Page() {
  return (
    <>
      <PageHero
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
                nada y no pedimos datos personales: no hay cuentas ni
                formularios en este sitio. Sí contamos cuántas visitas recibe
                cada página, sin cookies y sin saber quién eres, para poder
                mejorar lo que más se usa. Está explicado en detalle en la
                página de privacidad.
              </p>

              <h2 className="h2">De dónde salen las cifras.</h2>
              <p>{FACTS_SOURCE}</p>
              <p>
                Las calculadoras usan una tasa de CDT de{" "}
                <strong>{percent(RATES.cdtEA)} efectivo anual</strong>. Es a
                propósito conservadora: en {REFERENCE.year} los bancos
                tradicionales rondan entre {percent(RATES.cdtEA)} y 11,25%, y
                los digitales llegan más arriba todavía. Preferimos quedarnos cortos antes que prometer
                de más.
              </p>
              <p>
                La calculadora de ahorro no supone que puedas meter{" "}
                {money(2000)} diarios a un CDT, porque eso no existe. Supone que
                guardas aparte y, cada vez que juntas{" "}
                {money(REFERENCE.cdtMinimoDigital)}, abres un CDT a un año. Los
                intereses solo cuentan cuando el CDT vence, y ya tienen
                descontada la retención en la fuente de{" "}
                {percent(RATES.retencionCDT, 0)}.
              </p>
              <p>
                Cuando mencionamos el salario mínimo usamos el de{" "}
                {REFERENCE.year}, que es {money(REFERENCE.smmlv)}. Los topes
                exactos de cada cuenta los fija cada entidad, así que conviene
                preguntarlos. La cobertura
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

      <Facts />

      <NextStep links={[{ href: "/", title: "Ver todas las preguntas" }]} />
    </>
  );
}
