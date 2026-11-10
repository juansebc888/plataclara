const CO = new Intl.NumberFormat("es-CO", { maximumFractionDigits: 0 });

/** "$1.234", "-$1.234". Rounds half away from zero and never prints "-$0". */
export const money = (n: number): string => {
  if (!Number.isFinite(n)) return "$0";
  const r = Math.round(Math.abs(n));
  if (r === 0) return "$0";
  return (n < 0 ? "-$" : "$") + CO.format(r);
};

const PCT = new Map<number, Intl.NumberFormat>();

/**
 * 0.105 → "10,5%". Intl rounds the decimal value correctly, unlike
 * `toFixed` on binary floats (0.01005 → "1,01%", not "1,00%").
 */
export const percent = (n: number, digits = 1): string => {
  if (!Number.isFinite(n)) return "—";
  let f = PCT.get(digits);
  if (!f) {
    f = new Intl.NumberFormat("es-CO", {
      style: "percent",
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    });
    PCT.set(digits, f);
  }
  // es-CO puts a (non-breaking) space before "%"; the site writes "10,5%".
  const out = f.format(n).replace(/\s/g, "");
  return /^-0(,0*)?%$/.test(out) ? out.slice(1) : out;
};

export type ParsedAmount = {
  /** Whole pesos, ≥ 0. */
  value: number;
  /** The text had a minus sign, which was ignored. */
  negative: boolean;
  /** Nothing usable was typed. */
  empty: boolean;
};

/**
 * Reads an amount the way a Colombian writes it: "." and spaces group
 * thousands, "," starts the cents (dropped), "$" is ignored.
 * "1.500,50" → 1500, "$ 20.000" → 20000, "-500" → 500 (flagged).
 */
export function parseAmount(text: string): ParsedAmount {
  const negative = /^\s*\$?\s*-/.test(text) || /^\s*-/.test(text);
  const whole = text.split(",")[0];
  const digits = whole.replace(/\D/g, "").replace(/^0+(?=\d)/, "");
  return {
    value: digits ? Number(digits) : 0,
    negative,
    empty: digits === "",
  };
}
