import Link from "next/link";
import styles from "./Breadcrumb.module.css";

export type Crumb = { href?: string; label: string };

/** Server Component. */
export function Breadcrumb({ trail }: { trail: Crumb[] }) {
  return (
    <nav aria-label="Ruta" className={styles.wrap}>
      <ol className={styles.list}>
        <li>
          <Link href="/">Inicio</Link>
        </li>
        {trail.map((c) => (
          <li key={c.label}>
            <span className={styles.sep} aria-hidden="true">
              /
            </span>
            {c.href ? (
              <Link href={c.href}>{c.label}</Link>
            ) : (
              <span aria-current="page">{c.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
