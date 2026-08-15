/**
 * Tasas de referencia.
 *
 * Verificadas contra tarifarios y prensa financiera de 2026. Aun así,
 * REVISAR cada pocos meses: las tasas de CDT se mueven con las
 * decisiones del Banco de la República.
 */
export const RATES = {
  /**
   * CDT a 360 días, efectivo anual. Conservador a propósito: en 2026 los
   * bancos tradicionales rondan 10,5%–11,25% y los digitales llegan a 13%.
   * Usamos el piso para no prometer de más.
   */
  cdtEA: 0.105,
  /** Gota a gota, mensual. Cifra común en la práctica, no oficial. */
  gotaMonthly: 0.2,
  /** Microcrédito formal, mensual aproximado. */
  formalMonthly: 0.025,
} as const;

/** Datos de referencia del año en curso. ACTUALIZAR cada enero. */
export const REFERENCE = {
  year: 2026,
  /** Decretos 1469 y 1470 de diciembre de 2025. */
  smmlv: 1_750_905,
  auxilioTransporte: 249_095,
  /** Cobertura de Fogafín por persona y por entidad. */
  fogafin: 50_000_000,
  /** Monto mínimo típico para abrir un CDT en una entidad digital. */
  cdtMinimoDigital: 100_000,
} as const;

/** Convierte una tasa efectiva anual a su equivalente diario. */
export const dailyRate = (annualEA: number): number =>
  Math.pow(1 + annualEA, 1 / 365) - 1;

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
