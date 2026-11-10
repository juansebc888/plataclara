"use client";

import dynamic from "next/dynamic";
import styles from "./Skeleton.module.css";

/**
 * Placeholders sized like the real component (see Skeleton.module.css),
 * so nothing below jumps when the calculator arrives.
 */
const skeleton = (size: string) => {
  const Placeholder = () => (
    <div className={`${styles.skeleton} ${styles[size]}`} aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  );
  Placeholder.displayName = `Skeleton(${size})`;
  return Placeholder;
};

/** Full savings calculator, for /herramientas/ahorro. */
export const LazyAhorro = dynamic(
  () => import("./AhorroCalculator").then((m) => m.AhorroCalculator),
  { ssr: false, loading: skeleton("ahorro") }
);

/** Compact savings calculator for the home hero: `<LazyAhorroHome />`. */
export const LazyAhorroHome = dynamic(
  () => import("./AhorroCalculator").then((m) => m.AhorroHome),
  { ssr: false, loading: skeleton("home") }
);

export const LazyGotaAGota = dynamic(
  () => import("./GotaAGotaCalculator").then((m) => m.GotaAGotaCalculator),
  { ssr: false, loading: skeleton("gota") }
);

export const LazyPlan = dynamic(
  () => import("./PlanBuilder").then((m) => m.PlanBuilder),
  { ssr: false, loading: skeleton("plan") }
);
