import type { Metadata } from "next";
import Link from "next/link";
import { Art } from "@/components/ui/Art";
import { PageHero } from "@/components/ui/PageHero";
import { Illustration } from "@/components/ui/Illustration";
import { NextStep } from "@/components/ui/NextStep";
import { LazyGotaAGota } from "@/components/tools/LazyTools";
import { OfficialLink } from "@/components/ui/OfficialLink";
import { RATES, REFERENCE, monthlyToEA } from "@/lib/finance";
import { percent } from "@/lib/format";
import { getCategory } from "@/content/categories";
import styles from "../subpage.module.css";

/** "casi 28 veces" / "más de 27 veces": stays true when the usury rate moves. */
const ratio = monthlyToEA(RATES.gotaMonthly) / REFERENCE.usuraEA;
const timesOver =
  ratio % 1 >= 0.5
    ? `casi ${Math.ceil(ratio)} veces`
    : `más de ${Math.floor(ratio)} veces`;

const CATEGORY = getCategory("deudas")!;

export const metadata: Metadata = {
  title: CATEGORY.name,
  description: CATEGORY.desc,
  openGraph: {
    title: CATEGORY.name,
    description: CATEGORY.desc,
    url: "/deudas",
  },
  alternates: { canonical: "/deudas" },
};

export default function Page() {
  return (
    <>
      <PageHero
        title="Salir de deudas"
        answer={
          <>
            <p>
              Cobrar lo que cobra un gota a gota es un delito, aunque tú
              hayas aceptado.
            </p>
            <p>Si te amenazan, llama al 123 y denuncia. Es gratis.</p>
          </>
        }
        art={<Art name="deudas" />}
        trail={[{ label: "Salir de deudas" }]}
      />

      <section className={styles.body}>
        <div className="shell">
          <div className="warn">
            <p>
              <strong>Si te amenazan a ti o a tu familia:</strong> eso ya no es
              una deuda, es un delito. Aunque sí debas la plata.
            </p>
            <ol>
              <li>Si estás en peligro ahora, llama al <strong>123</strong>.</li>
              <li>
                Denuncia en la Fiscalía o con la Policía. No cuesta y no
                necesitas abogado.
              </li>
              <li>Guarda los mensajes, los audios y los números.</li>
            </ol>
            <OfficialLink href="https://www.fiscalia.gov.co" label="fiscalia.gov.co" />
          </div>

          <h2 className={`h2 ${styles.gapTop}`}>Qué hacer hoy.</h2>
          <ol className="list-plain">
            <li>
              <strong>Anota el número real.</strong> Cuánto pediste, cuánto
              pagas cada día y cuántas cuotas llevas. Muchos descubren que ya
              devolvieron más de lo que pidieron.
            </li>
            <li>
              <strong>No pidas a otro para pagarle a este.</strong> Así la deuda
              crece más rápido.
            </li>
            <li>
              <strong>Pregunta por un microcrédito</strong> (un préstamo pequeño
              de un banco o cooperativa) para pagar de una vez. Cobra muchísimo
              menos. Preguntar no cuesta.
            </li>
          </ol>

          <p className={styles.gapTop}>
            <Link href="/ayuda" prefetch={false} className="btn">
              Ver a quién llamar o ir
            </Link>
          </p>
        </div>
      </section>

      <section className={styles.details}>
        <div className="shell">
          <details className="more-details">
            <summary>¿Cuánto me están cobrando de verdad?</summary>
            <div className="more-body">
              <p>
                El gota a gota no te dice la tasa. Te dice una cuota diaria
                pequeña. Pero el interés se cobra otra vez sobre lo que ya
                debes, mes tras mes. Escoge un monto y mira:
              </p>
              <LazyGotaAGota />
            </div>
          </details>

          <details className="more-details">
            <summary>¿Cómo sé si es ilegal lo que me cobran?</summary>
            <div className="more-body">
              <p>
                La ley pone un máximo a lo que te pueden cobrar por prestarte.
                Se llama <strong>tasa de usura</strong>. En{" "}
                {REFERENCE.usuraMes} era {percent(REFERENCE.usuraEA)} al año
                para préstamos de consumo.
              </p>
              <p>
                Un gota a gota que cobra {percent(RATES.gotaMonthly, 0)} al mes
                equivale a{" "}
                <strong className={styles.red}>
                  {percent(monthlyToEA(RATES.gotaMonthly), 0)} al año
                </strong>
                . Es {timesOver} más que el máximo legal. Cobrar más del
                máximo es <strong>el delito de usura</strong>, con cárcel.
              </p>
              <p>
                El microcrédito tiene su propio máximo, un poco más alto. Aun
                así, ningún préstamo legal se acerca a lo del gota a gota.
              </p>
              <p>Para revisar un préstamo:</p>
              <ol className="list-plain">
                <li>
                  Pide por escrito la tasa «efectiva anual» (lo que te cobran
                  en un año).
                </li>
                <li>
                  Compárala con la tasa de usura en la página de la
                  Superfinanciera (la oficina del gobierno que vigila a los
                  bancos).
                </li>
                <li>Si es mayor, es ilegal y puedes denunciarlo.</li>
              </ol>
              <p className={styles.gapTop}>
                <OfficialLink href="https://www.superfinanciera.gov.co" label="superfinanciera.gov.co" />
              </p>
              <Illustration
                name="usura"
                caption="Por encima de la línea roja, cobrar intereses es un delito."
              />
            </div>
          </details>

          <details className="more-details">
            <summary>¿Y si ya no puedo pagar nada?</summary>
            <div className="more-body">
              <p>
                Existe un trámite legal para personas que ya no pueden pagar
                sus deudas. Se llama <strong>insolvencia de persona natural no
                comerciante</strong>.
              </p>
              <p>
                Sirve para negociar con todos a los que les debes al mismo
                tiempo, con un conciliador (una persona neutral) en el medio.
                Mientras dura, se frenan los cobros.
              </p>
              <p>
                Se pide en centros de conciliación y notarías. No borra la
                deuda y tiene requisitos. Pregunta por él antes de pedir más
                prestado.
              </p>
            </div>
          </details>
        </div>
      </section>

      <NextStep
        links={[
          { href: "/programas", title: "¿Hay préstamos del gobierno para mí?" },
          { href: "/presupuesto", title: "¿Cómo organizo la plata que gano cada día?" },
        ]}
      />
    </>
  );
}
