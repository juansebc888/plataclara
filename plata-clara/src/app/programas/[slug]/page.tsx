import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { CTA } from "@/components/ui/CTA";
import { Reveal } from "@/components/ui/Reveal";
import { Outcomes } from "@/components/ui/Outcomes";
import { OfficialLink } from "@/components/ui/OfficialLink";
import { KIND_LABEL, PROGRAMS, getProgram } from "@/content/programas";
import shared from "../../subpage.module.css";
import styles from "./detalle.module.css";

/** Prerender every program page at build time. */
export function generateStaticParams() {
  return PROGRAMS.filter((p) => p.detail.sections.length > 0).map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProgram(slug);
  if (!p) return {};
  return { title: p.name, description: p.what };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProgram(slug);
  if (!p || p.detail.sections.length === 0) notFound();

  const tone = p.kind === "no-se-devuelve" ? "green" : p.kind === "prestado" ? "blue" : "green";

  return (
    <>
      <PageHero
        eyebrow={KIND_LABEL[p.kind]}
        title={p.name}
        intro={p.detail.intro}
        tone={tone}
        trail={[
          { href: "/programas", label: "Ayuda del gobierno" },
          { label: p.name },
        ]}
      >
        <Outcomes items={p.detail.outcomes} />
        <div className={styles.linkRow}>
          <OfficialLink href={p.url} label={p.urlLabel} />
        </div>
      </PageHero>

      <section className={shared.body}>
        <div className="shell">
          {p.detail.sections.map((sec, i) => (
            <Reveal key={sec.title} delay={i * 60}>
              <div className={styles.block}>
                <h2 className="h2">{sec.title}</h2>
                <div className="prose">
                  {sec.body.map((b) => (
                    <p key={b}>{b}</p>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {p.detail.steps.length > 0 ? (
        <section className={styles.stepsWrap}>
          <div className={`shell ${shared.split}`}>
            <Reveal>
              <p className="eyebrow">El camino</p>
              <h2 className="h2">Qué hacer, en orden.</h2>
              <div className="prose">
                <p>
                  Nadie te va a llamar a ofrecerte esto. Toca ir a preguntar, y
                  llegar sabiendo qué preguntar cambia la conversación.
                </p>
              </div>
              <div className={styles.linkRow}>
                <OfficialLink href={p.url} label={p.urlLabel} />
              </div>
            </Reveal>

            <Reveal delay={100}>
              <ol className={shared.steps}>
                {p.detail.steps.map(([t, d], i) => (
                  <li key={t}>
                    <span className={shared.stepN}>{i + 1}</span>
                    <div>
                      <p className={shared.stepT}>{t}</p>
                      <p className={shared.stepD}>{d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </section>
      ) : null}

      {p.detail.watch.length > 0 ? (
        <section className={shared.body}>
          <div className="shell">
            <Reveal>
              <h2 className="h2">Antes de moverte.</h2>
              <ul className={styles.watch}>
                {p.detail.watch.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      ) : null}

      <CTA
        title="Antes de pedir prestado, mira el costo."
        body="Un microcrédito formal y un gota a gota por el mismo monto no se parecen en nada al año."
        href="/herramientas/gota-a-gota"
        label="Ver la calculadora"
      />
    </>
  );
}
