"use client";

import { useCallback, useEffect, useMemo, useReducer } from "react";
import { RATES, futureValue, weeklyRate } from "@/lib/finance";
import { money, percent } from "@/lib/format";
import styles from "./Calculator.module.css";

const AMOUNTS = [5000, 10000, 20000] as const;
const HORIZONS = [1, 5] as const;

type State = { perWeek: number; years: number; week: number; running: boolean };

type Action =
  | { type: "setAmount"; value: number }
  | { type: "setYears"; value: number }
  | { type: "tick"; total: number; step: number }
  | { type: "start" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "setAmount":
      return { ...state, perWeek: action.value, week: 0, running: true };
    case "setYears":
      return { ...state, years: action.value, week: 0, running: true };
    case "start":
      return { ...state, running: true };
    case "tick": {
      const next = Math.min(action.total, state.week + action.step);
      return { ...state, week: next, running: next < action.total };
    }
  }
}

/**
 * Client Component, lazy-loaded. A reducer keeps the animation to one
 * state update per frame-ish tick rather than several independent
 * setStates, which matters on slow devices.
 */
export function AhorroCalculator() {
  const [state, dispatch] = useReducer(reducer, {
    perWeek: 10000,
    years: 1,
    week: 0,
    running: false,
  });

  const totalWeeks = state.years * 52;
  const iWeek = useMemo(() => weeklyRate(RATES.cdtEA), []);

  useEffect(() => {
    const t = setTimeout(() => dispatch({ type: "start" }), 400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!state.running || state.week >= totalWeeks) return;
    const step = Math.max(1, Math.round(totalWeeks / 55));
    const t = setTimeout(
      () => dispatch({ type: "tick", total: totalWeeks, step }),
      32
    );
    return () => clearTimeout(t);
  }, [state.running, state.week, totalWeeks]);

  const saved = state.perWeek * state.week;
  const invested = futureValue(state.perWeek, iWeek, state.week);

  const finalSaved = state.perWeek * totalWeeks;
  const finalInvested = futureValue(state.perWeek, iWeek, totalWeeks);
  const gap = finalInvested - finalSaved;
  const max = finalInvested || 1;

  const setAmount = useCallback(
    (value: number) => dispatch({ type: "setAmount", value }),
    []
  );
  const setYears = useCallback(
    (value: number) => dispatch({ type: "setYears", value }),
    []
  );

  return (
    <figure className={styles.card}>
      <figcaption className={styles.head}>
        <div className={styles.row}>
          <p className={styles.q}>Si guardas cada semana</p>
          <div className={styles.picks} role="group" aria-label="Cuánto guardas por semana">
            {AMOUNTS.map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => setAmount(a)}
                aria-pressed={a === state.perWeek}
                className={`${styles.pick} ${a === state.perWeek ? styles.on : ""}`}
              >
                {money(a)}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.row}>
          <p className={`${styles.q} ${styles.qMute}`}>Durante</p>
          <div className={styles.picks} role="group" aria-label="Por cuánto tiempo">
            {HORIZONS.map((y) => (
              <button
                key={y}
                type="button"
                onClick={() => setYears(y)}
                aria-pressed={y === state.years}
                className={`${styles.pick} ${y === state.years ? styles.on : ""}`}
              >
                {y} {y === 1 ? "año" : "años"}
              </button>
            ))}
          </div>
        </div>
      </figcaption>

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
        {state.years === 1 ? (
          <>
            En un año la diferencia es de <strong>{money(gap)}</strong>. Poca,
            porque lo que manda al principio es la constancia y no el interés.
            Mira qué pasa a 5 años.
          </>
        ) : (
          <>
            En cinco años la diferencia sube a <strong>{money(gap)}</strong>. Es
            la misma plata guardada: lo único que cambió fue dónde la pusiste.
          </>
        )}
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
