"use client";

import { useEffect, useMemo, useReducer } from "react";
import { RATES, futureValue } from "@/lib/finance";
import { money, percent } from "@/lib/format";
import styles from "./Calculator.module.css";

type Freq = "dia" | "semana" | "mes";

const FREQS: { key: Freq; label: string; perYear: number }[] = [
  { key: "dia", label: "cada día", perYear: 365 },
  { key: "semana", label: "cada semana", perYear: 52 },
  { key: "mes", label: "cada mes", perYear: 12 },
];

const PRESETS: Record<Freq, number[]> = {
  dia: [2000, 5000, 10000],
  semana: [10000, 20000, 50000],
  mes: [50000, 100000, 200000],
};

const YEARS = [1, 3, 5, 10] as const;

type State = {
  amount: number;
  freq: Freq;
  years: number;
  step: number;
  running: boolean;
};

type Action =
  | { type: "amount"; value: number }
  | { type: "freq"; value: Freq }
  | { type: "years"; value: number }
  | { type: "tick" }
  | { type: "start" };

const STEPS = 60;

function reducer(s: State, a: Action): State {
  switch (a.type) {
    case "amount":
      return { ...s, amount: a.value, step: 0, running: true };
    case "freq":
      // Moving to a new frequency, the old amount is meaningless.
      return { ...s, freq: a.value, amount: PRESETS[a.value][1], step: 0, running: true };
    case "years":
      return { ...s, years: a.value, step: 0, running: true };
    case "start":
      return { ...s, step: 0, running: true };
    case "tick": {
      const next = Math.min(STEPS, s.step + 1);
      return { ...s, step: next, running: next < STEPS };
    }
  }
}

/**
 * Client Component, lazy-loaded.
 *
 * The animation runs on a fixed 60-frame budget regardless of the time
 * horizon, so a 10-year projection costs exactly what a 1-year one
 * does on a slow device.
 */
export function AhorroCalculator() {
  const [s, dispatch] = useReducer(reducer, {
    amount: 5000,
    freq: "dia",
    years: 1,
    step: 0,
    running: false,
  });

  useEffect(() => {
    const t = setTimeout(() => dispatch({ type: "start" }), 400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!s.running) return;
    const t = setTimeout(() => dispatch({ type: "tick" }), 26);
    return () => clearTimeout(t);
  }, [s.running, s.step]);

  const freq = FREQS.find((f) => f.key === s.freq)!;
  const totalPeriods = Math.round(freq.perYear * s.years);
  const rate = useMemo(
    () => Math.pow(1 + RATES.cdtEA, 1 / freq.perYear) - 1,
    [freq.perYear]
  );

  const shown = Math.round((s.step / STEPS) * totalPeriods);
  const saved = s.amount * shown;
  const invested = futureValue(s.amount, rate, shown);

  const finalSaved = s.amount * totalPeriods;
  const finalInvested = futureValue(s.amount, rate, totalPeriods);
  const gap = finalInvested - finalSaved;
  const max = finalInvested || 1;

  const elapsedYears = (shown / freq.perYear).toFixed(1).replace(".", ",");

  return (
    <figure className={styles.card}>
      <figcaption className={styles.head}>
        <div className={styles.row}>
          <p className={styles.q}>Guardo</p>
          <div className={styles.picks} role="group" aria-label="Cada cuánto guardas">
            {FREQS.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => dispatch({ type: "freq", value: f.key })}
                aria-pressed={f.key === s.freq}
                className={`${styles.pick} ${f.key === s.freq ? styles.on : ""}`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.amountRow}>
          <label className={styles.amountLabel} htmlFor="pc-monto">
            <span className={styles.peso}>$</span>
            <input
              id="pc-monto"
              className={styles.amountInput}
              type="text"
              inputMode="numeric"
              value={s.amount.toLocaleString("es-CO")}
              aria-label="Cuánto guardas cada vez"
              onChange={(e) => {
                const n = Number(e.target.value.replace(/\D/g, ""));
                if (!Number.isNaN(n) && n <= 100_000_000) {
                  dispatch({ type: "amount", value: n });
                }
              }}
            />
          </label>
          <div className={styles.picks}>
            {PRESETS[s.freq].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => dispatch({ type: "amount", value: p })}
                aria-pressed={p === s.amount}
                className={`${styles.pick} ${p === s.amount ? styles.on : ""}`}
              >
                {money(p)}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.row}>
          <p className={`${styles.q} ${styles.qMute}`}>Durante</p>
          <div className={styles.picks} role="group" aria-label="Por cuánto tiempo">
            {YEARS.map((y) => (
              <button
                key={y}
                type="button"
                onClick={() => dispatch({ type: "years", value: y })}
                aria-pressed={y === s.years}
                className={`${styles.pick} ${y === s.years ? styles.on : ""}`}
              >
                {y} {y === 1 ? "año" : "años"}
              </button>
            ))}
          </div>
        </div>
      </figcaption>

      <p className={styles.elapsed}>
        Después de {elapsedYears} {elapsedYears === "1,0" ? "año" : "años"}
      </p>

      <div className={styles.bars}>
        <Bar
          name="Guardado en la casa"
          hint="Sin ganar nada"
          amount={saved}
          pct={(saved / max) * 100}
          variant="flat"
        />
        <Bar
          name="En un CDT"
          hint={`~${percent(RATES.cdtEA)} al año`}
          amount={invested}
          pct={(invested / max) * 100}
          variant="grow"
        />
      </div>

      <p className={styles.foot}>
        Con {money(s.amount)} {freq.label}, en {s.years}{" "}
        {s.years === 1 ? "año" : "años"} juntas{" "}
        <strong className={styles.neutral}>{money(finalSaved)}</strong>. En un
        CDT serían <strong>{money(finalInvested)}</strong>, o sea{" "}
        <strong>{money(gap)}</strong> más sin poner un peso adicional.
      </p>

      <p className={styles.warn}>
        Un CDT lo abres en un banco vigilado por la Superfinanciera y te dicen
        la tasa antes de que pongas la plata. Si alguien te promete ganancias
        rápidas o seguras, eso no es una inversión.
      </p>
    </figure>
  );
}

function Bar({
  name,
  hint,
  amount,
  pct,
  variant,
}: {
  name: string;
  hint: string;
  amount: number;
  pct: number;
  variant: "flat" | "grow";
}) {
  return (
    <div className={styles.barRow}>
      <div className={styles.barTop}>
        <p className={styles.barName}>
          {name}
          <span>{hint}</span>
        </p>
        <p className={`${styles.barAmt} ${variant === "grow" ? styles.good : ""}`}>
          {money(amount)}
        </p>
      </div>
      <div className={styles.track}>
        <div
          className={`${styles.fill} ${styles[variant]}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
