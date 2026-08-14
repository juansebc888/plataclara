export const SITE = {
  name: "Plata Clara",
  tagline: "Tu plata, explicada sin tanta vuelta.",
  description:
    "Guías gratuitas sobre cuentas, presupuesto, crédito y deudas, escritas para quien cobra en efectivo y nunca ha tenido acceso a un banco.",
  city: "Barranquilla, Colombia",
  url: "https://plataclara.co",
} as const;

export const NAV = [
  { href: "/empezando", label: "Empezando" },
  { href: "/presupuesto", label: "Presupuesto" },
  { href: "/credito", label: "Crédito" },
  { href: "/deudas", label: "Deudas" },
  { href: "/programas", label: "Programas" },
  { href: "/ayuda", label: "Ayuda" },
] as const;

export const FOOTER_EXTRA = [
  { href: "/herramientas", label: "Herramientas" },
  { href: "/sobre-el-proyecto", label: "Sobre el proyecto" },
] as const;
