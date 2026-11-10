export type Fact = {
  filled: number;
  lead: string;
  who: string;
  body: string;
  tone: "red" | "amber";
};

/**
 * Crédito informal: Encuesta de Endeudamiento de ANIF y Colombia Fintech
 * (37,3% de los hogares usa crédito informal). La cifra anterior, atribuida
 * al Banco de la República, no se pudo encontrar en una fuente original.
 */
export const FACTS: Fact[] = [
  {
    filled: 4,
    lead: "Casi 4 de cada 10",
    who: "hogares",
    body: "Usan préstamos por fuera del sistema, donde nadie les dice cuánto van a terminar pagando.",
    tone: "red",
  },
  {
    filled: 4,
    lead: "4 de cada 10",
    who: "adultos",
    body: "Nunca recibieron una explicación de cómo funciona una tasa de interés.",
    tone: "amber",
  },
  {
    filled: 6,
    lead: "6 de cada 10",
    who: "adultos",
    body: "No saben cómo la inflación les cambia lo que pueden comprar con lo que ganan.",
    tone: "amber",
  },
];

export const FACTS_SOURCE =
  "Préstamo informal: Encuesta de Endeudamiento de ANIF y Colombia Fintech. Tasa de interés e inflación: estudios citados en el proyecto de ley 067 de 2026, Cámara de Representantes. Colombia obtuvo 379 puntos en la prueba PISA de competencia financiera; el promedio de la OCDE ronda los 500.";
