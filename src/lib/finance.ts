/**
 * Tasas de referencia.
 * VERIFICAR ambas contra fuentes actuales antes de publicar: las tasas de CDT
 * se mueven con las decisiones del Banco de la República.
 */
export const RATES = {
  /** CDT, efectivo anual. */
  cdtEA: 0.085,
  /** Gota a gota, mensual. Cifra común en la práctica, no oficial. */
  gotaMonthly: 0.2,
  /** Microcrédito formal, mensual aproximado. */
  formalMonthly: 0.025,
} as const;

/** Convierte una tasa efectiva anual a su equivalente semanal. */
export const weeklyRate = (annualEA: number): number =>
  Math.pow(1 + annualEA, 1 / 52) - 1;

/** Valor futuro de un depósito constante (anualidad ordinaria). */
export function futureValue(
  deposit: number,
  rate: number,
  periods: number
): number {
  if (periods <= 0) return 0;
  if (rate === 0) return deposit * periods;
  return deposit * ((Math.pow(1 + rate, periods) - 1) / rate);
}

/** Lo que se debe tras n periodos de interés compuesto sobre un capital. */
export const compound = (
  principal: number,
  rate: number,
  periods: number
): number => principal * Math.pow(1 + rate, periods);
