import Link from "next/link";
import { ArrowRight } from "./Icon";
import styles from "./CTA.module.css";

/**
 * Server Component. Closing call to action, shared by every subpage.
 * A dark card on a paper band, so it never melts into the dark footer.
 */
export function CTA({
  title,
  body,
  href,
  label,
}: {
  title: string;
  body: string;
  href: string;
  label: string;
}) {
  return (
    <section className={styles.cta}>
      <div className="shell">
        <div className={styles.inner} data-tone="dark">
          <div>
            <h2 className="h2 h2-light">{title}</h2>
            <p className={styles.body}>{body}</p>
          </div>
          <Link href={href} className={`btn ${styles.btn}`}>
            {label}
            <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
