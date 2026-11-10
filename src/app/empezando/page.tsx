import type { Metadata } from "next";
import { Art } from "@/components/ui/Art";
import { PageHero } from "@/components/ui/PageHero";
import { CheckList } from "@/components/ui/CheckList";
import { OfficialLink } from "@/components/ui/OfficialLink";
import { Illustration } from "@/components/ui/Illustration";
import { NextStep } from "@/components/ui/NextStep";
import { REFERENCE } from "@/lib/finance";
import { money } from "@/lib/format";
import {
  ACCOUNT_TYPES,
  BASIC_PHONE_STEPS,
  NEEDED,
  NOT_NEEDED,
} from "@/content/empezando";
import shared from "../subpage.module.css";

export const metadata: Metadata = {
  title: "Abrir tu primera cuenta",
  description:
    "Qué necesitas de verdad para abrir una cuenta de ahorros en Colombia: solo la cédula. Sin fiador, sin contrato de trabajo y sin saldo mínimo.",
  openGraph: {
    title: "Abrir tu primera cuenta",
    description: "Qué necesitas de verdad para abrir una cuenta de ahorros en Colombia: solo la cédula. Sin fiador, sin contrato de trabajo y sin saldo mínimo.",
    url: "/empezando",
  },
  alternates: { canonical: "/empezando" },
};

/** Visible list: just the names. The notes live in "Ver más". */
const short = (items: typeof NEEDED) => items.map(({ text }) => ({ text }));

export default function Page() {
  return (
    <>
      <PageHero
        title="Abrir tu primera cuenta"
        answer={
          <>
            <p>
              Sí puedes, aunque no tengas trabajo fijo. Solo necesitas tu
              cédula.
            </p>
            <p>No piden fiador, ni contrato, ni plata para abrirla.</p>
          </>
        }
        art={<Art name="empezando" />}
        trail={[{ label: "Abrir una cuenta" }]}
      />

      <section className={shared.body}>
        <div className="shell">
          <h2 className="h2">Lo que te piden.</h2>
          <CheckList
            yes={short(NEEDED)}
            no={short(NOT_NEEDED)}
            yesLabel="Sí necesitas"
            noLabel="No necesitas"
          />
        </div>
      </section>

      <section className={shared.more}>
        <div className={`shell ${shared.split}`}>
          <div>
            <h2 className="h2">Ábrela desde el celular, sin datos.</h2>
            <p className={shared.lead}>
              Sirve un celular básico. No necesitas plan de datos ni wifi. No
              cuesta nada.
            </p>
            <Illustration
              name="sim-menu"
              caption="El menú de la SIM funciona sin datos ni wifi."
            />
          </div>

          <ol className={shared.steps}>
            {BASIC_PHONE_STEPS.map(([t, d], i) => (
              <li key={t}>
                <span className={shared.stepN}>{i + 1}</span>
                <div>
                  <p className={shared.stepT}>{t}</p>
                  <p className={shared.stepD}>{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={shared.details}>
        <div className="shell">
          <details className="more-details">
            <summary>Ver más sobre lo que te piden</summary>
            <div className="more-body">
              <CheckList yes={NEEDED} no={NOT_NEEDED} yesLabel="Sí necesitas" noLabel="No necesitas" />
              <Illustration name="cedula" caption="Para una cuenta básica, con la cédula basta." />
            </div>
          </details>

          <details className="more-details">
            <summary>¿Qué cuenta me conviene?</summary>
            <div className="more-body">
              {ACCOUNT_TYPES.map((t) => (
                <div key={t.name}>
                  <p>
                    <strong>{t.name}.</strong> {t.what}
                  </p>
                  <p>
                    Lo bueno: {t.good} Cuidado: {t.watch}
                  </p>
                </div>
              ))}
            </div>
          </details>

          <details className="more-details">
            <summary>¿Dónde saco o meto plata sin ir al banco?</summary>
            <div className="more-body">
              <p>
                En una tienda, droguería o papelería del barrio con el letrero
                del banco. Se llama <strong>corresponsal bancario</strong>.
                Ahí puedes sacar plata, consignar y pagar recibos.
              </p>
              <Illustration
                name="corresponsal"
                caption="Busca el letrero del banco en la tienda, la droguería o la papelería."
              />
            </div>
          </details>

          <details className="more-details">
            <summary>¿La cuenta sencilla tiene límites?</summary>
            <div className="more-body">
              <p>
                Sí. Lo que puedes tener guardado suele llegar hasta{" "}
                <strong>8 salarios mínimos</strong>, unos{" "}
                <strong>{money(REFERENCE.smmlv * 8)}</strong> en {REFERENCE.year}.
                Cuánto puedes mover al mes cambia según el banco: pregúntalo el
                día que vayas.
              </p>
              <p>
                Para lo que mueve la mayoría de la gente, el tope no estorba.
                Solo puedes tener <strong>una</strong> cuenta de este tipo.
              </p>
            </div>
          </details>

          <details className="more-details">
            <summary>¿Mi plata está segura en el banco?</summary>
            <div className="more-body">
              <p>
                Sí, si la entidad está vigilada por el gobierno. Un fondo del
                gobierno (Fogafín) te devuelve hasta{" "}
                <strong>{money(REFERENCE.fogafin)}</strong> si el banco quiebra.
                Debajo del colchón no hay nada de eso.
              </p>
              <p>
                Antes de abrir cuenta, revisa gratis que la entidad esté
                vigilada en la página de la Superfinanciera (la oficina que
                vigila a los bancos).
              </p>
              <p>
                <OfficialLink href="https://www.superfinanciera.gov.co" label="superfinanciera.gov.co" />
              </p>
            </div>
          </details>
        </div>
      </section>

      <NextStep
        links={[
          { href: "/presupuesto", title: "¿Cómo organizo la plata si gano distinto cada día?" },
          { href: "/estafas", title: "¿Cómo sé si un mensaje del banco es una estafa?" },
        ]}
      />
    </>
  );
}
