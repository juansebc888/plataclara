"use client";

import { useEffect, useRef } from "react";
import styles from "./Pictogram.module.css";

/**
 * Ten dots, `filled` of them lit. Counting beats a percentage for a
 * reader who is not comfortable with decimals.
 *
 * The stagger is a pure CSS transition-delay; JS only sets one
 * attribute when the row scrolls into view.
 */
export function Pictogram({
  filled,
  tone,
}: {
  filled: number;
  tone: "red" | "amber";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            el.dataset.on = "true";
            io.disconnect();
          }
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={styles.picto}
      role="img"
      aria-label={`${filled} de cada 10`}
    >
      {Array.from({ length: 10 }, (_, i) => (
        <span
          key={i}
          className={`${styles.dot} ${i < filled ? styles[tone] : ""}`}
          style={{ transitionDelay: `${i * 50}ms` }}
        />
      ))}
    </div>
  );
}
