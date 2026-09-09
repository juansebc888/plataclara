import type { CheckItem } from "@/components/ui/CheckList";

/**
 * Requisitos de apertura de cuentas básicas en Colombia.
 *
 * VERIFICAR antes de publicar: los topes de saldo y de retiro de las
 * cuentas de trámite simplificado están atados al salario mínimo, así
 * que cambian cada enero. Confirmar el valor vigente y la fuente
 * (Superfinanciera / la entidad) antes de poner cifras exactas.
 */

export const NEEDED: CheckItem[] = [
  {
    text: "Tu cédula",
    note: "Física y vigente. Es el requisito principal en casi todas las entidades.",
  },
  {
    text: "Ser mayor de 18 años",
    note: "Siendo menor también se puede, pero acompañado de un adulto y en oficina.",
  },
  {
    text: "Un celular",
    note: "No tiene que ser inteligente. Más abajo está cómo hacerlo desde un celular básico.",
  },
  {
    text: "Un correo electrónico",
    note: "Algunas entidades lo piden. Crearlo es gratis y toma unos minutos.",
  },
];

export const NOT_NEEDED: CheckItem[] = [
  {
    text: "Un fiador",
    note: "Nadie tiene que responder por ti para abrir una cuenta de ahorros.",
  },
  {
    text: "Un contrato de trabajo",
    note: "No te piden carta laboral ni certificado de ingresos. Trabajar por tu cuenta no te excluye.",
  },
  {
    text: "Un monto mínimo",
    note: "Puedes abrirla con cero pesos y empezar a guardar cuando puedas.",
  },
  {
    text: "Pagar cuota de manejo",
    note: "Las cuentas de trámite simplificado no cobran por mantenerla abierta.",
  },
  {
    text: "Historial crediticio",
    note: "Abrir una cuenta no es pedir un préstamo. No te revisan Datacrédito para esto.",
  },
];

export type AccountType = {
  name: string;
  what: string;
  good: string;
  watch: string;
  tone: "blue" | "green";
};

export const ACCOUNT_TYPES: AccountType[] = [
  {
    name: "Cuenta de trámite simplificado",
    what: "La versión más sencilla de una cuenta de ahorros. Se abre solo con la cédula.",
    good: "Sin cuota de manejo, sin saldo mínimo y se puede activar desde un celular básico.",
    watch:
      "Tiene un tope de cuánto puedes guardar y cuánto puedes sacar al mes. Solo se permite una por persona.",
    tone: "green",
  },
  {
    name: "Billetera digital",
    what: "Una cuenta que vive en una aplicación del celular, como las que ofrecen varios bancos.",
    good: "Se abre en minutos con la cédula y el número de celular. Sirve para recibir y enviar plata.",
    watch:
      "Necesitas un teléfono inteligente y datos o wifi para usarla.",
    tone: "blue",
  },
  {
    name: "Cuenta de ahorros normal",
    what: "La cuenta tradicional, con tarjeta débito física.",
    good: "No tiene los topes de las simplificadas y sirve para todo, incluidos los CDT.",
    watch:
      "Algunas cobran cuota de manejo. Pregunta el costo antes de firmar.",
    tone: "blue",
  },
];

export const BASIC_PHONE_STEPS: [string, string][] = [
  [
    "Entra al menú de tu SIM",
    "En el menú del celular busca la opción de tu operador. Suele llamarse Mis Bancos o Banca Móvil.",
  ],
  [
    "Elige registrar un banco",
    "Aparece una lista de entidades. Escoge con cuál quieres abrir la cuenta.",
  ],
  [
    "Escribe los datos de tu cédula",
    "Te pide número de documento y algunos datos personales.",
  ],
  [
    "Crea una clave",
    "No la compartas con nadie, ni con alguien del banco. Nadie legítimo te la va a pedir.",
  ],
  [
    "Confirma y espera el mensaje",
    "Te llega un mensaje de texto confirmando que la cuenta quedó abierta.",
  ],
];
