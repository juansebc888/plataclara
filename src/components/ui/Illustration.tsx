import styles from "./Illustration.module.css";

export type IllustrationKey =
  | "sim-menu"
  | "cedula"
  | "deuda-crece"
  | "corresponsal"
  | "usura";

/**
 * Server Component. Inline SVG diagrams instead of photos: a couple of
 * kilobytes each, sharp on any screen, and they render even when the
 * connection is bad. Photos would be the wrong trade for this reader.
 */
export function Illustration({
  name,
  caption,
}: {
  name: IllustrationKey;
  caption?: string;
}) {
  return (
    <figure className={styles.fig}>
      <div className={styles.frame}>{DIAGRAMS[name]}</div>
      {caption ? <figcaption className={styles.cap}>{caption}</figcaption> : null}
    </figure>
  );
}

const DIAGRAMS: Record<IllustrationKey, React.ReactNode> = {
  /* Menú de la SIM en un celular básico */
  "sim-menu": (
    <svg viewBox="0 0 320 210" role="img" aria-label="Pantalla de un celular básico mostrando el menú de la SIM con la opción de banca móvil">
      <rect x="96" y="8" width="128" height="194" rx="14" fill="var(--ink)" />
      <rect x="104" y="26" width="112" height="152" rx="4" fill="#DFF3E4" />
      <rect x="104" y="26" width="112" height="18" fill="var(--green)" />
      <text x="112" y="39" fontSize="9" fill="#fff" fontWeight="700">Menú SIM</text>
      <text x="112" y="60" fontSize="9" fill="var(--ink)">1. Recargas</text>
      <text x="112" y="78" fontSize="9" fill="var(--ink)">2. Paquetes</text>
      <rect x="106" y="86" width="108" height="18" fill="var(--green)" opacity="0.22" />
      <text x="112" y="99" fontSize="9" fill="var(--ink)" fontWeight="700">3. Banca móvil</text>
      <text x="112" y="118" fontSize="9" fill="var(--ink)">4. Servicios</text>
      <text x="112" y="136" fontSize="9" fill="var(--ink)">5. Ayuda</text>
      <circle cx="160" cy="190" r="7" fill="#3A4652" />
      <path d="M150 96h-22" stroke="var(--green)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="4 4" />
      <circle cx="52" cy="96" r="26" fill="var(--green)" opacity="0.14" />
      <text x="52" y="93" fontSize="11" fill="var(--green)" fontWeight="800" textAnchor="middle">Aquí</text>
      <text x="52" y="105" fontSize="8" fill="var(--gray)" textAnchor="middle">empieza</text>
      <text x="242" y="70" fontSize="9" fill="var(--gray)">Sin datos</text>
      <text x="242" y="84" fontSize="9" fill="var(--gray)">Sin wifi</text>
      <text x="242" y="98" fontSize="9" fill="var(--gray)">Gratis</text>
    </svg>
  ),

  /* Corresponsal bancario: la tienda del barrio */
  corresponsal: (
    <svg viewBox="0 0 320 190" role="img" aria-label="Una tienda de barrio funcionando como corresponsal bancario">
      <rect x="24" y="56" width="130" height="100" rx="6" fill="#fff" stroke="var(--line)" strokeWidth="2" />
      <path d="M18 56h142l-12-24H30Z" fill="var(--blue)" opacity="0.85" />
      <text x="89" y="49" fontSize="10" fill="#fff" fontWeight="700" textAnchor="middle">TIENDA</text>
      <rect x="40" y="82" width="46" height="34" rx="3" fill="var(--blue-soft)" />
      <rect x="98" y="82" width="40" height="34" rx="3" fill="var(--paper)" stroke="var(--line)" />
      <rect x="60" y="126" width="30" height="30" fill="var(--paper)" stroke="var(--line)" />
      <text x="89" y="176" fontSize="9" fill="var(--gray)" textAnchor="middle">A dos cuadras</text>

      <path d="M166 106h30" stroke="var(--blue)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M190 100l7 6-7 6" stroke="var(--blue)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

      <rect x="206" y="62" width="98" height="88" rx="10" fill="var(--blue-soft)" />
      <text x="255" y="86" fontSize="10" fill="var(--blue)" fontWeight="800" textAnchor="middle">Puedes</text>
      <text x="255" y="104" fontSize="9" fill="var(--ink)" textAnchor="middle">Sacar plata</text>
      <text x="255" y="120" fontSize="9" fill="var(--ink)" textAnchor="middle">Consignar</text>
      <text x="255" y="136" fontSize="9" fill="var(--ink)" textAnchor="middle">Pagar recibos</text>
    </svg>
  ),

  /* Cómo crece una deuda al 20% mensual */
  "deuda-crece": (
    <svg viewBox="0 0 320 190" role="img" aria-label="Gráfica que muestra cómo una deuda al veinte por ciento mensual crece cada vez más rápido">
      <line x1="34" y1="160" x2="304" y2="160" stroke="var(--line)" strokeWidth="1.5" />
      <line x1="34" y1="18" x2="34" y2="160" stroke="var(--line)" strokeWidth="1.5" />
      {[0, 2, 4, 6, 8, 10, 12].map((m) => {
        const x = 34 + (m / 12) * 262;
        const v = Math.pow(1.2, m);
        const y = 160 - (Math.log(v) / Math.log(Math.pow(1.2, 12))) * 0;
        return (
          <text key={m} x={x} y={174} fontSize="8" fill="var(--gray)" textAnchor="middle">
            {m}
          </text>
        );
      })}
      <text x="169" y="188" fontSize="8" fill="var(--gray)" textAnchor="middle">meses</text>
      <path
        d="M34 156 L56 154 L78 151 L100 146 L122 139 L144 130 L166 118 L188 103 L210 84 L232 62 L254 40 L276 24 L296 14"
        fill="none"
        stroke="var(--red)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line x1="34" y1="156" x2="296" y2="140" stroke="var(--gray)" strokeWidth="2" strokeDasharray="5 4" />
      <text x="240" y="136" fontSize="8.5" fill="var(--gray)">Crédito formal</text>
      <circle cx="296" cy="14" r="4" fill="var(--red)" />
      <text x="290" y="30" fontSize="9" fill="var(--red)" fontWeight="700" textAnchor="end">×8,9</text>
      <text x="44" y="30" fontSize="9" fill="var(--gray)">Lo que debes</text>
    </svg>
  ),

  /* Cédula: qué miran de verdad */
  cedula: (
    <svg viewBox="0 0 320 170" role="img" aria-label="Una cédula colombiana señalando que es el único documento indispensable">
      <rect x="46" y="30" width="180" height="110" rx="10" fill="#fff" stroke="var(--line)" strokeWidth="2" />
      <rect x="46" y="30" width="180" height="22" rx="10" fill="var(--blue)" opacity="0.9" />
      <rect x="46" y="44" width="180" height="8" fill="var(--blue)" opacity="0.9" />
      <text x="60" y="45" fontSize="9" fill="#fff" fontWeight="700">CÉDULA DE CIUDADANÍA</text>
      <rect x="60" y="64" width="44" height="54" rx="4" fill="var(--paper)" stroke="var(--line)" />
      <circle cx="82" cy="82" r="11" fill="var(--line)" />
      <path d="M66 114c2-11 8-16 16-16s14 5 16 16" fill="var(--line)" />
      <rect x="116" y="66" width="92" height="7" rx="3.5" fill="var(--line)" />
      <rect x="116" y="80" width="70" height="7" rx="3.5" fill="var(--line)" />
      <rect x="116" y="98" width="86" height="10" rx="4" fill="var(--blue)" opacity="0.28" />
      <text x="136" y="153" fontSize="9" fill="var(--gray)">Vigente y física</text>
      <circle cx="252" cy="60" r="22" fill="var(--green)" opacity="0.15" />
      <path d="M244 60l6 6 11-12" stroke="var(--green)" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <text x="252" y="96" fontSize="8.5" fill="var(--green)" fontWeight="700" textAnchor="middle">Esto basta</text>
    </svg>
  ),

  /* Tasa de usura: el techo legal */
  usura: (
    <svg viewBox="0 0 320 200" role="img" aria-label="Comparación entre la tasa de usura legal y lo que cobra un gota a gota">
      <line x1="20" y1="52" x2="300" y2="52" stroke="var(--red)" strokeWidth="2.5" strokeDasharray="7 5" />
      <text x="20" y="44" fontSize="9.5" fill="var(--red)" fontWeight="700">Techo legal · usura</text>

      <rect x="52" y="150" width="52" height="34" rx="4" fill="var(--green)" />
      <text x="78" y="144" fontSize="9" fill="var(--ink)" fontWeight="700" textAnchor="middle">~2,5%</text>
      <text x="78" y="196" fontSize="8.5" fill="var(--gray)" textAnchor="middle">Microcrédito</text>

      <rect x="134" y="60" width="52" height="124" rx="4" fill="var(--amber)" />
      <text x="160" y="54" fontSize="9" fill="var(--ink)" fontWeight="700" textAnchor="middle">límite</text>
      <text x="160" y="196" fontSize="8.5" fill="var(--gray)" textAnchor="middle">Máximo legal</text>

      <rect x="216" y="18" width="52" height="166" rx="4" fill="var(--red)" />
      <text x="242" y="12" fontSize="9" fill="var(--red)" fontWeight="800" textAnchor="middle">792%</text>
      <text x="242" y="196" fontSize="8.5" fill="var(--gray)" textAnchor="middle">Gota a gota</text>

      <text x="278" y="40" fontSize="8.5" fill="var(--red)" fontWeight="700" textAnchor="end">Delito</text>
    </svg>
  ),
};
