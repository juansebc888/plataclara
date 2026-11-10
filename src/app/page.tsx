import Link from "next/link";
import { Questions } from "@/components/ui/Questions";
import { LazyAhorroHome } from "@/components/tools/LazyTools";
import styles from "./page.module.css";

/** Server Component. The questions are the hero. */
export default function Home() {
  return (
    <>
      <section className={styles.hero}>
        <div className="shell">
          <h1 className={`h1 ${styles.title}`}>
            ¿Qué te preocupa de <span className="underline-mark">la plata?</span>
          </h1>
          <p className={styles.trust}>
            Gratis. Sin publicidad. Sin registrarte. No vendemos nada.
          </p>
          <p className={styles.pick}>Toca tu pregunta:</p>
          <Questions />
        </div>
      </section>

      <section className={styles.save}>
        <div className={`shell ${styles.saveGrid}`}>
          <div className={styles.saveText}>
            <h2 className="h2">¿Cuánto juntas guardando un poquito cada día?</h2>
            <p className={styles.saveLead}>
              Toca una cantidad y mira cuánto tendrías en 3 años.
            </p>
            <p className={styles.saveMore}>
              ¿Quieres probar otras cantidades o plazos?{" "}
              <Link href="/herramientas/ahorro" prefetch={false}>
                Mira la cuenta completa
              </Link>
              .
            </p>
            <div className={styles.planBox}>
              <p className={styles.planText}>
                ¿Quieres una lista de lo que vas a hacer? No pide datos.
              </p>
              <Link href="/mi-plan" prefetch={false} className="btn btn-ghost">
                Arma tu plan
              </Link>
            </div>
          </div>
          <div className={styles.calc}>
            <LazyAhorroHome />
          </div>
        </div>
      </section>
    </>
  );
}
