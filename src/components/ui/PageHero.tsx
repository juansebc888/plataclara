import type { ReactNode } from "react";
import Link from "next/link";
import styles from "./PageHero.module.css";

export type Crumb = { href?: string; label: string };

/**
 * Server Component. Shared hero for every interior route.
 * Order on phones: back link, title, the plain answer, then any
 * children, and the picture last (small) so it never pushes the
 * answer off the first screen.
 */
export function PageHero({
  eyebrow,
  title,
  answer,
  intro,
  trail = [],
  art,
  children,
}: {
  eyebrow?: string;
  title: string;
  /** The page's main question, answered in 1–2 short sentences. */
  answer?: ReactNode;
  intro?: ReactNode;
  trail?: Crumb[];
  /** Kept for compatibility; heroes no longer use tinted washes. */
  tone?: "blue" | "green" | "red";
  children?: ReactNode;
  art?: ReactNode;
}) {
  // Nested pages go back to their parent; everything else to Inicio.
  const parent = [...trail].reverse().find((c) => c.href);
  const back = parent
    ? { href: parent.href!, label: parent.label }
    : { href: "/", label: "Inicio" };
  return (
    <header className={styles.hero}>
      <div className={`shell ${art ? styles.withArt : ""}`}>
        <div>
          <Link href={back.href} prefetch={false} className={styles.back}>
            ← {back.label}
          </Link>
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h1 className={`h1 ${styles.title}`}>{title}</h1>
          {answer ? <div className={styles.answer}>{answer}</div> : null}
          {intro ? <p className={`sub ${styles.intro}`}>{intro}</p> : null}
          {children}
        </div>
        {art ? (
          <div className={styles.art} aria-hidden="true">
            {art}
          </div>
        ) : null}
      </div>
    </header>
  );
}
