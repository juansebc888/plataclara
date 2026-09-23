import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { CTA } from "@/components/ui/CTA";
import { Reveal } from "@/components/ui/Reveal";
import { Outcomes } from "@/components/ui/Outcomes";
import { OfficialLink } from "@/components/ui/OfficialLink";
import { GOLDEN_RULES, SCAMS } from "@/content/estafas";
import shared from "../subpage.module.css";
import styles from "./estafas.module.css";

export const metadata: Metadata = {
  title: "No caer en estafas",
  description:
    "Las cinco estafas financieras más comunes en Colombia, cómo se ven por dentro y qué hacer si ya caíste.",
};

const OUTCOMES = [
  "Reconocer las cinco estafas más comunes antes de perder plata",
  "Las cinco señales que aparecen en todas, sin excepción",
  "Qué hacer de inmediato si ya consignaste o diste tus datos",
];

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Antes de mover plata"
        title="No caer en estafas"
        intro="A quien nunca ha podido acceder a un crédito le ofrecen préstamos fáciles todo el tiempo. Casi ninguno es real. Estas son las trampas y cómo se reconocen."
        tone="red"
        trail={[{ label: "No caer en estafas" }]}
      >
        <Outcomes items={OUTCOMES} />
      </PageHero>

      {/* Rules first: they cover scams we haven't listed yet */}
      <section className={shared.body}>
        <div className="shell">
          <Reveal>
            <h2 className="h2">Cinco señales que valen para todas.</h2>
            <div className="prose">
              <p>
                Las estafas cambian de nombre cada año, pero el mecanismo es
                siempre el mismo. Si te aprendes estas cinco, reconoces incluso
                las que todavía no existen.
              </p>
            </div>

            <ol className={styles.rules}>
              {GOLDEN_RULES.map(([t, d]) => (
                <li key={t}>
                  <p className={styles.ruleT}>{t}</p>
                  <p className={styles.ruleD}>{d}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* The five scams */}
      <section className={styles.list}>
        <div className="shell">
          <Reveal>
            <p className="eyebrow">Una por una</p>
            <h2 className="h2">Así se ven por dentro.</h2>
          </Reveal>

          <div className={styles.grid}>
            {SCAMS.map((s, i) => (
              <Reveal key={s.slug} delay={i * 50}>
                <article className={styles.card}>
                  <h3 className="h3">{s.name}</h3>

                  <blockquote className={styles.quote}>{s.looksLike}</blockquote>

                  <div className={styles.tell}>
                    <p className={styles.tellLabel}>Lo que la delata</p>
                    <p className={styles.tellText}>{s.tell}</p>
                  </div>

                  <p className={styles.label}>Cómo funciona</p>
                  <ul className={styles.how}>
                    {s.how.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>

                  <p className={styles.label}>Si ya caíste</p>
                  <p className={styles.text}>{s.ifCaught}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* If it already happened */}
      <section className={shared.body}>
        <div className="shell">
          <Reveal>
            <h2 className="h2">Si ya te pasó, no es culpa tuya.</h2>
            <div className="prose">
              <p>
                Los estafadores son profesionales y trabajan con prisa, susto y
                esperanza. Caer no significa que seas ingenuo: significa que te
                agarraron en el momento en que necesitabas que fuera cierto.
              </p>
              <p>
                Lo único que sí es un error es callarse por vergüenza. Denunciar
                es gratis, no necesitas abogado, y es lo que permite que agarren
                al que lo hizo antes de que se lo haga a otro.
              </p>
            </div>

            <div className={styles.act}>
              <p className={styles.actTitle}>Qué hacer hoy mismo</p>
              <ol>
                <li>Deja de consignar. Nada de lo que pidan va a devolverte lo anterior.</li>
                <li>Guarda todo: chats, números, comprobantes, nombres.</li>
                <li>Si diste claves o códigos, llama a tu banco al número de la tarjeta y bloquea.</li>
                <li>Denuncia ante la Fiscalía.</li>
                <li>Si la entidad involucrada es vigilada, pon también la queja en la Superfinanciera.</li>
              </ol>
              <div className={styles.links}>
                <OfficialLink href="https://www.fiscalia.gov.co" label="fiscalia.gov.co" />
                <OfficialLink href="https://www.superfinanciera.gov.co" label="superfinanciera.gov.co" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CTA
        title="Los préstamos de verdad se ven distinto."
        body="Existen programas públicos y microcrédito formal para quien no tiene historial. No cobran por adelantado."
        href="/programas"
        label="Ver los programas reales"
      />
    </>
  );
}
