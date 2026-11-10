import type { Metadata } from "next";
import Link from "next/link";
import { Art } from "@/components/ui/Art";
import { PageHero } from "@/components/ui/PageHero";
import { NextStep } from "@/components/ui/NextStep";
import { ArrowRight } from "@/components/ui/Icon";
import { OfficialLink } from "@/components/ui/OfficialLink";
import { ALLIES, KIND_LABEL, PROGRAMS } from "@/content/programas";
import shared from "../subpage.module.css";
import styles from "./programas.module.css";

export const metadata: Metadata = {
  title: "Ayuda del gobierno",
  description:
    "Qué programas públicos existen para conseguir plata para tu negocio en Colombia, cuáles se devuelven y cuáles no, y a dónde ir a preguntar.",
  openGraph: {
    title: "Ayuda del gobierno",
    description: "Qué programas públicos existen para conseguir plata para tu negocio en Colombia, cuáles se devuelven y cuáles no, y a dónde ir a preguntar.",
    url: "/programas",
  },
  alternates: { canonical: "/programas" },
};

export default function Page() {
  return (
    <>
      <PageHero
        title="Ayuda del gobierno"
        answer={
          <>
            <p>
              Sí hay. Unos programas dan plata para el negocio que no se
              devuelve. Otros prestan barato, sin pedir historial.
            </p>
            <p>Ninguno cobra por postularte.</p>
          </>
        }
        art={<Art name="programas" />}
        trail={[{ label: "Ayuda del gobierno" }]}
      />

      <section className={shared.body}>
        <div className="shell">
          <div className="warn">
            <p>
              <strong>Si alguien te pide plata para «conseguirte» un subsidio
              o un préstamo del gobierno, es una estafa.</strong>
            </p>
          </div>

          <h2 className={`h2 ${shared.gapTop}`}>Toca un programa para ver cómo pedirlo.</h2>
          <ul className={styles.grid}>
            {PROGRAMS.map((p) => (
              <li key={p.slug}>
                <Link href={`/programas/${p.slug}`} prefetch={false} className={styles.card}>
                  <span>
                    <span className={styles.cardName}>{p.name}</span>
                    <span className={styles.cardKind}>{KIND_LABEL[p.kind]}</span>
                  </span>
                  <ArrowRight size={22} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={shared.details}>
        <div className="shell">
          <details className="more-details">
            <summary>¿Toda esa plata hay que devolverla?</summary>
            <div className="more-body">
              <p>
                <strong>Plata que no se devuelve:</strong> se llama capital
                semilla. Te la dan para montar el negocio. Si cumples lo
                acordado, no la devuelves. Piden un plan y te hacen
                seguimiento.
              </p>
              <p>
                <strong>Plata prestada:</strong> si es poca se llama
                microcrédito. Se devuelve con intereses, pero mucho más barato
                que un gota a gota y sin amenazas.
              </p>
              <p>
                <strong>Programas que abren la puerta:</strong> no dan plata.
                Hacen que bancos y cooperativas te atiendan, o te enseñan
                gratis.
              </p>
              <p>
                <strong>{KIND_LABEL.ahorro}:</strong> es tu propia plata,
                guardada para la vejez. El gobierno le suma un premio.
              </p>
            </div>
          </details>

          <details className="more-details">
            <summary>¿Qué hace cada programa?</summary>
            <div className="more-body">
              {PROGRAMS.map((p) => (
                <div key={p.slug}>
                  <p>
                    <strong>{p.name}.</strong> {p.what}
                  </p>
                  <p>Para quién: {p.forWhom}</p>
                  <p>
                    <OfficialLink href={p.url} label={p.urlLabel} compact />
                  </p>
                </div>
              ))}
            </div>
          </details>

          <details className="more-details">
            <summary>¿A dónde voy a pedirlo?</summary>
            <div className="more-body">
              <p>
                Casi ningún programa atiende directo. Se pide en una entidad
                aliada que sí tiene oficina:
              </p>
              {ALLIES.map((a) => (
                <p key={a.name}>
                  <strong>{a.name}.</strong> {a.desc}{" "}
                  {a.url && a.urlLabel ? (
                    <OfficialLink href={a.url} label={a.urlLabel} compact />
                  ) : null}
                </p>
              ))}
              <p>
                Las fechas y los montos cambian cada año. Antes de cualquier
                trámite, confirma en la página oficial que el programa siga
                abierto.
              </p>
            </div>
          </details>
        </div>
      </section>

      <NextStep
        links={[
          { href: "/herramientas/gota-a-gota", title: "¿Cuánto más caro es un gota a gota?" },
          { href: "/credito", title: "Nunca he pedido un préstamo. ¿Cómo empiezo?" },
        ]}
      />
    </>
  );
}
