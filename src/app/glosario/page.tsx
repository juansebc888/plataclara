import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { CTA } from "@/components/ui/CTA";
import { Reveal } from "@/components/ui/Reveal";
import { GROUPS, TERMS } from "@/content/glosario";
import shared from "../subpage.module.css";
import styles from "./glosario.module.css";

export const metadata: Metadata = {
  title: "Qué significa cada palabra",
  description:
    "Glosario en español claro de las palabras que usan los bancos: cuota de manejo, tasa efectiva anual, mora, capital, usura y más.",
  openGraph: {
    title: "Qué significa cada palabra",
    description: "Glosario en español claro de las palabras que usan los bancos: cuota de manejo, tasa efectiva anual, mora, capital, usura y más.",
    url: "/glosario",
  },
  alternates: { canonical: "/glosario" },
};

/** "Tasa efectiva anual (E.A.)" -> "tasa-efectiva-anual-ea": stable deep links. */
const slug = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Diccionario"
        title="Qué significa cada palabra"
        intro="Buena parte del problema no es la plata: es el idioma. Estas son las palabras que aparecen en cualquier oficina bancaria, explicadas sin usar otras palabras raras."
        tone="blue"
        trail={[{ label: "Qué significa cada palabra" }]}
      >
        <nav aria-label="Grupos de palabras" className={styles.chips}>
          {GROUPS.map((g) => (
            <a key={g.key} href={`#${g.key}`} className={styles.chip}>
              {g.label}
            </a>
          ))}
        </nav>
      </PageHero>

      <section className={shared.body}>
        <div className="shell">
          {GROUPS.map((g) => {
            const items = TERMS.filter((t) => t.group === g.key);
            return (
              <div key={g.key} className={styles.group}>
                <Reveal>
                  <h2 className="h2" id={g.key}>
                    {g.label}
                  </h2>
                </Reveal>
                  <dl className={styles.list}>
                    {items.map((t) => (
                      <div key={t.term} id={slug(t.term)} className={styles.item}>
                        <dt className={styles.term}>{t.term}</dt>
                        <dd className={styles.def}>
                          <span className={styles.short}>{t.short}</span>
                          {t.long ? (
                            <span className={styles.long}>{t.long}</span>
                          ) : null}
                        </dd>
                      </div>
                    ))}
                  </dl>
              </div>
            );
          })}
        </div>
      </section>

      <CTA
        title="Con las palabras claras, la ventanilla asusta menos."
        body="Ya puedes preguntar sin miedo a que te vean cara de no entender."
        href="/empezando"
        label="Abrir una cuenta"
      />
    </>
  );
}
