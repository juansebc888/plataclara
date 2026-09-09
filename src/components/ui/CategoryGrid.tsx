import Link from "next/link";
import { CATEGORIES } from "@/content/categories";
import { Reveal } from "./Reveal";
import { ArrowUpRight, Icon } from "./Icon";
import styles from "./CategoryGrid.module.css";

/** Server Component. Only <Reveal> crosses into the client. */
export function CategoryGrid({ exclude }: { exclude?: string }) {
  const items = exclude
    ? CATEGORIES.filter((c) => c.slug !== exclude)
    : CATEGORIES;

  return (
    <div className={styles.grid}>
      {items.map((c, i) => (
        <Reveal key={c.slug} delay={i * 60}>
          <Link
            href={`/${c.slug}`}
            className={`${styles.tile} ${styles[c.tone]}`}
          >
            <span className={styles.icon}>
              <Icon name={c.icon} />
            </span>
            <h3 className={`h3 ${styles.title}`}>{c.name}</h3>
            <p className={styles.desc}>{c.desc}</p>
            <span className={styles.action}>
              {c.action}
              <ArrowUpRight />
            </span>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
