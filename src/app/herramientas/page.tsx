import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowUpRight } from "@/components/ui/Icon";
import styles from "./herramientas.module.css";

export const metadata: Metadata = {
  title: "Herramientas",
  description:
    "Calculadoras sencillas para ver qué pasa con tu plata: cuánto se acumula ahorrando y cuánto cuesta de verdad un préstamo informal.",
  openGraph: {
    title: "Herramientas",
    description: "Calculadoras sencillas para ver qué pasa con tu plata: cuánto se acumula ahorrando y cuánto cuesta de verdad un préstamo informal.",
    url: "/herramientas",
  },
  alternates: { canonical: "/herramientas" },
};

const TOOLS = [
  {
    href: "/herramientas/ahorro",
    name: "Cuánto junto ahorrando",
    desc: "Mira lo que se acumula guardando una cantidad fija, y qué cambia si cada vez que juntas el mínimo lo pasas a un CDT.",
    tone: "green" as const,
  },
  {
    href: "/herramientas/gota-a-gota",
    name: "Cuánto cuesta el gota a gota",
    desc: "Compara lo que terminas debiendo por el mismo préstamo con un prestamista informal y con crédito formal.",
    tone: "red" as const,
  },
  {
    href: "/mi-plan",
    name: "Mi plan en una hoja",
    desc: "Marca lo que quieres hacer y sale una lista para imprimir o guardar en el teléfono. No se envía a ninguna parte.",
    tone: "blue" as const,
  },
];

export default function Page() {
  return (
    <>
      <PageHero
        title="Calculadoras y tu plan"
        intro="Números en vez de explicaciones. Cambia las cantidades y mira qué pasa."
        trail={[{ label: "Herramientas" }]}
      />

      <section className={styles.body}>
        <div className="shell">
          <div className={styles.grid}>
            {TOOLS.map((t, i) => (
              <Reveal key={t.href} delay={i * 70}>
                <Link href={t.href} className={`${styles.tile} ${styles[t.tone]}`}>
                  <h2 className="h3">{t.name}</h2>
                  <p className={styles.desc}>{t.desc}</p>
                  <span className={styles.action}>
                    Abrir
                    <ArrowUpRight />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
