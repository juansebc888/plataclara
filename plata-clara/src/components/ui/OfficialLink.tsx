import styles from "./OfficialLink.module.css";

/**
 * Server Component. Link to an entity's own site.
 *
 * Always opens in a new tab and is labelled as the official source,
 * because the whole point is that the reader can check us.
 */
export function OfficialLink({
  href,
  label,
  compact = false,
}: {
  href: string;
  label: string;
  compact?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={compact ? `${styles.link} ${styles.compact}` : styles.link}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" />
      </svg>
      <span>
        {compact ? label : `Página oficial: ${label}`}
      </span>
    </a>
  );
}
