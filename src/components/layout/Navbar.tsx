"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SITE } from "@/content/site";
import { NAV_MORE, NAV_PLAN, NAV_PRIMARY, type NavItem } from "./nav";
import styles from "./Navbar.module.css";

/** "page" on the exact route, "true" on a section parent, else nothing. */
function current(pathname: string, href: string) {
  if (pathname === href) return "page" as const;
  if (pathname.startsWith(href + "/")) return "true" as const;
  return undefined;
}

/**
 * Client Component — needs scroll position and the active route.
 * Kept deliberately small; it is the only always-on JS on the page.
 * "Más" is a native <details>, so keyboard support comes for free.
 */
export function Navbar() {
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const more = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    // No React state: flip a data attribute directly, at most once per
    // frame and only when the value changes.
    let raf = 0;
    let last: boolean | null = null;
    const apply = () => {
      raf = 0;
      const solid = window.scrollY > 24;
      if (solid !== last && header.current) {
        last = solid;
        header.current.toggleAttribute("data-solid", solid);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Close the drawer and the "Más" menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
    if (more.current) more.current.open = false;
  }, [pathname]);

  // Escape closes either; a tap outside closes "Más".
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      const d = more.current;
      if (d?.open) {
        d.open = false;
        d.querySelector("summary")?.focus();
      }
    };
    const onDown = (e: PointerEvent) => {
      const d = more.current;
      if (d?.open && !d.contains(e.target as Node)) d.open = false;
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, []);

  const moreActive = NAV_MORE.flat().some((l) => current(pathname, l.href));

  const drawerLink = (l: NavItem) => (
    <Link
      prefetch={false}
      key={l.href}
      href={l.href}
      className={styles.drawerLink}
      aria-current={current(pathname, l.href)}
      // Tapping the page you're already on doesn't change the route,
      // so the effect above wouldn't close the drawer.
      onClick={() => setOpen(false)}
    >
      {l.label}
    </Link>
  );

  return (
    <header ref={header} className={styles.nav}>
      <div className={`shell ${styles.inner}`}>
        <Link href="/" prefetch={false} className={styles.brand}>
          <span className={styles.mark} aria-hidden="true" />
          {SITE.name}
        </Link>

        <nav className={styles.links} aria-label="Secciones">
          {NAV_PRIMARY.map((l) => (
            <Link
              prefetch={false}
              key={l.href}
              href={l.href}
              className={styles.link}
              aria-current={current(pathname, l.href)}
            >
              {l.label}
            </Link>
          ))}
          <details ref={more} className={styles.more}>
            <summary
              className={`${styles.link} ${styles.summary} ${moreActive ? styles.active : ""}`}
            >
              Más
            </summary>
            <div className={styles.menu}>
              {NAV_MORE.map((group, i) => (
                <div key={i} className={i ? styles.menuGroup : undefined}>
                  {group.map((l) => (
                    <Link
                      prefetch={false}
                      key={l.href}
                      href={l.href}
                      className={styles.menuLink}
                      aria-current={current(pathname, l.href)}
                      onClick={() => {
                        if (more.current) more.current.open = false;
                      }}
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </details>
          <Link
            prefetch={false}
            href={NAV_PLAN.href}
            className={`btn btn-sm btn-ghost ${styles.plan}`}
            aria-current={current(pathname, NAV_PLAN.href)}
          >
            {NAV_PLAN.label}
          </Link>
        </nav>

        <button
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="menu-movil"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
            {open ? (
              <path d="M3.5 3.5l9 9m0-9-9 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
          {open ? "Cerrar" : "Menú"}
        </button>
      </div>

      <div
        id="menu-movil"
        className={`${styles.drawer} ${open ? styles.drawerOpen : ""}`}
        hidden={!open}
      >
        <nav className="shell" aria-label="Secciones">
          {drawerLink({ href: "/", label: "Inicio" })}
          {NAV_PRIMARY.map(drawerLink)}
          {NAV_MORE[0].map(drawerLink)}
          <p className={styles.drawerLabel}>Herramientas</p>
          {drawerLink(NAV_PLAN)}
          {NAV_MORE[1].map(drawerLink)}
        </nav>
      </div>
    </header>
  );
}
