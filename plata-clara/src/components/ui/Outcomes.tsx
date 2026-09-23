import styles from "./Outcomes.module.css";

/**
 * Server Component. Sits directly under the page hero and answers the
 * only question the reader has on arrival: is this page worth my time?
 *
 * Each item is written as something the reader will be able to DO, not
 * a topic they will have read about.
 */
export function Outcomes({ items }: { items: string[] }) {
  return (
    <aside className={styles.box} aria-labelledby="outcomes-title">
      <p className={styles.title} id="outcomes-title">
        Al terminar esta página vas a saber
      </p>
      <ul className={styles.list}>
        {items.map((t) => (
          <li key={t}>
            <span className={styles.dot} aria-hidden="true" />
            {t}
          </li>
        ))}
      </ul>
    </aside>
  );
}
