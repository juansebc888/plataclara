/**
 * Programas públicos de acceso a crédito y capital para negocio.
 *
 * VERIFICAR SIEMPRE antes de publicar y cada pocos meses: las
 * convocatorias abren y cierran, y los montos cambian cada año con el
 * salario mínimo. Ningún monto exacto va en la página sin confirmarlo
 * en la fuente oficial el mismo mes.
 */

export type ProgramKind = "no-se-devuelve" | "prestado" | "acceso";

export type Program = {
  slug?: string;
  name: string;
  who: string;
  /** Qué es, en una frase que un lector sin contexto entienda. */
  what: string;
  kind: ProgramKind;
  forWhom: string;
  reality: string;
};

export const KIND_LABEL: Record<ProgramKind, string> = {
  "no-se-devuelve": "Plata que no se devuelve",
  prestado: "Plata prestada",
  acceso: "Abre la puerta",
};

export const PROGRAMS: Program[] = [
  {
    slug: "banca-de-las-oportunidades",
    name: "Banca de las Oportunidades",
    who: "Gobierno Nacional",
    what: "No presta plata. Es el programa que empuja a bancos, cooperativas y ONG a ofrecerle productos a la gente que el sistema deja por fuera.",
    kind: "acceso",
    forWhom:
      "Personas sin cuenta ni historial, y microempresas que ningún banco atiende.",
    reality:
      "No vas a una oficina de Banca de las Oportunidades: vas a una entidad aliada y pides el producto. Sirve saber que existe porque explica por qué hay productos hechos para ti.",
  },
  {
    name: "Fondo Emprender (SENA)",
    who: "Gobierno Nacional, administrado por el SENA",
    what: "Capital semilla para montar un negocio. Si cumples las metas que acordaste, la plata no se devuelve.",
    kind: "no-se-devuelve",
    forWhom:
      "Personas con una idea de negocio concreta. Hay convocatorias específicas para jóvenes, mujeres, campesinos, comunidades étnicas, personas con discapacidad y víctimas del conflicto.",
    reality:
      "Es competido y exige un plan de negocio armado. No es plata rápida: es un proceso con acompañamiento. Empieza por buscar la convocatoria abierta que te aplique.",
  },
  {
    name: "SENA Emprende Rural",
    who: "SENA",
    what: "Formación y asesoría gratuita para montar una unidad productiva en el campo.",
    kind: "acceso",
    forWhom: "Personas en zonas rurales o de economía campesina.",
    reality:
      "Es la puerta de entrada a las convocatorias del Fondo Emprender para el campo. Primero formas, después postulas.",
  },
  {
    name: "Bancóldex",
    who: "Banco de desarrollo empresarial del Estado",
    what: "Presta plata a los bancos con condiciones especiales para que estos financien empresas.",
    kind: "prestado",
    forWhom: "Negocios ya formalizados, de cualquier tamaño.",
    reality:
      "No le presta directo a una persona. Preguntas en tu banco si tiene una línea Bancóldex disponible.",
  },
  {
    name: "Banco Agrario",
    who: "Banco del Estado",
    what: "Líneas de crédito con tasas preferenciales para pequeños productores y microempresarios.",
    kind: "prestado",
    forWhom: "Sobre todo actividad agropecuaria y rural.",
    reality:
      "Es un banco de verdad: tiene oficinas y se pide como cualquier crédito. Pregunta cuál línea aplica a tu caso.",
  },
];

/** Aliadas donde efectivamente se piden estos productos. */
export const ALLIED_KINDS: [string, string][] = [
  [
    "Bancos",
    "Los grandes tienen productos de bajo monto y cuentas simplificadas: Bancolombia, Davivienda, Banco de Bogotá, BBVA, Banco Agrario, entre otros.",
  ],
  [
    "Cooperativas de ahorro y crédito",
    "Suelen ser más flexibles con quien no tiene historial, y hay varias con presencia en la Costa. Confirma que esté vigilada antes de entregar plata.",
  ],
  [
    "ONG microfinancieras",
    "Están hechas específicamente para microempresarios sin acceso al banco. Prestan montos pequeños y acompañan el negocio.",
  ],
  [
    "Cámara de Comercio de Barranquilla",
    "Además de registrar el negocio, dicta formación gratuita para emprendedores y suele saber qué convocatorias están abiertas.",
  ],
];
