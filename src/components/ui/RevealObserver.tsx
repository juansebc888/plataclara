"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Mounted once in the root layout. One IntersectionObserver for every
 * `[data-reveal]` block on the page; each block is flagged once and
 * unobserved. Re-scans after each client navigation.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).dataset.shown = "true";
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    const scan = () =>
      document
        .querySelectorAll<HTMLElement>("[data-reveal]:not([data-shown])")
        .forEach((el) => io.observe(el));
    scan();
    // Blocks streamed in or lazy-mounted after this effect ran.
    let raf = 0;
    const mo = new MutationObserver(() => {
      if (!raf) raf = requestAnimationFrame(() => ((raf = 0), scan()));
    });
    mo.observe(document.getElementById("contenido") ?? document.body, {
      childList: true,
      subtree: true,
    });
    return () => {
      cancelAnimationFrame(raf);
      mo.disconnect();
      io.disconnect();
    };
  }, [pathname]);

  return null;
}
