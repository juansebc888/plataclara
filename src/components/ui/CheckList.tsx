import styles from "./CheckList.module.css";

export type CheckItem = { text: string; note?: string };

/**
 * Server Component. Two-column yes/no list. The "no" column exists
 * because for this reader the false requirements are the actual
 * barrier — not the real ones.
 */
export function CheckList({
  yes,
  no,
  yesLabel = "Lo que sí necesitas",
  noLabel = "Lo que no necesitas",
}: {
  yes: CheckItem[];
  no: CheckItem[];
  yesLabel?: string;
  noLabel?: string;
}) {
  return (
    <div className={styles.wrap}>
      <div className={`${styles.col} ${styles.yes}`}>
        <p className={styles.head}>{yesLabel}</p>
        <ul className={styles.list}>
          {yes.map((i) => (
            <li key={i.text}>
              <span className={styles.markYes} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m5 13 4 4L19 7" />
                </svg>
              </span>
              <span>
                <strong>{i.text}</strong>
                {i.note ? <em>{i.note}</em> : null}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className={`${styles.col} ${styles.no}`}>
        <p className={styles.head}>{noLabel}</p>
        <ul className={styles.list}>
          {no.map((i) => (
            <li key={i.text}>
              <span className={styles.markNo} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </span>
              <span>
                <strong>{i.text}</strong>
                {i.note ? <em>{i.note}</em> : null}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
