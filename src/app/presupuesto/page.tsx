import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { CTA } from "@/components/ui/CTA";
import { Reveal } from "@/components/ui/Reveal";
import { getCategory } from "@/content/categories";
import styles from "../subpage.module.css";

const CATEGORY = getCategory("presupuesto")!;

export const metadata: Metadata = {
  title: CATEGORY.name,
  description: CATEGORY.desc,
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Tema"
        title={CATEGORY.name}
        intro={CATEGORY.intro}
        tone="green"
        trail={[{ label: CATEGORY.name }]}
      />

      <section className={styles.body}>
        <div className="shell">
          <Reveal>
            <div className="prose">
              <p>
                Esta página todavía no tiene el contenido definitivo. La
                estructura, la navegación y el diseño ya están listos; falta
                escribir y verificar la información con fuentes reales.
              </p>
            </div>
            <div className={styles.pending}>
              <p>
                <strong>Pendiente:</strong> redactar las guías de esta sección y
                confirmar requisitos, entidades y cifras antes de publicar.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CTA
        title="¿Prefieres hablar con alguien?"
        body="Hay lugares donde atiende una persona y no te cobran por escucharte."
        href="/ayuda"
        label="Ver dónde buscar ayuda"
      />
    </>
  );
}
