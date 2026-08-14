import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { CTA } from "@/components/ui/CTA";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/ui/Icon";
import { getCategory } from "@/content/categories";
import styles from "../subpage.module.css";

const CATEGORY = getCategory("programas")!;

export const metadata: Metadata = {
  title: "Programas del gobierno",
  description: CATEGORY.desc,
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Tema"
        title="Programas del gobierno"
        intro={CATEGORY.intro}
        tone="green"
        trail={[{ label: "Programas" }]}
      />

      <section className={styles.body}>
        <div className="shell">
          <Reveal>
            <h2 className="h2">Empieza por este.</h2>
            <div className="prose">
              <p>
                Banca de las Oportunidades es un programa del Gobierno que
                acerca crédito y servicios financieros a familias de menores
                ingresos y a microempresas, trabajando con bancos, cooperativas
                de ahorro y crédito y ONG microfinancieras.
              </p>
            </div>
            <Link href="/programas/banca-de-las-oportunidades" className="btn">
              Ver cómo acceder
              <ArrowRight />
            </Link>

            <div className={styles.pending}>
              <p>
                <strong>Pendiente:</strong> agregar los demás programas
                (nacionales y de la Alcaldía de Barranquilla) una vez
                verificados sus requisitos y su vigencia.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CTA
        title="¿No sabes si aplicas?"
        body="En la sección de ayuda hay lugares donde una persona puede revisar tu caso contigo."
        href="/ayuda"
        label="Buscar ayuda"
      />
    </>
  );
}
