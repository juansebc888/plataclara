import styles from "./Pictogram.module.css";

/**
 * Server Component. Ten dots, `filled` of them marked. A countable
 * proportion reads more easily than a percentage.
 */
export function Pictogram({
  filled,
  tone,
}: {
  filled: number;
  tone: "red" | "amber";
}) {
  return (
    <div className={styles.picto} role="img" aria-label={`${filled} de cada 10`}>
      {Array.from({ length: 10 }, (_, i) => (
        <span
          key={i}
          className={`${styles.dot} ${i < filled ? styles[tone] : ""}`}
        />
      ))}
    </div>
  );
}
