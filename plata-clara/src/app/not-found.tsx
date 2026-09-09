import Link from "next/link";
import { ArrowRight } from "@/components/ui/Icon";

export default function NotFound() {
  return (
    <section className="section">
      <div className="shell">
        <p className="eyebrow">Página no encontrada</p>
        <h1 className="h1">Esta página no existe.</h1>
        <p className="sub">
          Puede que el enlace esté viejo o mal escrito. Desde el inicio puedes
          llegar a todos los temas.
        </p>
        <Link href="/" className="btn">
          Volver al inicio
          <ArrowRight />
        </Link>
      </div>
    </section>
  );
}
