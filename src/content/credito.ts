/**
 * Historial crediticio en Colombia.
 *
 * Plazos de permanencia del reporte negativo: Ley 2157 de 2021 ("Borrón
 * y cuenta nueva"), que modificó el art. 13 de la Ley 1266 de 2008.
 * Verificado en noviembre de 2026 contra el texto en funcionpublica.gov.co.
 */

export const CREDIT_MYTHS: [string, string][] = [
  [
    "«Estar en Datacrédito es malo»",
    "No. Datacrédito (la lista donde los bancos ven si pagas a tiempo) es solo el registro de cómo pagas. Lo malo es aparecer con deudas sin pagar. No aparecer del todo también te cierra puertas.",
  ],
  [
    "«Sin historial no me prestan nunca»",
    "Sí prestan, pero menos y más caro al principio. La idea es empezar con algo pequeño que sí puedas pagar.",
  ],
  [
    "«Consultar mi historial me baja el puntaje»",
    "Consultarlo tú mismo no te afecta. Es tu información y tienes derecho a verla.",
  ],
  [
    "«Si pago, el reporte desaparece de una»",
    "No es inmediato, pero tampoco es para siempre. Después de pagar, el reporte dura lo mismo que duró el atraso si fue menos de seis meses, o el doble si fue más, con un tope de cuatro años.",
  ],
];

export const CREDIT_STEPS: [string, string][] = [
  [
    "Abre una cuenta de ahorros",
    "Es el primer registro de que existes para el sistema financiero. Sin esto, lo demás no arranca.",
  ],
  [
    "Consulta qué dicen de ti",
    "Tienes derecho a revisar tu historial. Mira si hay algo reportado que no reconoces.",
  ],
  [
    "Empieza con un producto pequeño",
    "Un crédito de bajo monto o un producto de la misma entidad donde tienes la cuenta. Pequeño de verdad.",
  ],
  [
    "Paga antes de la fecha, siempre",
    "Lo que construye historial no es cuánto pediste: es que pagaste cuando dijiste que ibas a pagar.",
  ],
  [
    "Repite y sube despacio",
    "Después de varios pagos cumplidos puedes pedir un poco más. No hay atajo que sirva.",
  ],
];

export const CREDIT_RIGHTS: string[] = [
  "Tienes derecho a consultar tu propia información y a que te expliquen qué aparece reportado.",
  "Si hay un error, puedes pedir que lo corrijan. La entidad tiene que responderte.",
  "El reporte negativo no dura para siempre. Si te atrasaste menos de seis meses, dura lo mismo que duró el atraso, contado desde que pagaste. Si fue más, dura el doble, y nunca más de cuatro años desde que pagaste. Cumplido ese plazo, borrarlo es obligatorio y puedes reclamarlo (Ley 2157 de 2021).",
  "Nadie puede cobrarte por consultar tu propia información ni por «limpiar» tu historial. Quien ofrezca borrarte de las centrales por una tarifa te está estafando.",
  "Si le reclamas a una entidad y no te responde en el plazo de ley, puedes escalar al Defensor del Consumidor Financiero o a la Superintendencia Financiera, sin costo.",
];

/** Dónde se consulta el historial. Fuentes oficiales, no intermediarios. */
export const BUREAUS: { name: string; url: string; urlLabel: string; note: string }[] = [
  {
    name: "Datacrédito",
    url: "https://www.midatacredito.com",
    urlLabel: "midatacredito.com",
    note: "La central de riesgo más consultada por los bancos en Colombia.",
  },
  {
    name: "TransUnion",
    url: "https://www.transunion.co",
    urlLabel: "transunion.co",
    note: "La otra central grande. Vale la pena revisar ambas: no siempre dicen lo mismo.",
  },
];
