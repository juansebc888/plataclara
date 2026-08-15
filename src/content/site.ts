export const SITE = {
  name: "Plata Clara",
  tagline: "Tu plata, explicada sin tanta vuelta.",
  description:
    "Guías gratuitas sobre cuentas, presupuesto, crédito y deudas, escritas para quien cobra en efectivo y nunca ha tenido acceso a un banco.",
  city: "Barranquilla, Colombia",
  url: "https://plataclara.co",
} as const;

/**
 * Nav labels are shortened from the full category names to fit the bar,
 * but stay verb-shaped: the reader should know what a page lets them do
 * before clicking it.
 */
export const NAV = [
  { href: "/empezando", label: "Abrir cuenta" },
  { href: "/presupuesto", label: "Organizar plata" },
  { href: "/credito", label: "Pedir prestado" },
  { href: "/deudas", label: "Salir de deudas" },
  { href: "/programas", label: "Ayuda del gobierno" },
  { href: "/ayuda", label: "Hablar con alguien" },
] as const;

export const FOOTER_EXTRA = [
  { href: "/mi-plan", label: "Mi plan" },
  { href: "/herramientas", label: "Herramientas" },
  { href: "/sobre-el-proyecto", label: "Sobre el proyecto" },
] as const;
