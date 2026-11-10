import { RATES, REFERENCE, monthlyToEA } from "@/lib/finance";
import { percent } from "@/lib/format";
import styles from "./Illustration.module.css";

export type IllustrationKey =
  | "sim-menu"
  | "cedula"
  | "deuda-crece"
  | "corresponsal"
  | "usura"
  | "tres-bolsillos"
  | "chat-estafa"
  | "hoja-plan";

/**
 * Server Component. Inline SVG diagrams instead of photos: a couple of
 * kilobytes each, sharp on any screen, and they render even when the
 * connection is bad. Every figure shown is derived from lib/finance so
 * the drawings can't drift from the text around them.
 *
 * Text sizes are in viewBox units (320 wide); 12 is the floor so labels
 * stay legible at ~276px on a 360px phone.
 */
export function Illustration({
  name,
  caption,
  align,
  bare,
}: {
  name: IllustrationKey;
  caption?: string;
  /** Inside a two-column split: fill the right column on desktop. */
  align?: "right";
  /** No white frame (e.g. inside a hero). */
  bare?: boolean;
}) {
  return (
    <figure
      className={`${styles.fig} ${align === "right" ? styles.right : ""}`}
    >
      <div className={`${styles.frame} ${bare ? styles.bare : ""}`}>
        {DIAGRAMS[name]()}
      </div>
      {caption ? <figcaption className={styles.cap}>{caption}</figcaption> : null}
    </figure>
  );
}

const T = { label: 12, key: 14, big: 18 } as const;

const fmtX = (n: number) => "×" + n.toFixed(1).replace(".", ",");

