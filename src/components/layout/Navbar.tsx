"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV, SITE } from "@/content/site";
import styles from "./Navbar.module.css";

/** Client Component — needs the active route and the mobile menu state. */
export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className={styles.nav}>
      <div className={`shell ${styles.inner}`}>
        <Link href="/" className={styles.brand}>
          {SITE.name}
        </Link>

        <nav className={styles.links} aria-label="Secciones">
          {NAV.map((l) => {
            const active = pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`${styles.link} ${active ? styles.active : ""}`}
                aria-current={active ? "page" : undefined}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="menu-movil"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Cerrar" : "Menú"}
        </button>
      </div>

      {open ? (
        <div id="menu-movil" className={styles.drawer}>
          <div className="shell">
            {NAV.map((l) => (
              <Link key={l.href} href={l.href} className={styles.drawerLink}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
