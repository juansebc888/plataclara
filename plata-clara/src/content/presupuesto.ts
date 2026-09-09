/**
 * Método de presupuesto para ingreso diario variable.
 * No es la regla 50/30/20: esa asume sueldo fijo mensual.
 */

export type Bucket = {
  name: string;
  what: string;
  rule: string;
  tone: "blue" | "green" | "red";
};

export const BUCKETS: Bucket[] = [
  {
    name: "Lo de hoy",
    what: "Comida, transporte, lo que se gasta el mismo día.",
    rule: "Es lo único que andas encima. Si no está en el bolsillo, no se gasta.",
    tone: "blue",
  },
  {
    name: "Lo que cae fijo",
    what: "Arriendo, servicios, cuotas. Llega igual, ganes mucho o poco.",
    rule: "Divide el total del mes entre los días que trabajas y separa esa parte todos los días.",
    tone: "red",
  },
  {
    name: "Lo guardado",
    what: "Para el imprevisto y para lo que quieras después.",
    rule: "Aunque sea la cifra más pequeña. Lo que cuenta es que salga todos los días.",
    tone: "green",
  },
];

export const METHOD_STEPS: [string, string][] = [
  [
    "Suma lo que cae fijo cada mes",
    "Arriendo, servicios, cuotas, colegio. Todo lo que llega sí o sí. Anótalo una vez.",
  ],
  [
    "Divídelo entre los días que trabajas",
    "Si son $600.000 al mes y trabajas 25 días, son $24.000 diarios. Ese es tu número.",
  ],
  [
    "Sepáralo apenas entra la plata",
    "Antes de gastar nada. Si esperas a fin de mes, ya no está.",
  ],
  [
    "Calcula con tu día malo, no con el bueno",
    "Si un día bueno son $80.000 y uno malo $30.000, planea con $30.000. Lo que sobre es ganancia.",
  ],
  [
    "Lo que sobra se parte en dos",
    "Una parte para guardar, otra para gastar sin culpa. Si todo es para guardar, no aguantas.",
  ],
];

export const BAD_WEEK: string[] = [
  "Primero lo fijo. Un mes sin pagar arriendo cuesta más que cualquier ahorro que hagas.",
  "Lo guardado no se toca por un antojo, pero sí por una emergencia real. Para eso es.",
  "Si tocaste lo guardado, no es un fracaso. Vuelve a separar apenas puedas.",
  "No pidas prestado para tapar una semana mala si la siguiente también va a serlo. Ahí empieza el hueco.",
];
