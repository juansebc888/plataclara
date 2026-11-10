/**
 * No per-navigation enter animation: on low-end phones it cost a full
 * repaint of the page on every route change. Kept as a pass-through.
 */
export default function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
