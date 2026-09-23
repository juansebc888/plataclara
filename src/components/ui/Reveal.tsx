import type { ReactNode } from "react";

/**
 * Server Component. Used to animate content in on scroll; that motion
 * was removed because it made the site read like a product landing
 * page instead of a practical guide. Kept as a plain wrapper so page
 * code didn't need to change.
 */
export function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}
