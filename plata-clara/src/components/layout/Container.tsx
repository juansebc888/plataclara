import type { ReactNode } from "react";

/** Server Component. Shared max-width + gutters. */
export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={className ? `shell ${className}` : "shell"}>{children}</div>;
}
