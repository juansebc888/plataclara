/**
 * A template re-mounts on every navigation, so this class restarts the
 * enter animation per route. Doing it here — rather than with a motion
 * library — costs zero JS and zero runtime layout work.
 */
export default function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="page-enter">{children}</div>;
}
