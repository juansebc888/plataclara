"use client";

import { useState } from "react";
import { RATES, compound } from "@/lib/finance";
import { money, percent } from "@/lib/format";
import styles from "./Calculator.module.css";

const PRINCIPALS = [200000, 500000, 1000000] as const;

/**
 * Client Component, lazy-loaded. No animation loop: the reader
 * changes the amount and the numbers update. Cheap on any device.
 */
export function GotaAGotaCalculator() {
  const [principal, setPrincipal] = useState<number>(500000);

  const gota = compound(principal, RATES.gotaMonthly, 12);
  const formal = compound(principal, RATES.formalMonthly, 12);
  const max = gota || 1;

  return (
    <figure className={styles.card}>
      <figcaption className={styles.head}>
        <div className={styles.row}>
          <p className={styles.q}>Si pides prestado</p>
          <div className={styles.picks} role="group" aria-label="Cuánto pides prestado">
            {PRINCIPALS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPrincipal(p)}
                aria-pressed={p === principal}
                className={`${styles.pick} ${p === principal ? styles.on : ""}`}
              >
                {money(p)}
              </button>
            ))}
          </div>
        </div>
        <p className={`${styles.q} ${styles.qMute}`}>
          Esto es lo que deberías al cabo de un año
        </p>
      </figcaption>

      <div className={styles.bars}>
        <div className={styles.barRow}>
          <div className={styles.barTop}>
            <p className={styles.barName}>
              Gota a gota
              <span>{percent(RATES.gotaMonthly, 0)} cada mes</span>
            </p>
            <p className={`${styles.barAmt} ${styles.bad}`}>{money(gota)}</p>
          </div>
          <div className={styles.track}>
            <div
              className={`${styles.fill} ${styles.danger}`}
              style={{ width: `${(gota / max) * 100}%` }}
            />
          </div>
        </div>

        <div className={styles.barRow}>
          <div className={styles.barTop}>
            <p className={styles.barName}>
              Microcrédito formal
              <span>~{percent(RATES.formalMonthly)} cada mes</span>
            </p>
            <p className={`${styles.barAmt} ${styles.good}`}>{money(formal)}</p>
          </div>
          <div className={styles.track}>
            <div
              className={`${styles.fill} ${styles.grow}`}
              style={{ width: `${(formal / max) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <p className={styles.foot}>
        Por los mismos {money(principal)} terminarías pagando{" "}
        <strong className={styles.badText}>{money(gota - formal)}</strong> de
        más. No es que el gota a gota cobre un poco más caro: cobra varias veces
        el valor de lo que prestó.
      </p>

      <p className={styles.warn}>
        La tasa del gota a gota varía y casi nunca se dice en voz alta. Aquí
        usamos {percent(RATES.gotaMonthly, 0)} mensual, una cifra común en la
        práctica. Si a ti te cobran distinto, el cálculo cambia — pero el patrón
        es el mismo.
      </p>
    </figure>
  );
}
