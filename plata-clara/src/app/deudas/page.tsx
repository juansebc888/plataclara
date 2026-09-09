import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { CTA } from "@/components/ui/CTA";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/ui/Icon";
import { Outcomes } from "@/components/ui/Outcomes";
import { LazyGotaAGota } from "@/components/tools/LazyTools";
import { Illustration } from "@/components/ui/Illustration";
import { OfficialLink } from "@/components/ui/OfficialLink";
import { RATES, REFERENCE, monthlyToEA } from "@/lib/finance";
import { percent } from "@/lib/format";
import { getCategory } from "@/content/categories";
import styles from "../subpage.module.css";

const CATEGORY = getCategory("deudas")!;

export const metadata: Metadata = {
  title: CATEGORY.name,
  description: CATEGORY.desc,
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Tema"
        title="Salir de deudas"
        intro={CATEGORY.intro}
        tone="red"
        trail={[{ label: "Salir de deudas" }]}
      >
        <Outcomes items={CATEGORY.outcomes} />
      </PageHero>

      <section className={styles.body}>
        <div className={`shell ${styles.split}`}>
          <Reveal>
            <div className="prose">
              <h2 className="h2">Primero, el número real.</h2>
              <p>
                El gota a gota casi nunca se presenta como una tasa. Se presenta
                como una cuota diaria pequeña, y por eso parece manejable. El
                problema aparece cuando ese porcentaje se cobra otra vez sobre
                lo que ya debes, mes tras mes.
              </p>
              <p>
                Mueve el monto y mira cuánto deberías al año por el mismo
                préstamo.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <LazyGotaAGota />
            <Illustration
              name="deuda-crece"
              caption="La línea roja no sube en línea recta. Por eso una cuota que al principio parecía posible se vuelve impagable a los pocos meses."
            />
          </Reveal>
        </div>
      </section>

      {/* The fact that reframes everything: it is not expensive, it is a crime */}
      <section className={styles.usura}>
        <div className="shell">
          <Reveal>
            <p className="eyebrow">Lo que casi nadie sabe</p>
            <h2 className="h2">Existe un techo legal, y el gota a gota lo pasa por encima.</h2>
            <div className="prose">
              <p>
                Se llama <strong>tasa de usura</strong>. Es el máximo que
                cualquiera puede cobrarte legalmente por prestarte plata, y la
                certifica la Superintendencia Financiera. En{" "}
                {REFERENCE.usuraMes} quedó en{" "}
                <strong>{percent(REFERENCE.usuraEA)} efectivo anual</strong>{" "}
                para crédito de consumo.
              </p>
              <p>
                Un gota a gota que cobra {percent(RATES.gotaMonthly, 0)} mensual
                equivale a{" "}
                <strong className={styles.red}>
                  {percent(monthlyToEA(RATES.gotaMonthly), 0)} efectivo anual
                </strong>
                . No es «un poco más caro»: está casi{" "}
                <strong>veintisiete veces</strong> por encima del techo legal.
              </p>
              <p>
                Y eso tiene nombre. Cobrar por encima de la tasa de usura no es
                un abuso: es <strong>el delito de usura</strong>, con pena de
                cárcel en el Código Penal colombiano. La persona que te presta
                así está cometiendo un delito, aunque tú hayas aceptado.
              </p>
            </div>

            <Illustration
              name="usura"
              caption="La barra del centro es el máximo que la ley permite. Todo lo que la pase es ilegal."
            />

            <div className={styles.check}>
              <p className={styles.checkTitle}>Cómo saber si te están cobrando de más</p>
              <ol>
                <li>Pide por escrito la tasa efectiva anual del crédito.</li>
                <li>Compárala con la tasa de usura vigente en la página de la Superfinanciera.</li>
                <li>Si es mayor, es ilegal, y puedes denunciarlo.</li>
              </ol>
              <div className={styles.links}>
                <OfficialLink href="https://www.superfinanciera.gov.co" label="superfinanciera.gov.co" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className={styles.more}>
        <div className="shell">
          <Reveal>
            <p className="eyebrow">Salidas</p>
            <h2 className="h2">Qué se puede hacer si ya estás adentro.</h2>
            <ol className={styles.exits}>
              <li>
                <p className={styles.exitT}>Anota el número real</p>
                <p className={styles.exitD}>
                  Cuánto pediste, cuánto pagas por cuota, cuántas cuotas llevas.
                  Mucha gente descubre aquí que ya devolvió más de lo que pidió.
                </p>
              </li>
              <li>
                <p className={styles.exitT}>Pregunta por refinanciación formal</p>
                <p className={styles.exitD}>
                  Un microcrédito en una entidad vigilada, a una tasa muchísimo
                  menor, para pagar de una vez la deuda informal. No siempre lo
                  aprueban, pero preguntar no cuesta nada.
                </p>
              </li>
              <li>
                <p className={styles.exitT}>No tapes un hueco con otro</p>
                <p className={styles.exitD}>
                  Pedir prestado a un segundo prestamista para pagarle al
                  primero es el camino más rápido a una deuda que ya no se puede
                  pagar. Si ya lo hiciste, con más razón hay que parar ahí.
                </p>
              </li>
              <li>
                <p className={styles.exitT}>Si hay amenazas, denuncia</p>
                <p className={styles.exitD}>
                  Cobrar con intimidación es un delito, aunque tú sí debas la
                  plata. Denunciar es gratis y no necesitas abogado.
                </p>
              </li>
            </ol>

            <div className={styles.insolvencia}>
              <p className={styles.insolvenciaTitle}>Si ya no puedes pagar nada</p>
              <p>
                Existe una figura legal que se llama <strong>insolvencia de
                persona natural no comerciante</strong>. Sirve para negociar de
                forma ordenada con todos tus acreedores a la vez, con un
                conciliador de por medio, y frenar los cobros mientras dura el
                proceso.
              </p>
              <p>
                Se tramita ante centros de conciliación y notarías. No es un
                borrón y cuenta nueva, y tiene requisitos, pero existe y casi
                nadie se la explica a quien más la necesita. Si estás en ese
                punto, vale la pena preguntar por ella en un centro de
                conciliación antes de seguir pidiendo prestado.
              </p>
            </div>

            <div className={styles.exitLink}>
              <Link href="/ayuda" className="btn">
                Ver dónde buscar ayuda
                <ArrowRight />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CTA
        title="Existe crédito formal para quien empieza de cero."
        body="Hay programas públicos pensados para personas y microempresas sin historial bancario."
        href="/programas"
        label="Ver los programas"
      />
    </>
  );
}
