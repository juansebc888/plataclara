import type { ReactNode } from "react";

/**
 * Server Component. Scroll reveal is pure CSS (`[data-reveal]` in
 * globals.css); a single `RevealObserver` mounted in the layout sets
 * `data-shown` on every block. No client boundary per block.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div
      data-reveal=""
      className={className}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
