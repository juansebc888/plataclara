import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { NextStep } from "@/components/ui/NextStep";
import { LazyAhorro } from "@/components/tools/LazyTools";
import { REFERENCE } from "@/lib/finance";
import { money } from "@/lib/format";
import styles from "../../subpage.module.css";

export const metadata: Metadata = {
  title: "Cuánto junto ahorrando",
  description:
    "Calculadora: cuánto se acumula guardando una cantidad fija, y qué cambia si cada vez que juntas el mínimo lo pasas a un CDT.",
  openGraph: {
    title: "Cuánto junto ahorrando",
    description: "Calculadora: cuánto se acumula guardando una cantidad fija, y qué cambia si cada vez que juntas el mínimo lo pasas a un CDT.",
    url: "/herramientas/ahorro",
  },
  alternates: { canonical: "/herramientas/ahorro" },
};

export default function Page() {
  return (
    <>
      <PageHero
        title="Cuánto junto ahorrando"
        answer={
          <p>
            Escribe cuánto puedes guardar y por cuánto tiempo. La cuenta sale
            abajo.
          </p>
        }
        trail={[
          { href: "/herramientas", label: "Calculadoras" },
          { label: "Cuánto junto ahorrando" },
        ]}
      />

      <section className={styles.body}>
        <div className="shell">
          <div className={styles.calcWrap}>
            <LazyAhorro />
          </div>

          <details className={`more-details ${styles.gapTop}`}>
            <summary>¿Qué es un CDT?</summary>
            <div className="more-body">
              <p>
                Un CDT es un ahorro en el banco donde dejas la plata quieta un
                tiempo (por ejemplo, un año). Al final te la devuelven con
                intereses.
              </p>
              <p>
                No recibe plata de a poquitos. Se abre con una suma completa.
                En los bancos por internet el mínimo suele ser{" "}
                <strong>{money(REFERENCE.cdtMinimoDigital)}</strong>. Por eso
                la calculadora junta lo que guardas y, cada vez que alcanza, lo
                pasa a un CDT a un año.
              </p>
              <p>
                Para abrir un CDT necesitas una cuenta en el banco.{" "}
                <Link href="/empezando" prefetch={false}>
                  Mira cómo abrirla solo con la cédula
                </Link>
                .
              </p>
            </div>
          </details>
          <details className="more-details">
            <summary>¿Por qué el primer año sale igual?</summary>
            <div className="more-body">
              <p>
                Los intereses se pagan cuando el CDT termina, no antes. En el
                primer año todavía no ha terminado ninguno. Al principio lo que
                hace crecer el ahorro es guardar seguido, no los intereses.
              </p>
              <p>
                Cambia a cinco o diez años y mira cómo se abre la diferencia.
              </p>
            </div>
          </details>
        </div>
      </section>

      <NextStep
        links={[
          { href: "/presupuesto", title: "¿Cómo separo la plata si gano distinto cada día?" },
          { href: "/empezando", title: "¿Puedo abrir una cuenta sin trabajo fijo?" },
        ]}
      />
    </>
  );
}
