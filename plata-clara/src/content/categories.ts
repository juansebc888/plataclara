export type Tone = "blue" | "green" | "red";
export type IconKey = "wallet" | "budget" | "credit" | "debt" | "gov" | "help";

export type Category = {
  slug: string;
  name: string;
  desc: string;
  /** The concrete first step — always an action, never a topic. */
  action: string;
  intro: string;
  tone: Tone;
  icon: IconKey;
  /** What the reader will be able to do after reading. Never topics. */
  outcomes: string[];
};

export const CATEGORIES: Category[] = [
  {
    slug: "empezando",
    name: "Abrir una cuenta",
    desc: "Cómo abrir una cuenta sin fiador, sin salario fijo y sin papeleo imposible.",
    action: "Ver qué te piden",
    intro:
      "Muchas personas creen que necesitan un contrato de trabajo o un fiador para abrir una cuenta. Para las cuentas más básicas no es así. Aquí está lo que sí se necesita.",
    tone: "blue",
    icon: "wallet",
    outcomes: [
      "Qué papeles te piden de verdad para abrir una cuenta",
      "Por qué no necesitas fiador, contrato de trabajo ni plata guardada",
      "Cómo abrirla desde un celular básico, sin datos",
    ],
  },
  {
    slug: "presupuesto",
    name: "Organizar tu plata",
    desc: "Cómo organizar la plata cuando no sabes cuánto vas a ganar esta semana.",
    action: "Ver el método",
    intro:
      "Casi todos los consejos de presupuesto asumen un sueldo fijo el día 30. Si tu ingreso cambia cada semana, ese método no sirve. Este es otro.",
    tone: "green",
    icon: "budget",
    outcomes: [
      "Cómo repartir la plata cuando el ingreso cambia cada día",
      "Cuánto puedes separar sin quedarte corto en la semana",
      "Qué hacer en las semanas malas sin desarmar todo",
    ],
  },
  {
    slug: "credito",
    name: "Pedir prestado",
    desc: "Qué es el historial crediticio, para qué sirve y cómo empezar uno desde cero.",
    action: "Empezar de cero",
    intro:
      "El historial crediticio es el registro de si pagas lo que debes. Sin historial los bancos no prestan, y sin que presten no se construye historial. Ese círculo se puede romper.",
    tone: "blue",
    icon: "credit",
    outcomes: [
      "Qué es el historial crediticio y quién lo mira",
      "Cómo empezar uno cuando nunca has pedido nada prestado",
      "Cómo consultar gratis lo que dicen de ti",
    ],
  },
  {
    slug: "deudas",
    name: "Salir de deudas",
    desc: "Cuánto cuesta de verdad el gota a gota y qué caminos hay para salir.",
    action: "Ver cuánto cuesta",
    intro:
      "El gota a gota no cobra lo que parece cobrar. Aquí puedes ver el número real y las salidas que existen, incluso si ya estás adentro.",
    tone: "red",
    icon: "debt",
    outcomes: [
      "Cuánto terminas pagando de verdad por un préstamo gota a gota",
      "Por qué la deuda crece más rápido de lo que parece",
      "Qué salidas existen si ya estás adentro",
    ],
  },
  {
    slug: "estafas",
    name: "No caer en estafas",
    desc: "Las trampas más comunes: préstamos falsos, llamadas del «banco», pirámides y premios que no jugaste.",
    action: "Ver las señales",
    intro:
      "A quien nunca ha podido acceder a un crédito le ofrecen préstamos fáciles todo el tiempo. Casi ninguno es real.",
    tone: "red",
    icon: "debt",
    outcomes: [
      "Reconocer las cinco estafas más comunes antes de perder plata",
      "Las cinco señales que aparecen en todas, sin excepción",
      "Qué hacer de inmediato si ya consignaste o diste tus datos",
    ],
  },
  {
    slug: "programas",
    name: "Ayuda del gobierno",
    desc: "Banca de las Oportunidades y otros programas que ya existen y casi nadie usa.",
    action: "Ver si aplicas",
    intro:
      "Hay programas públicos hechos para acercar crédito y servicios financieros a familias de menores ingresos. El problema casi nunca es que no existan: es que nadie explica cómo llegar a ellos.",
    tone: "green",
    icon: "gov",
    outcomes: [
      "Qué programas del Gobierno existen para quien no tiene historial",
      "Si cumples los requisitos",
      "A dónde ir y qué llevar",
    ],
  },
  {
    slug: "ayuda",
    name: "Hablar con alguien",
    desc: "Dónde hablar con una persona real cuando la guía no te alcanza.",
    action: "Buscar cerca de ti",
    intro:
      "Hay preguntas que una página no resuelve. Estos son lugares donde atiende una persona y no te cobran por escucharte.",
    tone: "blue",
    icon: "help",
    outcomes: [
      "Dónde atiende una persona sin cobrarte",
      "Qué entidad resuelve cada tipo de problema",
      "Qué hacer si te sientes estafado o amenazado",
    ],
  },
  {
    slug: "glosario",
    name: "Qué significa cada palabra",
    desc: "Cuota de manejo, tasa efectiva, mora, capital, usura. Las palabras del banco, en español claro.",
    action: "Ver el diccionario",
    intro:
      "Buena parte del problema no es la plata: es el idioma.",
    tone: "blue",
    icon: "help",
    outcomes: [
      "Qué quieren decir las palabras que usan en la oficina del banco",
      "La diferencia entre tasa efectiva y tasa nominal",
      "Qué preguntar cuando no entiendas algo",
    ],
  },
];

export const getCategory = (slug: string): Category | undefined =>
  CATEGORIES.find((c) => c.slug === slug);
