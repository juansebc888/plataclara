"use client";

import dynamic from "next/dynamic";
import styles from "./Skeleton.module.css";

const Skeleton = () => (
  <div className={styles.skeleton} aria-hidden="true">
    <span />
    <span />
    <span />
  </div>
);

/**
 * Both calculators are code-split. They sit below the fold on every
 * page that uses them, so nothing about them blocks first paint.
 */
export const LazyAhorro = dynamic(
  () => import("./AhorroCalculator").then((m) => m.AhorroCalculator),
  { ssr: false, loading: Skeleton }
);

export const LazyGotaAGota = dynamic(
  () => import("./GotaAGotaCalculator").then((m) => m.GotaAGotaCalculator),
  { ssr: false, loading: Skeleton }
);

export const LazyPlan = dynamic(
  () => import("./PlanBuilder").then((m) => m.PlanBuilder),
  { ssr: false, loading: Skeleton }
);
