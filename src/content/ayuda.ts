/**
 * Canales de ayuda reales.
 *
 * VERIFICAR antes de publicar: los teléfonos y direcciones locales
 * cambian. Confirmar cada dato contra la fuente oficial y agregar los
 * puntos de atención de Barranquilla.
 */

export type HelpChannel = {
  name: string;
  forWhat: string;
  how: string;
  cost: string;
  tone: "blue" | "green" | "red";
  url?: string;
  urlLabel?: string;
};

export const CHANNELS: HelpChannel[] = [
  {
    name: "El Defensor del Consumidor Financiero",
    forWhat:
      "Cuando un banco, cooperativa o entidad vigilada te cobró de más, no te respondió o te trató mal.",
    how: "Toda entidad vigilada está obligada a tener uno, y es independiente de la entidad. Pregunta por él en la oficina o búscalo en la página del banco.",
    cost: "Gratis. La ley dice expresamente que no puede costarte nada.",
    tone: "green",
    url: "https://www.superfinanciera.gov.co/publicaciones/11222/defensor-del-consumidor-financiero/",
    urlLabel: "Registro de defensores",
  },
  {
    name: "La Superintendencia Financiera",
    forWhat:
      "Cuando la entidad no responde, o cuando quieres que el reclamo quede en un registro oficial.",
    how: "Puedes poner la queja directamente, sin pasar primero por el Defensor. Son caminos separados y tú eliges.",
    cost: "Gratis.",
    tone: "blue",
    url: "https://www.superfinanciera.gov.co",
    urlLabel: "superfinanciera.gov.co",
  },
  {
    name: "Reclamo directo a la entidad",
    forWhat: "El primer paso para casi todo: un cobro raro, un descuento que no reconoces.",
    how: "Pídelo por escrito y guarda el número de radicado. Ese papel es lo que te sirve después si toca escalar.",
    cost: "Gratis.",
    tone: "blue",
  },
  {
    name: "Policía o Fiscalía",
    forWhat:
      "Si hay amenazas, intimidación o presión de un prestamista informal. Eso ya no es una deuda: es un delito.",
    how: "Denuncia. No tienes que pagar para poner una denuncia y no necesitas abogado para hacerlo.",
    cost: "Gratis.",
    tone: "red",
    url: "https://www.fiscalia.gov.co",
    urlLabel: "fiscalia.gov.co",
  },
];

export const RIGHTS_NOTES: string[] = [
  "Puedes escoger a dónde ir: a la entidad, al Defensor del Consumidor Financiero o a la Superintendencia. No tienes que agotar uno para pasar al otro.",
  "Para pleitos de monto menor contra una entidad vigilada, la Superintendencia Financiera puede resolver sin que necesites abogado.",
  "Ninguno de estos trámites cuesta plata. Si alguien te ofrece gestionarlos por una tarifa, desconfía.",
];
