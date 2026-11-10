/**
 * Header navigation. Four primary destinations fit the bar at 960px;
 * the rest live behind "Más". Labels stay verb-shaped: the reader
 * should know what a page lets them do before clicking it.
 */
export type NavItem = { href: string; label: string };

export const NAV_PRIMARY: NavItem[] = [
  { href: "/empezando", label: "Abrir cuenta" },
  { href: "/presupuesto", label: "Organizar plata" },
  { href: "/deudas", label: "Salir de deudas" },
  { href: "/estafas", label: "Estafas" },
];

/** Two groups, drawn with a divider between them. */
export const NAV_MORE: NavItem[][] = [
  [
    { href: "/credito", label: "Pedir prestado" },
    { href: "/programas", label: "Ayuda del gobierno" },
    { href: "/ayuda", label: "Hablar con alguien" },
  ],
  [
    { href: "/herramientas", label: "Calculadoras" },
    { href: "/glosario", label: "Qué significa cada palabra" },
  ],
];

export const NAV_PLAN: NavItem = { href: "/mi-plan", label: "Mi plan" };
