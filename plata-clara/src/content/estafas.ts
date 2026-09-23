/**
 * Estafas financieras comunes en Colombia.
 *
 * El criterio para incluir una: que le pase de verdad a alguien que
 * cobra en efectivo y no tiene historial bancario. No estafas de
 * inversionistas — estafas de barrio, WhatsApp y llamada.
 */

export type Scam = {
  slug: string;
  name: string;
  /** Cómo se presenta, en las palabras que usa el estafador. */
  looksLike: string;
  /** La señal que la delata. */
  tell: string;
  how: string[];
  /** Qué hacer si ya caíste. */
  ifCaught: string;
  icon: "phone" | "pyramid" | "loan" | "prize" | "job";
};

export const SCAMS: Scam[] = [
  {
    slug: "prestamo-adelanto",
    name: "El préstamo que pide plata por adelantado",
    looksLike:
      "«Préstamo aprobado sin codeudor ni Datacrédito. Solo consigna $150.000 de estudio de crédito y hoy mismo te desembolsamos.»",
    tell:
      "Ninguna entidad legal te cobra por adelantado para prestarte. Los costos se descuentan del desembolso, nunca antes.",
    how: [
      "Contactan por WhatsApp, Facebook o mensaje de texto.",
      "Aprueban rapidísimo y sin revisar nada, que es justo lo que quiere oír quien nunca ha podido acceder a un crédito.",
      "Piden una consignación por «estudio», «seguro», «papeleo» o «impuesto».",
      "Cuando consignas, piden otra. Y otra. Nunca llega el préstamo.",
    ],
    ifCaught:
      "Guarda los chats, el comprobante de consignación y el número. Denuncia. No sigas consignando con la esperanza de recuperar lo anterior: eso es exactamente lo que esperan que hagas.",
    icon: "loan",
  },
  {
    slug: "llamada-del-banco",
    name: "La llamada que dice ser del banco",
    looksLike:
      "«Le habla seguridad de su banco. Detectamos un movimiento raro. Para bloquear la tarjeta necesito que me confirme la clave y el código que le acaba de llegar.»",
    tell:
      "Tu banco nunca te va a pedir la clave ni el código del mensaje. Nunca. Quien te lo pide no es tu banco, aunque en la pantalla aparezca el nombre del banco.",
    how: [
      "Llaman con un número que se parece al del banco: el identificador de llamadas se puede falsificar.",
      "Meten prisa y susto: «su plata está en riesgo ahora mismo».",
      "Piden la clave, el código de verificación o que instales una aplicación para «revisar».",
      "Con ese código entran a tu cuenta y la vacían.",
    ],
    ifCaught:
      "Cuelga y llama tú al número que aparece en la tarjeta o en la página oficial del banco, nunca al que te llamó. Reporta de una vez y pide el número de radicado.",
    icon: "phone",
  },
  {
    slug: "piramide",
    name: "La pirámide",
    looksLike:
      "«Metes $500.000 y en un mes te devuelvo $700.000. Y si traes a alguien, ganas más.»",
    tell:
      "Rentabilidad alta, rápida y garantizada no existe. Y si te pagan por traer gente, la plata sale de los que entran después, no de un negocio.",
    how: [
      "Al principio sí pagan, y eso hace que la gente meta más y convenza a la familia.",
      "El negocio nunca produce nada: le pagan a los viejos con la plata de los nuevos.",
      "Cuando dejan de entrar personas, se cae y la plata desaparece.",
      "Los últimos en entrar, que suelen ser los vecinos y familiares de quienes ya estaban, lo pierden todo.",
    ],
    ifCaught:
      "Denuncia. Y no metas más plata para «recuperar»: en una pirámide, el que sale de últimas siempre pierde.",
    icon: "pyramid",
  },
  {
    slug: "premio",
    name: "El premio que no jugaste",
    looksLike:
      "«¡Felicitaciones, ganó una moto! Para reclamarla consigne $200.000 de impuestos y trámites.»",
    tell:
      "Un premio de verdad no te cobra por entregártelo. Y no se gana una rifa en la que nunca participaste.",
    how: [
      "Llega por mensaje, llamada o redes, con logos de marcas conocidas.",
      "Piden una consignación por «impuestos», «bodegaje» o «envío».",
      "A veces piden datos personales, que es lo que en realidad venían buscando.",
    ],
    ifCaught:
      "No consignes nada más. Si diste datos personales, avísale a tu banco y cambia las claves.",
    icon: "prize",
  },
  {
    slug: "trabajo-falso",
    name: "El trabajo que cobra por darte trabajo",
    looksLike:
      "«Vacante disponible, pago diario. Solo debe pagar $80.000 del curso y el uniforme para empezar el lunes.»",
    tell:
      "Un empleo de verdad no te cobra por contratarte. Si te piden plata para empezar a trabajar, no hay trabajo.",
    how: [
      "Ofrecen sueldos muy por encima de lo normal para el oficio.",
      "Piden pago por curso, uniforme, examen médico o «carné».",
      "Después del pago desaparecen, o el trabajo resulta ser reclutar a más gente.",
    ],
    ifCaught:
      "Guarda la conversación y el comprobante. Denuncia. Si te pidieron documentos, revisa que no hayan abierto productos a tu nombre.",
    icon: "job",
  },
];

export const getScam = (slug: string) => SCAMS.find((s) => s.slug === slug);

/** La regla que resume todo el resto. */
export const GOLDEN_RULES: [string, string][] = [
  [
    "Si toca pagar por adelantado, es estafa",
    "Préstamo, premio, subsidio o trabajo: nada legítimo te cobra antes de darte algo.",
  ],
  [
    "Si te meten prisa, es estafa",
    "«Es hoy o se pierde» existe para que no te dé tiempo de pensar ni de preguntarle a alguien.",
  ],
  [
    "La clave y el código no se comparten",
    "Ni con el banco, ni con la policía, ni con tu jefe. Nadie legítimo los pide.",
  ],
  [
    "Si es demasiado bueno, no es",
    "Ganancias garantizadas, préstamos sin requisitos y sueldos irreales son el anzuelo.",
  ],
  [
    "Consúltalo con alguien antes de mover plata",
    "El estafador necesita que decidas solo y rápido. Contarlo en voz alta rompe el hechizo.",
  ],
];
