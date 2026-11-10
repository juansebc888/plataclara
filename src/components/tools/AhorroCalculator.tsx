"use client";

import Link from "next/link";
import {
  type ReactNode,
  useEffect,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { RATES, REFERENCE, simulateCdtSavings } from "@/lib/finance";
import { money, parseAmount, percent } from "@/lib/format";
import styles from "./Calculator.module.css";

type Freq = "dia" | "semana" | "mes";

const FREQS: { key: Freq; label: string; perYear: number; max: number }[] = [
  // The caps keep the projection inside what a reader of this site could
  // plausibly put away; above them the figures stop meaning anything.
  { key: "dia", label: "cada día", perYear: 365, max: 500_000 },
  { key: "semana", label: "cada semana", perYear: 52, max: 2_500_000 },
  { key: "mes", label: "cada mes", perYear: 12, max: 10_000_000 },
];

const PRESETS: Record<Freq, number[]> = {
  dia: [2000, 5000, 10000],
  semana: [10000, 20000, 50000],
  mes: [50000, 100000, 200000],
};

const YEARS = [1, 3, 5, 10] as const;
/** The home variant shows one fixed horizon. */
const HOME_YEARS = 3;

type Params = { amount: number; freq: Freq; years: number };

type State = Params & {
  step: number;
  running: boolean;
  reduce: boolean;
  /** What the summary sentence describes; set when the animation ends. */
  settled: Params;
};

type Action =
  | { type: "amount"; value: number }
  | { type: "freq"; value: Freq }
  | { type: "years"; value: number }
  | { type: "tick" }
  | { type: "start" }
  | { type: "motion"; reduce: boolean };

const STEPS = 60;

const params = (s: Params): Params => ({
  amount: s.amount,
  freq: s.freq,
  years: s.years,
});

/** Restart the animation, or jump straight to the end under reduced motion. */
function restart(s: State): State {
  if (s.reduce) {
    return { ...s, step: STEPS, running: false, settled: params(s) };
  }
  return { ...s, step: 0, running: true };
}

function reducer(s: State, a: Action): State {
  switch (a.type) {
    case "amount":
      return restart({ ...s, amount: a.value });
    case "freq":
      // Moving to a new frequency, the old amount is meaningless.
      return restart({ ...s, freq: a.value, amount: PRESETS[a.value][1] });
    case "years":
      return restart({ ...s, years: a.value });
    case "start":
      return restart(s);
    case "motion":
      return a.reduce
        ? { ...s, reduce: true, step: STEPS, running: false, settled: params(s) }
        : { ...s, reduce: false };
    case "tick": {
      const next = Math.min(STEPS, s.step + 1);
      const done = next >= STEPS;
      return {
        ...s,
        step: next,
        running: !done,
        settled: done ? params(s) : s.settled,
      };
    }
  }
}

const yearsLabel = (y: number): string => {
  if (Number.isInteger(y)) return `${y} ${y === 1 ? "año" : "años"}`;
  return `${y.toFixed(1).replace(".", ",")} años`;
};

function project(p: Params) {
  const freq = FREQS.find((f) => f.key === p.freq)!;
  const periods = Math.round(freq.perYear * p.years);
  const series = simulateCdtSavings({
    deposit: p.amount,
    periodsPerYear: freq.perYear,
    periods,
  });
  return { freq, periods, series, final: series[periods] };
}

/** The shortest offered horizon longer than `p.years` that shows a gain. */
function longerWithGain(p: Params): number | undefined {
  return YEARS.find((y) => {
    if (y <= p.years) return false;
    const { final } = project({ ...p, years: y });
    return final.withCdt - final.saved >= 1;
  });
}

/**
 * Client Component, lazy-loaded.
 *
 * Compares keeping the money at home with what actually happens when
 * you move it to CDTs: a CDT takes a lump sum (there is a minimum),
 * pays interest only when it matures a year later, and the bank keeps
 * a withholding tax on that interest. See `simulateCdtSavings`.
 *
 * The animation runs on a fixed 60-frame budget regardless of the time
 * horizon, so a 10-year projection costs exactly what a 1-year one
 * does on a slow device. Under `prefers-reduced-motion` it is skipped.
 *
 * `variant="home"`: one question, three big buttons, daily, 3 years.
 */
export function AhorroCalculator({
  variant = "full",
}: {
  variant?: "home" | "full";
}) {
  const home = variant === "home";
  const [s, dispatch] = useReducer(reducer, undefined, () => {
    const initial: Params = {
      amount: 5000,
      freq: "dia",
      // One year shows no gain on purpose (no CDT has matured yet), but it
      // makes a poor first impression; three years shows the mechanism.
      years: HOME_YEARS,
    };
    return { ...initial, step: 0, running: false, reduce: false, settled: initial };
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => dispatch({ type: "motion", reduce: mq.matches });
    if (mq.matches) {
      onChange();
    }
    mq.addEventListener("change", onChange);
    const t = mq.matches
      ? undefined
      : setTimeout(() => dispatch({ type: "start" }), 400);
    return () => {
      mq.removeEventListener("change", onChange);
      if (t) clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    if (!s.running) return;
    const t = setTimeout(() => dispatch({ type: "tick" }), 26);
    return () => clearTimeout(t);
  }, [s.running, s.step]);

  const { freq, periods: totalPeriods, series, final } = useMemo(
    () => project({ amount: s.amount, freq: s.freq, years: s.years }),
    [s.amount, s.freq, s.years]
  );

  const shown = Math.round((s.step / STEPS) * totalPeriods);
  const { saved, withCdt: invested } = series[shown];
  const max = Math.max(final.withCdt, final.saved) || 1;

  const bars = (
    <div className={styles.bars}>
      <Bar
        name="Guardado en la casa"
        hint="Sin ganar nada"
        amount={saved}
        pct={(saved / max) * 100}
        variant="flat"
      />
      <Bar
        name="Pasándolo a CDTs"
        hint={`~${percent(RATES.cdtEA)} al año, desde ${money(REFERENCE.cdtMinimoDigital)}`}
        amount={invested}
        pct={(invested / max) * 100}
        variant="grow"
      />
    </div>
  );

  if (home) {
    return (
      <div
        className={`${styles.card} ${styles.homeCard}`}
        role="group"
        aria-labelledby="pc-home-q"
      >
        <p className={styles.homeQ} id="pc-home-q">
          ¿Cuánto puedes guardar al día?
        </p>
        <div
          className={styles.homePicks}
          role="group"
          aria-labelledby="pc-home-q"
        >
          {PRESETS.dia.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => dispatch({ type: "amount", value: p })}
              aria-pressed={p === s.amount}
              className={`${styles.homePick} ${p === s.amount ? styles.on : ""}`}
            >
              {money(p)}
            </button>
          ))}
        </div>

        <p className={styles.elapsed}>En {yearsLabel(HOME_YEARS)}:</p>
        {bars}

        <HomeSummary settled={s.settled} />

        <p className={styles.homeMore}>
          <Link href="/herramientas/ahorro">
            Cambiar cada cuánto y por cuánto tiempo →
          </Link>
        </p>
        <p className={styles.homeNote}>
          Las cifras ya descuentan la retención en la fuente.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.card} role="group" aria-label="Calculadora de ahorro">
      <div className={styles.head}>
        <div className={styles.row}>
          <p className={styles.q} id="pc-freq">
            Guardo
          </p>
          <div className={styles.picks} role="group" aria-labelledby="pc-freq">
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

        <AmountField
          amount={s.amount}
          max={freq.max}
          freqLabel={freq.label}
          onChange={(value) => dispatch({ type: "amount", value })}
        >
          <div
            className={styles.picks}
            role="group"
            aria-label="Montos sugeridos"
          >
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
        </AmountField>

        <div className={styles.row}>
          <p className={styles.q} id="pc-years">
            Durante
          </p>
          <div className={styles.picks} role="group" aria-labelledby="pc-years">
            {YEARS.map((y) => (
              <button
                key={y}
                type="button"
                onClick={() => dispatch({ type: "years", value: y })}
                aria-pressed={y === s.years}
                className={`${styles.pick} ${y === s.years ? styles.on : ""}`}
              >
                {yearsLabel(y)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className={styles.elapsed} aria-hidden="true">
        Después de {yearsLabel(Math.round((shown / freq.perYear) * 10) / 10)}
      </p>

      {bars}

      <FullSummary settled={s.settled} />

      <p className={styles.warn}>
        Un CDT lo abres en un banco vigilado por la Superfinanciera y te dicen
        la tasa antes de que pongas la plata. Si alguien te promete ganancias
        rápidas o seguras, eso no es una inversión. Las cifras ya descuentan la
        retención en la fuente ({percent(RATES.retencionCDT, 0)} de los
        intereses).
      </p>
    </div>
  );
}

/** Same calculator, preset for the home hero. */
export function AhorroHome() {
  return <AhorroCalculator variant="home" />;
}

function HomeSummary({ settled }: { settled: Params }) {
  const { final } = project(settled);
  return (
    <p className={styles.homeResult} aria-live="polite">
      Guardando {money(settled.amount)} al día juntas{" "}
      <strong className={styles.num}>{money(final.saved)}</strong>. Pasándolo a
      CDTs,{" "}
      <strong className={`${styles.num} ${styles.good}`}>
        {money(final.withCdt)}
      </strong>
      .
    </p>
  );
}

function FullSummary({ settled }: { settled: Params }) {
  const { freq, final } = project(settled);
  const gap = final.withCdt - final.saved;
  const min = REFERENCE.cdtMinimoDigital;
  const longer = longerWithGain(settled);
  const tryLonger = longer ? <> Prueba con {yearsLabel(longer)}.</> : null;

  let body: ReactNode;
  if (settled.amount <= 0) {
    body = <>Escribe cuánto puedes guardar cada vez para ver la cuenta.</>;
  } else {
    const intro = (
      <>
        Con {money(settled.amount)} {freq.label}, en {yearsLabel(settled.years)}{" "}
        juntas <strong className={styles.num}>{money(final.saved)}</strong>.{" "}
      </>
    );
    if (gap >= 1) {
      body = (
        <>
          {intro}
          Si cada vez que juntas {money(min)} los pasas a un CDT a un año,
          tendrías{" "}
          <strong className={`${styles.num} ${styles.good}`}>
            {money(final.withCdt)}
          </strong>
          , o sea{" "}
          <strong className={`${styles.num} ${styles.good}`}>{money(gap)}</strong>{" "}
          más sin poner un peso adicional.
        </>
      );
    } else if (final.saved < min) {
      body = (
        <>
          {intro}
          Con esto no alcanzas a juntar el mínimo de {money(min)} para abrir un
          CDT.{tryLonger}
        </>
      );
    } else {
      body = (
        <>
          {intro}
          Un CDT paga los intereses cuando se cumple el año, así que en este
          plazo todavía no ha vencido ninguno.{tryLonger}
        </>
      );
    }
  }

  return (
    <p className={styles.foot} aria-live="polite">
      {body}
    </p>
  );
}

const fmt = (n: number) => n.toLocaleString("es-CO");

/** Index in `text` just after its `k`-th digit (0 → start). */
function caretAfterDigits(text: string, k: number): number {
  if (k <= 0) return 0;
  let seen = 0;
  for (let i = 0; i < text.length; i++) {
    if (/\d/.test(text[i]) && ++seen === k) return i + 1;
  }
  return text.length;
}

/**
 * Free-text amount, always shown as "100.000". Editing works on the
 * digits: deleting a thousands dot deletes the digit next to it, a
 * pasted "1.500,50" reads as 1500, and the caret stays on the same
 * digit after the dots move.
 */
function AmountField({
  amount,
  max,
  freqLabel,
  onChange,
  children,
}: {
  amount: number;
  max: number;
  freqLabel: string;
  onChange: (n: number) => void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLInputElement>(null);
  /** Caret, in digits from the left, to restore after React rewrites the value. */
  const caret = useRef<number | null>(null);
  const [cleared, setCleared] = useState(false);
  const [note, setNote] = useState<{ text: string; for: number } | null>(null);
  // A preset or frequency change makes an old hint wrong; drop it.
  const hint = note && note.for === amount ? note.text : null;

  useLayoutEffect(() => {
    const el = ref.current;
    if (caret.current !== null && el && document.activeElement === el) {
      const pos = caretAfterDigits(el.value, caret.current);
      el.setSelectionRange(pos, pos);
    }
    caret.current = null;
  });

  const value = cleared && amount === 0 ? "" : fmt(amount);

  return (
    <div className={styles.amountRow}>
      <label className={styles.amountHelp} htmlFor="pc-monto">
        Escribe cuánto guardas cada vez
      </label>
      <div className={styles.amountLabel}>
        <span className={styles.peso} aria-hidden="true">
          $
        </span>
        <input
          ref={ref}
          id="pc-monto"
          className={styles.amountInput}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          placeholder="0"
          value={value}
          aria-describedby={hint ? "pc-monto-hint" : undefined}
          onChange={(e) => {
            let raw = e.target.value;
            let sel = e.target.selectionStart ?? raw.length;
            const inputType = (e.nativeEvent as InputEvent).inputType ?? "";
            const digits = (t: string) => t.split(",")[0].replace(/\D/g, "");

            // Only a dot went away: take the digit beside it instead.
            if (
              inputType.startsWith("delete") &&
              raw.length < value.length &&
              digits(raw) === digits(value)
            ) {
              if (inputType === "deleteContentForward") {
                const i = raw.slice(sel).search(/\d/);
                if (i >= 0) raw = raw.slice(0, sel + i) + raw.slice(sel + i + 1);
              } else {
                const left = raw.slice(0, sel);
                const i = left.search(/\d[^\d]*$/);
                if (i >= 0) {
                  raw = raw.slice(0, i) + raw.slice(i + 1);
                  sel = i;
                }
              }
            }

            const parsed = parseAmount(raw);
            let before = raw.slice(0, sel).split(",")[0].replace(/\D/g, "").length;
            // Leading zeros are dropped, so they don't count toward the caret.
            const lead = digits(raw).match(/^0+(?=\d)/)?.[0].length ?? 0;
            before = Math.max(0, before - lead);

            let n = parsed.value;
            let next: string | null = null;
            if (parsed.negative) {
              next = "Escribe la cifra sin el signo menos.";
            }
            if (n > max) {
              n = max;
              before = String(max).length;
              next = `Aquí el máximo es ${money(max)} ${freqLabel}.`;
            }
            setNote(next ? { text: next, for: n } : null);
            setCleared(parsed.empty);
            caret.current = before;
            onChange(n);
          }}
        />
      </div>
      {hint ? (
        <p className={styles.amountHint} id="pc-monto-hint" role="status">
          {hint}
        </p>
      ) : null}
      {children}
    </div>
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
      <div className={styles.track} aria-hidden="true">
        <div
          className={`${styles.fill} ${styles[variant]}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
