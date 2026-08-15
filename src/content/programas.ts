/**
 * Programas públicos de acceso a crédito y capital para negocio.
 *
 * REVISAR cada pocos meses: las convocatorias abren y cierran, y los
 * montos cambian cada año con el salario mínimo. Los enlaces oficiales
 * son la fuente de verdad; esta página solo traduce.
 */

export type ProgramKind = "no-se-devuelve" | "prestado" | "acceso";

export type Program = {
  slug: string;
  name: string;
  who: string;
  url: string;
  urlLabel: string;
  /** Qué es, en una frase que un lector sin contexto entienda. */
  what: string;
  kind: ProgramKind;
  forWhom: string;
  reality: string;
  /** Contenido de la página de detalle. */
  detail: {
    intro: string;
    outcomes: string[];
    sections: { title: string; body: string[] }[];
    steps: [string, string][];
    watch: string[];
  };
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
    url: "https://www.bancadelasoportunidades.gov.co",
    urlLabel: "bancadelasoportunidades.gov.co",
    what: "No presta plata. Es el programa que empuja a bancos, cooperativas y ONG a ofrecerle productos a la gente que el sistema deja por fuera.",
    kind: "acceso",
    forWhom:
      "Personas sin cuenta ni historial, y microempresas que ningún banco atiende.",
    reality:
      "No vas a una oficina de Banca de las Oportunidades: vas a una entidad aliada y pides el producto.",
    detail: {
      intro:
        "El programa del Gobierno que existe para que la gente sin cuenta ni historial pueda acceder a crédito. Sobre todo, crédito para trabajar por su cuenta.",
      outcomes: [
        "Por qué Banca de las Oportunidades no te presta plata directamente",
        "Qué es un microcrédito y en qué se diferencia de un gota a gota",
        "A qué entidad ir y qué preguntar cuando llegues",
      ],
      sections: [],
      steps: [],
      watch: [],
    },
  },
  {
    slug: "fondo-emprender",
    name: "Fondo Emprender",
    who: "SENA · Gobierno Nacional",
    url: "https://www.fondoemprender.com",
    urlLabel: "fondoemprender.com",
    what: "Capital semilla para montar un negocio. Si cumples las metas que acordaste, la plata no se devuelve.",
    kind: "no-se-devuelve",
    forWhom:
      "Personas con una idea de negocio concreta. Hay convocatorias específicas para jóvenes, mujeres, campesinos, comunidades étnicas, personas con discapacidad y víctimas del conflicto.",
    reality:
      "Es competido y exige un plan de negocio armado. No es plata rápida: es un proceso con acompañamiento.",
    detail: {
      intro:
        "Es la principal fuente de capital semilla del Gobierno colombiano. La palabra clave es «condonable»: si cumples lo que prometiste, no devuelves la plata.",
      outcomes: [
        "Qué significa que el capital semilla sea condonable",
        "Si tu idea de negocio puede aplicar",
        "Qué te van a exigir antes de darte un peso",
      ],
      sections: [
        {
          title: "Qué quiere decir «condonable»",
          body: [
            "Te entregan una plata para montar el negocio y firmas unas metas: cuánto vas a vender, cuántos empleos vas a generar, en cuánto tiempo. Si cumples esas metas, la deuda se borra y no devuelves nada.",
            "Si no cumples, sí toca devolverla. Por eso el plan de negocio importa tanto: no es papeleo, es lo que define si terminas con un negocio o con una deuda.",
          ],
        },
        {
          title: "No es plata rápida",
          body: [
            "Entre que te presentas y que recibes, pasan meses. Hay evaluación, hay acompañamiento y hay seguimiento después.",
            "Si necesitas plata esta semana, este no es el camino. Para eso mira el microcrédito. Este es para cuando puedes esperar y quieres montar algo formal.",
          ],
        },
        {
          title: "Hay convocatorias hechas para poblaciones específicas",
          body: [
            "En 2026 se abrieron doce convocatorias distintas dirigidas a comunidades étnicas, campesinos, población indígena, personas con discapacidad, víctimas del conflicto armado, jóvenes y mujeres.",
            "Vale la pena revisar si alguna te aplica: competir dentro de una convocatoria específica es distinto a competir contra todo el país.",
          ],
        },
      ],
      steps: [
        ["Mira qué convocatorias están abiertas", "Entra a la página oficial. Si no hay ninguna abierta que te aplique, anota cuándo abre la siguiente."],
        ["Acércate al SENA", "El Fondo lo administra el SENA y ellos acompañan la formulación. Es gratis."],
        ["Arma el plan de negocio", "Qué vendes, a quién, a qué precio, cuánto cuesta producirlo. Esta es la parte que decide todo."],
        ["Presenta y espera la evaluación", "Toma tiempo. No pagues a nadie por «agilizarlo»: no se puede."],
        ["Si te aprueban, cumple las metas", "De eso depende que la plata no haya que devolverla."],
      ],
      watch: [
        "Postularse es gratis. Nadie puede cobrarte por «gestionarte» un cupo.",
        "Las convocatorias tienen fecha de cierre. Confirma en la página oficial antes de armar nada.",
        "Los montos cambian cada año y dependen de la línea a la que apliques.",
      ],
    },
  },
  {
    slug: "sena-emprende-rural",
    name: "SENA Emprende Rural",
    who: "SENA",
    url: "https://www.sena.edu.co",
    urlLabel: "sena.edu.co",
    what: "Formación y asesoría gratuita para montar una unidad productiva en el campo.",
    kind: "acceso",
    forWhom: "Personas en zonas rurales o de economía campesina.",
    reality:
      "Es la puerta de entrada a las convocatorias del Fondo Emprender para el campo. Primero formas, después postulas.",
    detail: {
      intro:
        "Formación gratuita del SENA para actividades productivas rurales. No entrega plata, pero es el paso previo que habilita a muchas convocatorias.",
      outcomes: [
        "Qué formación gratuita puedes recibir",
        "Cómo se conecta con el capital semilla del Fondo Emprender",
        "Si aplica para tu caso",
      ],
      sections: [
        {
          title: "Primero formas, después postulas",
          body: [
            "Muchas convocatorias de capital semilla para el campo exigen haber pasado por un proceso de formación. Este es ese proceso, y no cuesta nada.",
            "Además del taller, se sale con algo más útil: un plan de la unidad productiva y gente del SENA que ya conoce tu proyecto.",
          ],
        },
      ],
      steps: [
        ["Busca la sede del SENA más cercana", "La oferta cambia por región. Pregunta qué programas rurales tienen abiertos."],
        ["Inscríbete en la formación", "Es gratuita."],
        ["Arma tu unidad productiva con el acompañamiento", "Esa es la base para postular después."],
      ],
      watch: ["La oferta varía por región y por temporada."],
    },
  },
  {
    slug: "bancoldex",
    name: "Bancóldex",
    who: "Banco de desarrollo empresarial del Estado",
    url: "https://www.bancoldex.com",
    urlLabel: "bancoldex.com",
    what: "Presta plata a los bancos con condiciones especiales para que estos financien empresas.",
    kind: "prestado",
    forWhom: "Negocios ya formalizados, de cualquier tamaño.",
    reality:
      "No le presta directo a una persona. Preguntas en tu banco si tiene una línea Bancóldex disponible.",
    detail: {
      intro:
        "Es el banco de desarrollo del Estado. Funciona por detrás: le presta a los bancos para que ellos presten más barato a las empresas.",
      outcomes: [
        "Por qué Bancóldex no te atiende directamente",
        "Qué preguntar en tu banco para acceder a una línea Bancóldex",
        "Si tu negocio está en etapa de aplicar",
      ],
      sections: [
        {
          title: "Es un banco de segundo piso",
          body: [
            "Suena raro, pero significa esto: Bancóldex no tiene ventanilla para el público. Le presta a los bancos comerciales, y esos bancos te prestan a ti con mejores condiciones.",
            "Por eso la pregunta correcta no es «cómo pido en Bancóldex» sino «qué líneas de Bancóldex maneja este banco».",
          ],
        },
        {
          title: "Normalmente pide negocio formalizado",
          body: [
            "Suele exigir que el negocio esté registrado y con algo de historia. Si apenas estás empezando y trabajas informal, primero conviene el microcrédito o el capital semilla.",
          ],
        },
      ],
      steps: [
        ["Formaliza el negocio si aún no lo está", "En la Cámara de Comercio de tu ciudad."],
        ["Pregunta en tu banco por líneas Bancóldex", "Con esas palabras exactas. No todos los asesores las ofrecen si no preguntas."],
        ["Compara con el crédito normal del banco", "A veces la diferencia de tasa es grande y a veces no."],
      ],
      watch: ["No atiende personas naturales directamente en ventanilla."],
    },
  },
  {
    slug: "banco-agrario",
    name: "Banco Agrario",
    who: "Banco del Estado",
    url: "https://www.bancoagrario.gov.co",
    urlLabel: "bancoagrario.gov.co",
    what: "Líneas de crédito con tasas preferenciales para pequeños productores y microempresarios.",
    kind: "prestado",
    forWhom: "Sobre todo actividad agropecuaria y rural.",
    reality:
      "Es un banco de verdad: tiene oficinas y se pide como cualquier crédito.",
    detail: {
      intro:
        "A diferencia de los anteriores, este sí es un banco con oficinas donde puedes entrar y preguntar. Es del Estado y atiende sobre todo al campo.",
      outcomes: [
        "Qué tipo de crédito maneja y para quién",
        "Qué llevar cuando vayas a preguntar",
        "Si tu actividad califica",
      ],
      sections: [
        {
          title: "Sí atiende al público",
          body: [
            "Tiene oficinas y se pide un crédito como en cualquier banco. La diferencia es que sus líneas para pequeños productores suelen tener tasas más bajas que las comerciales.",
            "También ofrece cuentas y otros productos básicos, así que sirve incluso si lo que necesitas todavía no es un crédito.",
          ],
        },
      ],
      steps: [
        ["Ubica la oficina más cercana", "En la página oficial hay un buscador de sedes."],
        ["Lleva cédula y lo que demuestre tu actividad", "Facturas, registros de venta, lo que tengas."],
        ["Pregunta por líneas para pequeño productor o microempresario", "Son distintas al crédito de consumo normal."],
      ],
      watch: ["Sus líneas más baratas están enfocadas al sector agropecuario."],
    },
  },
];

