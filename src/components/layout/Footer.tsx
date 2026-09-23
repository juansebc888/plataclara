import Link from "next/link";
import { CATEGORIES } from "@/content/categories";
import { FOOTER_EXTRA, SITE } from "@/content/site";
import styles from "./Footer.module.css";

/** Server Component — no interactivity, ships zero JS. */
export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="shell">
        <div className={styles.inner}>
          <div className={styles.about}>
            <Link href="/" className={styles.brand}>
              {SITE.name}
            </Link>
            <p className={styles.note}>
              Guías gratuitas de educación financiera. Sin publicidad, sin
              venta de productos y sin cuentas ni formularios. Contamos visitas
              para saber qué le sirve a la gente, sin cookies y sin
              identificarte.
            </p>
          </div>

          <div className={styles.cols}>
            <div>
              <p className={styles.h}>Temas</p>
              {CATEGORIES.slice(0, 4).map((c) => (
                <Link key={c.slug} href={`/${c.slug}`} className={styles.link}>
                  {c.name}
                </Link>
              ))}
            </div>
            <div>
              <p className={styles.h}>Más</p>
              {CATEGORIES.slice(4).map((c) => (
                <Link key={c.slug} href={`/${c.slug}`} className={styles.link}>
                  {c.name}
                </Link>
              ))}
            </div>
            <div>
              <p className={styles.h}>Sitio</p>
              {FOOTER_EXTRA.map((l) => (
                <Link key={l.href} href={l.href} className={styles.link}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.base}>
          <p>Hecho en {SITE.city}</p>
          <p>Información general. No es asesoría financiera personalizada.</p>
        </div>
      </div>
    </footer>
  );
}