function DeudaCrece() {
  const months = Array.from({ length: 13 }, (_, m) => m);
  const gota = months.map((m) => Math.pow(1 + RATES.gotaMonthly, m));
  const formal = months.map((m) => Math.pow(1 + RATES.formalMonthly, m));
  const max = gota[12];
  const x = (m: number) => 40 + (m / 12) * 256;
  const y = (v: number) => 166 - ((v - 1) / (max - 1)) * 136;
  const path = (vals: number[]) =>
    vals.map((v, m) => `${m ? "L" : "M"}${x(m).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
  return (
    <svg
      viewBox="0 0 320 210"
      role="img"
      aria-label={`Gráfica: una deuda al ${percent(RATES.gotaMonthly, 0)} mensual se multiplica por ${fmtX(max).slice(1)} en doce meses; un crédito formal casi no sube`}
    >
      <line x1="40" y1="166" x2="300" y2="166" stroke="var(--line-strong)" strokeWidth="1.5" />
      {[0, 3, 6, 9, 12].map((m) => (
        <text key={m} x={x(m)} y={184} fontSize={T.label} fill="var(--ink-3)" textAnchor="middle">
          {m}
        </text>
      ))}
      <text x="168" y="204" fontSize={T.label} fill="var(--ink-3)" textAnchor="middle">meses</text>
      <path d={path(gota)} fill="none" stroke="var(--red)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d={path(formal)} fill="none" stroke="var(--ink-3)" strokeWidth="2" strokeDasharray="5 4" />
      <text x="296" y="156" fontSize={T.label} fill="var(--ink-2)" textAnchor="end">Crédito formal</text>
      <circle cx={x(12)} cy={y(max)} r="4.5" fill="var(--red)" />
      <text x={x(12) - 10} y={y(max) + 6} fontSize={T.big} fill="var(--red-text)" fontWeight="800" textAnchor="end">
        {fmtX(max)}
      </text>
      <text x="44" y="34" fontSize={T.label} fill="var(--ink-2)">Lo que debes</text>
    </svg>
  );
}

function Usura() {
  const gotaEA = monthlyToEA(RATES.gotaMonthly);
  const legal = REFERENCE.usuraEA;
  const base = 176;
  const h = (v: number) => Math.max(8, (v / gotaEA) * 140);
  const legalTop = base - h(legal);
  return (
    <svg
      viewBox="0 0 320 210"
      role="img"
      aria-label={`Comparación anual: el máximo legal es ${percent(legal)} y un gota a gota cobra ${percent(gotaEA, 0)}`}
    >
      <line x1="16" y1={legalTop} x2="304" y2={legalTop} stroke="var(--red)" strokeWidth="2" strokeDasharray="7 5" />
      <text x="16" y={legalTop - 8} fontSize={T.label} fill="var(--red-text)" fontWeight="700">
        Techo legal
      </text>

      <rect x="62" y={legalTop} width="64" height={h(legal)} rx="4" fill="var(--amber)" />
      <text x="94" y={legalTop - 8} fontSize={T.key} fill="var(--ink)" fontWeight="800" textAnchor="middle">
        {percent(legal)}
      </text>
      <text x="94" y="196" fontSize={T.label} fill="var(--ink-2)" textAnchor="middle">Máximo legal</text>

      <rect x="196" y={base - 140} width="64" height="140" rx="4" fill="var(--red)" />
      <text x="228" y={base - 148} fontSize={T.big} fill="var(--red-text)" fontWeight="800" textAnchor="middle">
        {percent(gotaEA, 0)}
      </text>
      <text x="228" y="196" fontSize={T.label} fill="var(--ink-2)" textAnchor="middle">Gota a gota</text>
      <text x="304" y="208" fontSize={T.label} fill="var(--ink-3)" textAnchor="end">al año</text>
    </svg>
  );
}

const DIAGRAMS: Record<IllustrationKey, () => React.ReactNode> = {
  "sim-menu": () => (
    <svg viewBox="0 0 320 214" role="img" aria-label="Pantalla de un celular básico con el menú de la SIM y la opción de banca móvil marcada">
      <rect x="110" y="6" width="150" height="202" rx="16" fill="var(--ink)" />
      <rect x="120" y="24" width="130" height="156" rx="4" fill="var(--wash-green)" />
      <rect x="120" y="24" width="130" height="22" fill="var(--green-text)" />
      <text x="128" y="40" fontSize={T.label} fill="#fff" fontWeight="700">Menú SIM</text>
      <text x="128" y="66" fontSize={T.label} fill="var(--ink)">1. Recargas</text>
      <text x="128" y="88" fontSize={T.label} fill="var(--ink)">2. Paquetes</text>
      <rect x="122" y="96" width="126" height="24" fill="var(--green)" opacity="0.22" />
      <text x="128" y="113" fontSize={T.label} fill="var(--ink)" fontWeight="700">3. Banca móvil</text>
      <text x="128" y="138" fontSize={T.label} fill="var(--ink)">4. Servicios</text>
      <text x="128" y="160" fontSize={T.label} fill="var(--ink)">5. Ayuda</text>
      <circle cx="185" cy="194" r="7" fill="var(--ink-2)" />
      <path d="M104 108H82" stroke="var(--green)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="4 4" />
      <circle cx="46" cy="108" r="32" fill="var(--green)" opacity="0.14" />
      <text x="46" y="114" fontSize={T.key + 2} fill="var(--green-text)" fontWeight="800" textAnchor="middle">Aquí</text>
    </svg>
  ),

  corresponsal: () => (
    <svg viewBox="0 0 320 196" role="img" aria-label="Una tienda de barrio que funciona como corresponsal bancario: ahí puedes sacar plata, consignar y pagar recibos">
      <rect x="14" y="58" width="136" height="104" rx="6" fill="#fff" stroke="var(--line-strong)" strokeWidth="2" />
      <path d="M8 58h148l-12-26H20Z" fill="var(--blue)" />
      <text x="82" y="51" fontSize={T.key} fill="#fff" fontWeight="700" textAnchor="middle">TIENDA</text>
      <rect x="28" y="84" width="50" height="36" rx="3" fill="var(--blue-soft)" />
      <rect x="88" y="84" width="48" height="36" rx="3" fill="var(--paper)" stroke="var(--line-strong)" />
      <rect x="48" y="130" width="30" height="32" fill="var(--paper)" stroke="var(--line-strong)" />
      <path d="M160 110h20" stroke="var(--blue)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M176 104l7 6-7 6" stroke="var(--blue)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <rect x="192" y="52" width="122" height="116" rx="12" fill="var(--blue-soft)" />
      <text x="253" y="80" fontSize={T.key} fill="var(--blue)" fontWeight="800" textAnchor="middle">Puedes</text>
      <text x="253" y="104" fontSize={T.label} fill="var(--ink)" textAnchor="middle">Sacar plata</text>
      <text x="253" y="126" fontSize={T.label} fill="var(--ink)" textAnchor="middle">Consignar</text>
      <text x="253" y="148" fontSize={T.label} fill="var(--ink)" textAnchor="middle">Pagar recibos</text>
    </svg>
  ),

  "deuda-crece": () => <DeudaCrece />,

  cedula: () => (
    <svg viewBox="0 0 320 176" role="img" aria-label="Una cédula colombiana: para una cuenta básica es el único documento indispensable">
      <rect x="20" y="24" width="196" height="120" rx="10" fill="#fff" stroke="var(--line-strong)" strokeWidth="2" />
      <path d="M20 34a10 10 0 0 1 10-10h176a10 10 0 0 1 10 10v16H20Z" fill="var(--blue)" />
      <text x="32" y="42" fontSize={T.label} fill="#fff" fontWeight="700">CÉDULA</text>
      <rect x="34" y="62" width="48" height="60" rx="4" fill="var(--paper)" stroke="var(--line)" />
      <circle cx="58" cy="82" r="11" fill="var(--line)" />
      <path d="M42 118c2-12 8-17 16-17s14 5 16 17" fill="var(--line)" />
      <rect x="96" y="66" width="100" height="8" rx="4" fill="var(--line)" />
      <rect x="96" y="82" width="74" height="8" rx="4" fill="var(--line)" />
      <rect x="96" y="102" width="92" height="12" rx="4" fill="var(--blue)" opacity="0.28" />
      <text x="118" y="166" fontSize={T.label} fill="var(--ink-2)" textAnchor="middle">Vigente y física</text>
      <circle cx="268" cy="66" r="26" fill="var(--green)" opacity="0.15" />
      <path d="M258 66l7 7 13-14" stroke="var(--green-text)" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <text x="268" y="114" fontSize={T.key} fill="var(--green-text)" fontWeight="800" textAnchor="middle">Esto basta</text>
    </svg>
  ),

  usura: () => <Usura />,

  /* La idea central del sitio: la plata del día se parte en tres. */
  "tres-bolsillos": () => (
    <svg viewBox="0 0 320 190" role="img" aria-label="La plata del día repartida en tres bolsillos: hoy, fijo y guardado">
      {[
        { x: 18, label: "Hoy", fill: "var(--blue-soft)", stroke: "var(--blue)" },
        { x: 118, label: "Fijo", fill: "#fff3dc", stroke: "var(--amber)" },
        { x: 218, label: "Guardado", fill: "var(--wash-green)", stroke: "var(--green)" },
      ].map((b, i) => (
        <g key={b.label}>
          <circle cx={b.x + 42} cy={22 + i * 6} r="9" fill="var(--amber)" stroke="var(--ink)" strokeWidth="2" />
          <path d={`M${b.x + 42} ${38 + i * 6}v${18 - i * 6}`} stroke="var(--ink-3)" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 4" />
          <path
            d={`M${b.x} 70h84v86a12 12 0 0 1-12 12H${b.x + 12}a12 12 0 0 1-12-12Z`}
            fill={b.fill}
            stroke={b.stroke}
            strokeWidth="2"
          />
          <path d={`M${b.x} 70l42 26 42-26`} fill="none" stroke={b.stroke} strokeWidth="2" strokeLinejoin="round" />
          <text x={b.x + 42} y="140" fontSize={T.key} fill="var(--ink)" fontWeight="700" textAnchor="middle">
            {b.label}
          </text>
        </g>
      ))}
    </svg>
  ),

  /* Un chat con la oferta típica de préstamo falso. */
  "chat-estafa": () => (
    <svg viewBox="0 0 320 230" role="img" aria-label="Un celular con un mensaje que dice: préstamo aprobado, consigna cincuenta mil pesos para el estudio. Es una estafa.">
      <rect x="60" y="6" width="170" height="218" rx="20" fill="var(--ink)" />
      <rect x="70" y="22" width="150" height="186" rx="8" fill="var(--paper)" />
      <rect x="70" y="22" width="150" height="26" rx="8" fill="var(--green-text)" />
      <rect x="70" y="38" width="150" height="10" fill="var(--green-text)" />
      <text x="80" y="40" fontSize={T.label} fill="#fff" fontWeight="700">Créditos Ya</text>
      <path d="M80 62h126a6 6 0 0 1 6 6v68a6 6 0 0 1-6 6H86l-10 8v-82a6 6 0 0 1 4-6Z" fill="#fff" stroke="var(--line-strong)" />
      <text x="88" y="82" fontSize={T.label} fill="var(--ink)" fontWeight="700">¡Préstamo</text>
      <text x="88" y="98" fontSize={T.label} fill="var(--ink)" fontWeight="700">aprobado!</text>
      <text x="88" y="116" fontSize={T.label} fill="var(--ink)">Consigna $50.000</text>
      <text x="88" y="132" fontSize={T.label} fill="var(--ink)">para el estudio</text>
      <circle cx="268" cy="80" r="28" fill="var(--wash-red)" stroke="var(--red)" strokeWidth="2" />
      <path d="M260 96V62m0 2h18l-5 7 5 7h-18" fill="var(--red)" stroke="var(--red)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      <text x="268" y="134" fontSize={T.key} fill="var(--red-text)" fontWeight="800" textAnchor="middle">Estafa</text>
    </svg>
  ),

  /* La hoja del plan, pegada en la nevera. */
  "hoja-plan": () => (
    <svg viewBox="0 0 320 210" role="img" aria-label="Una hoja con una lista de tareas marcadas, pegada a la nevera con un imán">
      <rect x="70" y="0" width="180" height="210" rx="14" fill="var(--blue-soft)" />
      <rect x="96" y="22" width="128" height="170" rx="4" fill="#fff" stroke="var(--line-strong)" strokeWidth="1.5" transform="rotate(-3 160 107)" />
      <g transform="rotate(-3 160 107)">
        <text x="110" y="50" fontSize={T.key} fill="var(--ink)" fontWeight="800">Mi plan</text>
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect x="110" y={66 + i * 28} width="14" height="14" rx="3" fill="none" stroke="var(--ink)" strokeWidth="2" />
            {i < 2 ? (
              <path d={`M113 ${73 + i * 28}l3 3 6-7`} stroke="var(--green-text)" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            ) : null}
            <rect x="132" y={70 + i * 28} width={70 - (i % 2) * 18} height="6" rx="3" fill="var(--line)" />
          </g>
        ))}
      </g>
      <circle cx="160" cy="22" r="11" fill="var(--amber)" stroke="var(--ink)" strokeWidth="2" />
    </svg>
  ),
};