export const getProgram = (slug: string): Program | undefined =>
  PROGRAMS.find((p) => p.slug === slug);

/** Aliadas donde efectivamente se piden estos productos. */
export type Ally = { name: string; desc: string; url?: string; urlLabel?: string };

export const ALLIES: Ally[] = [
  {
    name: "Bancos",
    desc: "Los grandes tienen cuentas simplificadas y productos de bajo monto: Bancolombia, Davivienda, Banco de Bogotá, BBVA, Banco Agrario, entre otros.",
  },
  {
    name: "Cooperativas de ahorro y crédito",
    desc: "Suelen ser más flexibles con quien no tiene historial. Antes de entregar plata, confirma en la Superfinanciera que la entidad esté vigilada.",
    url: "https://www.superfinanciera.gov.co",
    urlLabel: "superfinanciera.gov.co",
  },
  {
    name: "ONG microfinancieras",
    desc: "Están hechas específicamente para microempresarios sin acceso al banco. Prestan montos pequeños y acompañan el negocio.",
  },
  {
    name: "Cámara de Comercio de Barranquilla",
    desc: "Además de registrar el negocio, dicta formación gratuita para emprendedores y suele saber qué convocatorias están abiertas.",
    url: "https://www.camarabaq.org.co",
    urlLabel: "camarabaq.org.co",
  },
];
