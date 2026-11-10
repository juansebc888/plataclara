import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { NextStep } from "@/components/ui/NextStep";
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
  const url = `/programas/${p.slug}`;
  return {
    title: p.name,
    description: p.what,
    openGraph: { title: p.name, description: p.what, url },
    alternates: { canonical: url },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProgram(slug);
  if (!p || p.detail.sections.length === 0) notFound();

  return (
    <>
      <PageHero
        eyebrow={KIND_LABEL[p.kind]}
        title={p.name}
        answer={<p>{p.what}</p>}
        trail={[
          { href: "/programas", label: "Ayuda del gobierno" },
          { label: p.name },
        ]}
      >
        <div className={styles.linkRow}>
          <OfficialLink href={p.url} label={p.urlLabel} />
        </div>
      </PageHero>

      {p.detail.steps.length > 0 ? (
        <section className={shared.body}>
          <div className="shell">
            <h2 className="h2">Qué hacer, en orden.</h2>
            <ol className={`${shared.steps} ${shared.gapTopSm}`}>
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
            {p.detail.watch.length > 0 ? (
              <>
                <h2 className={`h2 ${shared.gapTop}`}>Antes de moverte.</h2>
                <ul className="list-plain">
                  {p.detail.watch.map((w) => (
                    <li key={w}>{w}</li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>
        </section>
      ) : null}

      <section className={shared.details}>
        <div className="shell">
          <details className="more-details">
            <summary>Ver más sobre {p.name}</summary>
            <div className="more-body">
              <p>{p.detail.intro}</p>
              <p>Para quién: {p.forWhom}</p>
              <p>{p.reality}</p>
            </div>
          </details>
          {p.detail.sections.map((sec) => (
            <details key={sec.title} className="more-details">
              <summary>{sec.title}</summary>
              <div className="more-body">
                {sec.body.map((b) => (
                  <p key={b}>{b}</p>
                ))}
              </div>
            </details>
          ))}
        </div>
      </section>

      <NextStep
        links={
          p.kind === "prestado" || p.kind === "no-se-devuelve"
            ? [
                { href: "/herramientas/gota-a-gota", title: "¿Cuánto más caro es un gota a gota?" },
                { href: "/programas", title: "¿Qué otros programas hay?" },
              ]
            : [
                { href: "/herramientas/ahorro", title: "¿Cuánto junto si guardo un poquito cada día?" },
                { href: "/programas", title: "¿Qué otros programas hay?" },
              ]
        }
      />
    </>
  );
}
