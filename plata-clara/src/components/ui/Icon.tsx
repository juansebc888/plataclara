import type { IconKey } from "@/content/categories";

/**
 * Inline SVG instead of an icon library: six icons ship as ~1kb of
 * markup rather than pulling a package into the client bundle.
 * Server Component.
 */
const PATHS: Record<IconKey, string> = {
  wallet:
    "M3 7.5A2.5 2.5 0 0 1 5.5 5H18a2 2 0 0 1 2 2v1.5M3 7.5V17a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2.5M3 7.5h16.5a1.5 1.5 0 0 1 1.5 1.5v2.5h-4a2 2 0 0 0 0 4h4",
  budget:
    "M12 3v9l6.5 3.75M12 3a9 9 0 1 0 9 9 9 9 0 0 0-9-9Z",
  credit:
    "M3 17.5 9 11l4 4 8-8.5M21 6.5h-5m5 0v5",
  debt:
    "M12 3 3.5 6.5v5c0 4.5 3.6 8.7 8.5 10 4.9-1.3 8.5-5.5 8.5-10v-5L12 3Zm0 5.5v4m0 3.2v.1",
  gov:
    "M3.5 9.5 12 4l8.5 5.5M5.5 10v7m4-7v7m5-7v7m4-7v7M3.5 20h17",
  help:
    "M12 21a9 9 0 1 0-9-9 9 9 0 0 0 9 9Zm0-13.2a2.2 2.2 0 0 1 1.6 3.7c-.7.7-1.6 1-1.6 2m0 2.7v.1",
};

export function Icon({
  name,
  size = 21,
}: {
  name: IconKey;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={PATHS[name]} />
    </svg>
  );
}

export function ArrowRight({ size = 17 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

export function ArrowUpRight({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M7 17 17 7m0 0H8m9 0v9" />
    </svg>
  );
}
