/**
 * Glosario. Cada definición se escribe suponiendo que la persona nunca
 * ha oído la palabra, y sin usar otra palabra técnica para explicarla.
 */

export type Term = {
  term: string;
  short: string;
  long?: string;
  group: "cuentas" | "credito" | "deuda" | "ahorro";
};

export const TERMS: Term[] = [
  {
    term: "Cuota de manejo",
    short: "Lo que algunos bancos cobran cada mes solo por tener la cuenta abierta.",
    long: "Se descuenta sola, ganes o no ganes ese mes. Las cuentas de trámite simplificado no la cobran, por eso conviene preguntar siempre antes de abrir.",
    group: "cuentas",
  },
  {
    term: "Débito",
    short: "Gasta la plata que ya tienes en la cuenta.",
    long: "Si no hay saldo, no pasa la compra. No te endeudas con ella.",
    group: "cuentas",
  },
  {
    term: "Crédito",
    short: "Gasta plata que el banco te presta y que tienes que devolver.",
    long: "Si no pagas a tiempo, cobra intereses y queda registrado en tu historial.",
    group: "credito",
  },
  {
    term: "Capital",
    short: "La plata que pediste prestada, sin contar los intereses.",
    long: "Si pediste $500.000, ese es el capital. Todo lo demás que pagues encima son intereses.",
    group: "deuda",
  },
  {
    term: "Interés",
    short: "Lo que cobra quien te presta, por prestarte.",
    long: "Se cuenta como un porcentaje. Lo importante no es el porcentaje solo, sino sobre qué plazo se cobra: 20% al mes es muchísimo más que 20% al año.",
    group: "deuda",
  },
  {
    term: "Tasa efectiva anual (E.A.)",
    short: "Lo que de verdad cuesta o rinde algo en un año.",
    long: "Es la que sirve para comparar. Cuando dos entidades te dan tasas distintas, pide siempre la efectiva anual: es la única que se puede comparar de forma justa.",
    group: "deuda",
  },
  {
    term: "Tasa nominal",
    short: "Una tasa incompleta que se ve más baja de lo que es.",
    long: "No incluye el efecto de que el interés se cobre varias veces al año. Por eso siempre parece más barata. Si te dan una tasa nominal, pide la efectiva anual.",
    group: "deuda",
  },
  {
    term: "Mora",
    short: "Estar atrasado en un pago.",
    long: "Desde el primer día de mora empiezan a correr intereses adicionales, y después de un tiempo queda reportado en tu historial.",
    group: "deuda",
  },
  {
    term: "Historial crediticio",
    short: "El registro de si has pagado lo que debes y cuándo.",
    long: "No mide cuánta plata tienes. Mide si cumples.",
    group: "credito",
  },
  {
    term: "Central de riesgo",
    short: "La empresa que guarda tu historial crediticio.",
    long: "En Colombia las más conocidas son Datacrédito y TransUnion. Tienes derecho a consultar gratis lo que dicen de ti.",
    group: "credito",
  },
  {
    term: "Tasa de usura",
    short: "El máximo que alguien puede cobrarte legalmente por prestarte.",
    long: "La fija la Superintendencia Financiera y cambia cada cierto tiempo. Cobrar por encima de ese tope es un delito, no solo un abuso.",
    group: "deuda",
  },
  {
    term: "Microcrédito",
    short: "Un préstamo pequeño para un negocio pequeño.",
    long: "Está pensado para quien no tiene contrato de trabajo. En vez de carta laboral, miran cómo va tu negocio.",
    group: "credito",
  },
  {
    term: "Capital semilla",
    short: "Plata para arrancar un negocio que, si cumples las metas, no devuelves.",
    long: "También se le dice «condonable». No es lo mismo que un préstamo.",
    group: "credito",
  },
  {
    term: "CDT",
    short: "Guardar plata en un banco por un tiempo fijo, a cambio de un interés que te dicen desde el principio.",
    long: "No puedes sacarla antes sin perder el interés. A cambio, rinde mucho más que tenerla quieta.",
    group: "ahorro",
  },
  {
    term: "Corresponsal bancario",
    short: "Una tienda o negocio del barrio donde puedes hacer cosas del banco.",
    long: "Sacar plata, consignar, pagar recibos. Evita tener que ir hasta una sucursal.",
    group: "cuentas",
  },
  {
    term: "Entidad vigilada",
    short: "Una entidad que la Superintendencia Financiera controla.",
    long: "Si está vigilada, hay reglas que debe cumplir y alguien a quien quejarte gratis. Si no lo está, no hay respaldo de ningún tipo.",
    group: "cuentas",
  },
  {
    term: "Fogafín",
    short: "El seguro que protege tu plata si el banco quiebra.",
    long: "Cubre hasta un monto por persona y por entidad. Solo aplica en entidades vigiladas.",
    group: "ahorro",
  },
  {
    term: "Extracto",
    short: "El resumen de todo lo que entró y salió de tu cuenta.",
    long: "Sirve para revisar cobros que no reconoces y como prueba si toca reclamar.",
    group: "cuentas",
  },
];

export const GROUPS: { key: Term["group"]; label: string }[] = [
  { key: "cuentas", label: "Cuentas y bancos" },
  { key: "ahorro", label: "Ahorro" },
  { key: "credito", label: "Crédito" },
  { key: "deuda", label: "Deudas e intereses" },
];
