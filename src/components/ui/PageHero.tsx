import type { ReactNode } from "react";
import { Breadcrumb, type Crumb } from "./Breadcrumb";
import styles from "./PageHero.module.css";

/** Server Component. Shared hero for every interior route. */
export function PageHero({
  eyebrow,
  title,
  intro,
  trail,
  tone = "blue",
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  trail: Crumb[];
  tone?: "blue" | "green" | "red";
  children?: ReactNode;
}) {
  return (
    <header className={`${styles.hero} ${styles[tone]}`}>
      <div className="shell">
        <Breadcrumb trail={trail} />
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1 className={`h1 ${styles.title}`}>{title}</h1>
        {intro ? <p className={`sub ${styles.intro}`}>{intro}</p> : null}
        {children}
      </div>
    </header>
  );
}
