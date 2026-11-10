import Link from "next/link";
import { QUESTIONS } from "@/content/home";
import styles from "./Questions.module.css";

/**
 * Server Component, no JS. The questions people actually ask, in their
 * own words, as the entry point to every topic. All always visible.
 */
export function Questions({
  title,
  as: H = "h2",
}: {
  title?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <div>
      {title ? <H className="h2">{title}</H> : null}
      <ul className={styles.list}>
        {QUESTIONS.map((q) => (
          <li key={q.href + q.q}>
            <Link href={q.href} prefetch={false} className={styles.bubble}>
              <span className={styles.q}>{q.q}</span>
              <span className={styles.arrow} aria-hidden="true">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
