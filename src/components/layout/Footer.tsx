import Link from "next/link";
import { SITE } from "@/content/site";
import styles from "./Footer.module.css";

const LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/ayuda", label: "Hablar con alguien" },
  { href: "/glosario", label: "Qué significa cada palabra" },
  { href: "/sobre-el-proyecto", label: "Quiénes somos" },
  { href: "/privacidad", label: "Privacidad" },
] as const;

/** Server Component — no interactivity, ships zero JS. */
export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="shell">
        <p className={styles.note}>
          <strong>{SITE.name}.</strong> Gratis. Sin publicidad. No vendemos
          nada y no te pedimos datos. {SITE.city}.
        </p>
        <ul className={styles.links}>
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link href={l.href} prefetch={false} className={styles.link}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <p className={styles.base}>
          Información general. No es asesoría financiera personalizada.
        </p>
      </div>
    </footer>
  );
}
