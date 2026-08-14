import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { CTA } from "@/components/ui/CTA";
import { Reveal } from "@/components/ui/Reveal";
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
        title="Deudas"
        intro={CATEGORY.intro}
        tone="red"
        trail={[{ label: "Deudas" }]}
      />

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
            <div className={styles.pending}>
              <p>
                <strong>Pendiente:</strong> documentar las salidas reales —
                refinanciación con entidad formal, programas de la alcaldía,
                líneas de denuncia y acompañamiento — con nombres, requisitos y
                direcciones verificadas.
              </p>
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
