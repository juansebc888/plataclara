import Link from "next/link";
import { QUESTIONS } from "@/content/home";
import { Reveal } from "./Reveal";
import styles from "./Questions.module.css";

const VISIBLE = 5;

function Bubble({ q }: { q: (typeof QUESTIONS)[number] }) {
  return (
    <li>
      <Link href={q.href} className={styles.bubble}>
        <span className={styles.q}>«{q.q}»</span>
        <span className={styles.to}>→ {q.page}</span>
      </Link>
    </li>
  );
}

/**
 * Server Component, no JS. The questions people actually ask, in their
 * own words, as the human entry point to every topic. Only the heading
 * reveals on scroll: the list itself is always visible.
 */
export function Questions({
  title = "¿Te suena alguna de estas?",
  as: H = "h2",
}: {
  title?: string;
  as?: "h2" | "h3";
}) {
  const first = QUESTIONS.slice(0, VISIBLE);
  const rest = QUESTIONS.slice(VISIBLE);
  return (
    <div>
      <Reveal>
        <p className="eyebrow">En tus palabras</p>
        <H className="h2">{title}</H>
      </Reveal>
      <ul className={styles.list}>
        {first.map((q) => (
          <Bubble key={q.href + q.q} q={q} />
        ))}
        {/* Wider screens show everything; phones fold the rest away. */}
        {rest.map((q) => (
          <Bubble key={q.href + q.q} q={q} />
        ))}
      </ul>
      {rest.length ? (
        <details className={styles.fold}>
          <summary className="btn btn-ghost">Ver más preguntas</summary>
          <ul className={styles.list}>
            {rest.map((q) => (
              <Bubble key={q.href + q.q} q={q} />
            ))}
          </ul>
        </details>
      ) : null}
    </div>
  );
}
