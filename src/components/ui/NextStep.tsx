import Link from "next/link";
import { ArrowRight } from "./Icon";
import styles from "./NextStep.module.css";

/** Server Component. "Paso N de 5" row that keeps the sequence honest. */
export function NextStep({
  step,
  total = 5,
  href,
  title,
}: {
  step: number;
  total?: number;
  href: string;
  title: string;
}) {
  return (
    <div className={`shell ${styles.wrap}`} data-noprint="">
      <Link href={href} className={styles.card}>
        <span>
          <span className={styles.label}>
            Siguiente · Paso {step} de {total}
          </span>
          <span className={styles.title}>{title}</span>
        </span>
        <ArrowRight size={22} />
      </Link>
    </div>
  );
}
