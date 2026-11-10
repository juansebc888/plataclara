import Image from "next/image";

export type ArtKey =
  | "home-plan"
  | "empezando"
  | "presupuesto"
  | "credito"
  | "deudas"
  | "estafas"
  | "programas"
  | "ayuda"
  | "perdido";

/** Square images; everything else is 4:3. */
const SQUARE: ArtKey[] = ["home-plan", "perdido"];

/**
 * Server Component. Flat illustrations of people, pre-compressed to
 * ~25–60 kB WebP in /public/illustrations. Decorative: the text around
 * them already says what they show, so alt is empty.
 */
export function Art({
  name,
  priority = false,
  className,
}: {
  name: ArtKey;
  priority?: boolean;
  className?: string;
}) {
  const square = SQUARE.includes(name);
  return (
    <Image
      src={`/illustrations/${name}.webp`}
      alt=""
      width={960}
      height={square ? 960 : 720}
      sizes="(min-width: 980px) 380px, 50vw"
      loading={priority ? undefined : "lazy"}
      priority={priority}
      className={className}
      style={{ width: "100%", height: "auto", borderRadius: 20 }}
    />
  );
}
