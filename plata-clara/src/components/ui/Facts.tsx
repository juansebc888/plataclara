import { FACTS, FACTS_SOURCE } from "@/content/facts";
import { Reveal } from "./Reveal";
import { Pictogram } from "./Pictogram";
import styles from "./Facts.module.css";

/** Server Component. */
export function Facts() {
  return (
    <section className={styles.facts}>
      <div className="shell">
        <div className={styles.head}>
          <Reveal>
            <p className="eyebrow eyebrow-light">Por qué existe este sitio</p>
            <h2 className="h2 h2-light">
              No es que la gente no sepa manejar su plata.
              <br />
              Es que nunca se la explicaron.
            </h2>
          </Reveal>
        </div>

        <div className={styles.grid}>
          {FACTS.map((f, i) => (
            <Reveal key={f.lead + f.who} delay={i * 100}>
              <div className={styles.fact}>
                <Pictogram filled={f.filled} tone={f.tone} />
                <p className={`${styles.lead} ${styles[f.tone]}`}>
                  {f.lead}
                  <span className={styles.who}>{f.who}</span>
                </p>
                <p className={styles.body}>{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300}>
          <p className={styles.source}>{FACTS_SOURCE}</p>
        </Reveal>
      </div>
    </section>
  );
}
