import Link from "next/link";
import { Facts } from "@/components/ui/Facts";
import { LazyAhorro } from "@/components/tools/LazyTools";
import { QUESTIONS } from "@/content/home";
import styles from "./page.module.css";

/** Server Component. */
export default function Home() {
  return (
    <>
      <section className={styles.hero}>
        <div className="shell">
          <h1 className="h1">
            Tu plata, explicada <mark>sin tanta vuelta</mark>.
          </h1>
          <p className="sub">
            Guías gratis para quien cobra en efectivo, trabaja por su cuenta y
            nunca ha tenido cuenta en un banco. No hay que registrarse, no se
            vende nada y no hay letra pequeña.
          </p>
        </div>
      </section>

      <section className={styles.questions}>
        <div className="shell">
          <h2 className="h2">¿Qué necesitas resolver?</h2>
          <p className="lede">Escoge la pregunta que más se parezca a la tuya.</p>

          <ul className={styles.qList}>
            {QUESTIONS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={styles.q}>
                  <span className={styles.qText}>{item.q}</span>
                  <span className={styles.qPage}>{item.page} →</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.note}>
        <div className="shell">
          <div className={styles.letter}>
            <p>
              Empecé Plata Clara porque en el club de finanzas que fundé en mi
              colegio me di cuenta de algo: lo que enseñábamos nunca le llegaba
              a la gente que más lo necesita. Esto es para ellos.
            </p>
            <p>
              Todo lo que está aquí lo revisé en fuentes oficiales, y cada
              entidad tiene su enlace para que puedas comprobarlo tú mismo. No
              vendo nada y no gano nada con esto.
            </p>
            <p className={styles.sign}>— Juanse, Barranquilla</p>
          </div>
        </div>
      </section>

      <section className={styles.calc}>
        <div className="shell">
          <h2 className="h2">¿Cuánto se junta guardando poquito?</h2>
          <p className="lede">
            Pon lo que podrías guardar y mira qué pasa en un año, o en cinco.
          </p>
          <div className={styles.calcBox}>
            <LazyAhorro />
          </div>
        </div>
      </section>

      <section className={styles.plan}>
        <div className="shell">
          <h2 className="h2">Llévatelo en papel.</h2>
          <p className="lede">
            Marca lo que quieres hacer y te sale una lista en una hoja para
            imprimir. Sirve aunque después te quedes sin datos.
          </p>
          <p className={styles.planLink}>
            <Link href="/mi-plan" className="btn">
              Armar mi plan →
            </Link>
          </p>
        </div>
      </section>

      <Facts />
    </>
  );
}
