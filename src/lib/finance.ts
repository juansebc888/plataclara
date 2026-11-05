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
  /**
   * Retención en la fuente sobre los intereses de un CDT (renta fija).
   * El banco la descuenta al vencimiento. VERIFICAR si cambia la norma.
   */
  retencionCDT: 0.04,
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
  /**
   * Tasa de usura para crédito de consumo y ordinario, efectivo anual.
   * ACTUALIZAR: la certifica la Superintendencia Financiera y cambia
   * cada mes. Este valor es el de noviembre de 2026 (Resolución 1707
   * de 2026).
   */
  usuraEA: 0.2834,
  usuraMes: "noviembre de 2026",
} as const;

/** Convierte una tasa mensual a su equivalente efectivo anual. */
export const monthlyToEA = (monthly: number): number =>
  Math.pow(1 + monthly, 12) - 1;

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

export type SavingsPoint = {
  /** Todo lo que se ha guardado, sin intereses. */
  saved: number;
  /** Lo mismo, pero pasando la plata a CDTs a medida que alcanza. */
  withCdt: number;
};

/**
 * Simula a alguien que guarda `deposit` cada periodo y, cada vez que
 * junta el mínimo para un CDT, abre uno a un año con todo lo que tiene.
 *
 * Así funciona en la vida real: un CDT recibe una sola suma al abrirlo
 * y paga los intereses al vencimiento, menos la retención en la fuente.
 * Al vencer, capital e intereses se vuelven a meter en un CDT nuevo
 * junto con lo que se haya juntado mientras tanto.
 *
 * Un CDT que todavía no ha vencido se cuenta solo por su capital:
 * los intereses no se tienen en la mano hasta el vencimiento.
 *
 * Devuelve un punto por periodo, empezando en el periodo 0.
 */
export function simulateCdtSavings({
  deposit,
  periodsPerYear,
  periods,
  annualEA = RATES.cdtEA,
  minimum = REFERENCE.cdtMinimoDigital,
  withholding = RATES.retencionCDT,
}: {
  deposit: number;
  periodsPerYear: number;
  periods: number;
  annualEA?: number;
  minimum?: number;
  withholding?: number;
}): SavingsPoint[] {
  const term = Math.max(1, Math.round(periodsPerYear));
  const netInterest = annualEA * (1 - withholding);

  /** CDTs abiertos, en orden de vencimiento. */
  const open: { principal: number; maturesAt: number }[] = [];
  let head = 0;
  let inCdts = 0;
  let loose = 0;

  const points: SavingsPoint[] = [{ saved: 0, withCdt: 0 }];

  for (let t = 1; t <= periods; t++) {
    // 1. Lo que vence hoy vuelve a la mano, con sus intereses.
    while (head < open.length && open[head].maturesAt <= t) {
      const lot = open[head++];
      inCdts -= lot.principal;
      loose += lot.principal * (1 + netInterest);
    }

    // 2. Se guarda lo de este periodo.
    loose += deposit;

    // 3. Si ya alcanza, todo lo suelto va a un CDT nuevo.
    if (loose >= minimum && loose > 0) {
      open.push({ principal: loose, maturesAt: t + term });
      inCdts += loose;
      loose = 0;
    }

    points.push({ saved: deposit * t, withCdt: inCdts + loose });
  }

  return points;
}
