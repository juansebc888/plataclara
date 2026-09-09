import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { CTA } from "@/components/ui/CTA";
import { Reveal } from "@/components/ui/Reveal";
import shared from "../subpage.module.css";
import styles from "./privacidad.module.css";

export const metadata: Metadata = {
  title: "Privacidad",
  description:
    "Qué datos recoge Plata Clara y cuáles no. Sin cuentas, sin formularios, sin cookies de seguimiento y sin publicidad.",
};

const NO: string[] = [
  "Tu nombre, cédula, teléfono o correo",
  "Tu ubicación exacta",
  "Nada de lo que escribas en las calculadoras",
  "Nada de lo que marques en «Mi plan»",
  "Cookies de publicidad o de seguimiento",
];

const YES: [string, string][] = [
  [
    "Qué páginas se visitan",
    "Cuántas veces se abre cada página. Así sabemos qué tema le sirve más a la gente y cuál hay que mejorar.",
  ],
  [
    "Desde qué tipo de dispositivo",
    "Si es celular o computador, y el navegador. Nos sirve para probar el sitio en los equipos que la gente usa de verdad.",
  ],
  [
    "El país o la región aproximada",
    "A nivel de región, no de dirección. No sabemos dónde estás.",
  ],
  [
    "De dónde llegaste",
    "Si entraste directo o por un enlace. Nada más.",
  ],
];

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Privacidad"
        title="Qué sabemos de ti"
        intro="La respuesta corta: casi nada, y nada que te identifique. Aquí está el detalle completo, en español claro."
        tone="blue"
        trail={[{ label: "Privacidad" }]}
      />

      <section className={shared.body}>
        <div className="shell">
          <Reveal>
            <div className={styles.headline}>
              <p>
                Este sitio <strong>no tiene cuentas, no tiene formularios y no
                te pide ningún dato personal</strong>. No hay dónde registrarse
                porque no queremos tu información.
              </p>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className={styles.cols}>
              <div className={`${styles.col} ${styles.no}`}>
                <p className={styles.colHead}>Lo que NO recogemos</p>
                <ul>
                  {NO.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>

              <div className={`${styles.col} ${styles.yes}`}>
                <p className={styles.colHead}>Lo que SÍ contamos</p>
                <ul className={styles.yesList}>
                  {YES.map(([t, d]) => (
                    <li key={t}>
                      <strong>{t}</strong>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className={styles.detail}>
        <div className="shell">
          <Reveal>
            <h2 className="h2">Por qué contamos visitas.</h2>
            <div className="prose">
              <p>
                Para saber si esto le sirve a alguien. Si nadie abre la página
                de deudas, sobra; si todo el mundo la abre, hay que ampliarla.
                Es la única forma de mejorar el sitio sin adivinar.
              </p>
              <p>
                La herramienta que usamos es la medición de visitas de Vercel,
                la empresa donde está alojado el sitio.{" "}
                <strong>No usa cookies</strong> y no construye un perfil tuyo ni
                te sigue por otras páginas. Por eso este sitio no tiene ese
                letrero de «acepte las cookies» que sale en todas partes: no hay
                cookies que aceptar.
              </p>

              <h2 className="h2">Las calculadoras y «Mi plan».</h2>
              <p>
                Todo lo que escribes o marcas ahí <strong>se queda en tu
                teléfono</strong>. Los cálculos se hacen en tu propio navegador
                y no viajan a ningún servidor. Cuando cierras la página,
                desaparecen. Por eso el plan se imprime en vez de guardarse: no
                hay ninguna cuenta donde guardarlo.
              </p>

              <h2 className="h2">Enlaces a otras páginas.</h2>
              <p>
                Cuando enlazamos a un banco, al SENA o a la Superintendencia
                Financiera, sales de este sitio y entras al de ellos, donde
                aplican sus propias reglas. Nosotros no recibimos nada por
                enviarte allá: no hay comisiones ni acuerdos con ninguna
                entidad.
              </p>

              <h2 className="h2">Lo que nunca va a pasar.</h2>
              <p>
                No vendemos información, porque no la tenemos. No hay
                publicidad. No hay productos financieros a la venta. Si algún
                día algo de esto cambia, va a estar escrito en esta página antes
                de que cambie.
              </p>
            </div>

            <div className={styles.note}>
              <p>
                <strong>Cómo verificarlo tú mismo:</strong> el código de este
                sitio es público en GitHub. Cualquiera puede revisarlo y
                comprobar que lo que dice esta página es cierto.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CTA
        title="Sin cuenta, sin datos, sin costo."
        body="Empieza por el tema que más te sirva."
        href="/"
        label="Ver los temas"
      />
    </>
  );
}
