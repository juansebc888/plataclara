import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { NextStep } from "@/components/ui/NextStep";
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
        title="Qué significa cada palabra"
        answer={<p>Las palabras que usan en el banco, explicadas fácil. Toca un grupo para ir directo.</p>}
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

      <NextStep
        links={[
          { href: "/empezando", title: "¿Puedo abrir una cuenta sin trabajo fijo?" },
          { href: "/ayuda", title: "Un banco me cobró algo raro. ¿A quién le reclamo?" },
        ]}
      />
    </>
  );
}
