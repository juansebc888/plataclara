import Link from "next/link";
import { ArrowRight } from "./Icon";
import styles from "./NextStep.module.css";

/** Server Component. "¿También te preguntas…?" links to related pages. */
export function NextStep({
  links,
}: {
  links: { href: string; title: string }[];
}) {
  return (
    <nav
      className={`shell ${styles.wrap}`}
      aria-label="Otras preguntas"
      data-noprint=""
    >
      <h2 className={styles.head}>¿También te preguntas…?</h2>
      <ul className={styles.list}>
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} prefetch={false} className={styles.card}>
              <span className={styles.title}>{l.title}</span>
              <ArrowRight size={22} />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
