import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { CTA } from "@/components/ui/CTA";
import { Reveal } from "@/components/ui/Reveal";
import { Outcomes } from "@/components/ui/Outcomes";
import { ArrowUpRight } from "@/components/ui/Icon";
import { getCategory } from "@/content/categories";
import { ALLIED_KINDS, KIND_LABEL, PROGRAMS } from "@/content/programas";
import shared from "../subpage.module.css";
import styles from "./programas.module.css";

const CATEGORY = getCategory("programas")!;

export const metadata: Metadata = {
  title: "Ayuda del gobierno",
  description:
    "Qué programas públicos existen para conseguir plata para tu negocio en Colombia, cuáles se devuelven y cuáles no, y a dónde ir a preguntar.",
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Paso 5"
        title="Ayuda del gobierno"
        intro="Existen programas hechos para darle plata a quien quiere montar un negocio y ningún banco atiende. No son secretos: es que nadie los explica."
        tone="green"
        trail={[{ label: "Ayuda del gobierno" }]}
      >
        <Outcomes items={CATEGORY.outcomes} />
      </PageHero>

      {/* The distinction that changes everything */}
      <section className={shared.body}>
        <div className="shell">
          <Reveal>
            <h2 className="h2">Primero: no toda la plata es prestada.</h2>
            <div className="prose">
              <p>
                Mucha gente ni pregunta porque asume que todo es un préstamo con
                intereses. No es así. Hay tres cosas distintas y conviene saber
                cuál estás buscando.
              </p>
            </div>
          </Reveal>

          <div className={styles.kinds}>
            <Reveal delay={60}>
              <article className={`${styles.kind} ${styles.free}`}>
                <p className={styles.kindTag}>Plata que no se devuelve</p>
                <p className={styles.kindText}>
                  Se llama <strong>capital semilla</strong>. Te la dan para
                  montar el negocio y, si cumples lo que acordaste, no la
                  devuelves. A cambio piden un plan y te hacen seguimiento.
                </p>
              </article>
            </Reveal>
            <Reveal delay={120}>
              <article className={`${styles.kind} ${styles.loan}`}>
                <p className={styles.kindTag}>Plata prestada</p>
                <p className={styles.kindText}>
                  Se llama <strong>microcrédito</strong> cuando el monto es
                  pequeño. Sí se devuelve y sí cobra interés, pero muchísimo más
                  barato que un gota a gota, y sin amenazas.
                </p>
              </article>
            </Reveal>
            <Reveal delay={180}>
              <article className={`${styles.kind} ${styles.door}`}>
                <p className={styles.kindTag}>Programas que abren la puerta</p>
                <p className={styles.kindText}>
                  No dan plata directamente. Hacen que los bancos y cooperativas
                  te ofrezcan productos, o te forman gratis para que puedas
                  postular a los otros dos.
                </p>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* The programs themselves */}
      <section className={styles.list}>
        <div className="shell">
          <Reveal>
            <p className="eyebrow">Uno por uno</p>
            <h2 className="h2">Qué existe y para quién es.</h2>
          </Reveal>

          <div className={styles.grid}>
            {PROGRAMS.map((p, i) => {
              const card = (
                <article className={`${styles.card} ${styles[p.kind === "no-se-devuelve" ? "free" : p.kind === "prestado" ? "loan" : "door"]}`}>
                  <p className={styles.cardTag}>{KIND_LABEL[p.kind]}</p>
                  <h3 className="h3">{p.name}</h3>
                  <p className={styles.who}>{p.who}</p>
                  <p className={styles.what}>{p.what}</p>

                  <p className={styles.label}>Para quién</p>
                  <p className={styles.text}>{p.forWhom}</p>

                  <p className={styles.label}>La realidad</p>
                  <p className={styles.text}>{p.reality}</p>

                  {p.slug ? (
                    <span className={styles.more}>
                      Ver en detalle
                      <ArrowUpRight />
                    </span>
                  ) : null}
                </article>
              );

              return (
                <Reveal key={p.name} delay={i * 60}>
                  {p.slug ? (
                    <Link href={`/programas/${p.slug}`} className={styles.link}>
                      {card}
                    </Link>
                  ) : (
                    card
                  )}
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={200}>
            <div className={styles.warn}>
              <p>
                <strong>Ojo con esto:</strong> las convocatorias abren y cierran
                en fechas concretas, y los montos cambian cada año. Antes de
                hacer cualquier trámite, confirma en la página oficial del
                programa que siga abierto.
              </p>
              <p>
                Y lo más importante: <strong>ninguno de estos programas cobra
                por postularse.</strong> Si alguien te pide plata para
                «gestionarte» un subsidio del Gobierno, es una estafa.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Where you actually go */}
      <section className={shared.body}>
        <div className="shell">
          <Reveal>
            <p className="eyebrow">A dónde ir</p>
            <h2 className="h2">Estos programas se piden en otra parte.</h2>
            <div className="prose">
              <p>
                Casi ninguno atiende al público directamente. La plata se pide
                en una entidad aliada, y esa entidad sí tiene oficina.
              </p>
            </div>

            <div className={styles.allied}>
              {ALLIED_KINDS.map(([name, desc]) => (
                <div key={name} className={styles.ally}>
                  <p className={styles.allyName}>{name}</p>
                  <p className={styles.allyDesc}>{desc}</p>
                </div>
              ))}
            </div>

            <div className={shared.pending}>
              <p>
                <strong>Pendiente:</strong> confirmar direcciones, horarios y
                teléfonos de los puntos de atención en Barranquilla, y revisar
                cada convocatoria antes de publicar. Ningún dato de contacto se
                publica sin verificarlo en la fuente oficial.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CTA
        title="Antes de pedir prestado, mira el costo."
        body="La diferencia entre un microcrédito formal y un gota a gota se ve mejor en números."
        href="/herramientas/gota-a-gota"
        label="Ver la calculadora"
      />
    </>
  );
}
