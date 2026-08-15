import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { CTA } from "@/components/ui/CTA";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/ui/Icon";
import { Outcomes } from "@/components/ui/Outcomes";
import { LazyGotaAGota } from "@/components/tools/LazyTools";
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
