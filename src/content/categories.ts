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
};

export const CATEGORIES: Category[] = [
  {
    slug: "empezando",
    name: "Empezando",
    desc: "Cómo abrir una cuenta sin fiador, sin salario fijo y sin papeleo imposible.",
    action: "Abrir tu primera cuenta",
    intro:
      "Muchas personas creen que necesitan un contrato de trabajo o un fiador para abrir una cuenta. Para las cuentas más básicas no es así. Aquí está lo que sí se necesita.",
    tone: "blue",
    icon: "wallet",
  },
  {
    slug: "presupuesto",
    name: "Presupuesto",
    desc: "Cómo organizar la plata cuando no sabes cuánto vas a ganar esta semana.",
    action: "Organizar tu semana",
    intro:
      "Casi todos los consejos de presupuesto asumen un sueldo fijo el día 30. Si tu ingreso cambia cada semana, ese método no sirve. Este es otro.",
    tone: "green",
    icon: "budget",
  },
  {
    slug: "credito",
    name: "Crédito",
    desc: "Qué es el historial crediticio, para qué sirve y cómo empezar uno desde cero.",
    action: "Empezar tu historial",
    intro:
      "El historial crediticio es el registro de si pagas lo que debes. Sin historial los bancos no prestan, y sin que presten no se construye historial. Ese círculo se puede romper.",
    tone: "blue",
    icon: "credit",
  },
  {
    slug: "deudas",
    name: "Deudas",
    desc: "Cuánto cuesta de verdad el gota a gota y qué caminos hay para salir.",
    action: "Salir del gota a gota",
    intro:
      "El gota a gota no cobra lo que parece cobrar. Aquí puedes ver el número real y las salidas que existen, incluso si ya estás adentro.",
    tone: "red",
    icon: "debt",
  },
  {
    slug: "programas",
    name: "Programas del gobierno",
    desc: "Banca de las Oportunidades y otros programas que ya existen y casi nadie usa.",
    action: "Ver qué te corresponde",
    intro:
      "Hay programas públicos hechos para acercar crédito y servicios financieros a familias de menores ingresos. El problema casi nunca es que no existan: es que nadie explica cómo llegar a ellos.",
    tone: "green",
    icon: "gov",
  },
  {
    slug: "ayuda",
    name: "Ayuda",
    desc: "Dónde hablar con una persona real cuando la guía no te alcanza.",
    action: "Buscar ayuda cerca",
    intro:
      "Hay preguntas que una página no resuelve. Estos son lugares donde atiende una persona y no te cobran por escucharte.",
    tone: "blue",
    icon: "help",
  },
];

export const getCategory = (slug: string): Category | undefined =>
  CATEGORIES.find((c) => c.slug === slug);
