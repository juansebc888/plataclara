import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@/components/ui/Icon";
import { Questions } from "@/components/ui/Questions";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <section className="section">
        <div className="shell">
          <p className="eyebrow">Error 404</p>
          <h1 className="h1">Esta página no existe.</h1>
          <p className="sub">
            Puede que el enlace esté viejo o mal escrito. Desde el inicio puedes
            llegar a todos los temas.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/" className="btn">
              Volver al inicio
              <ArrowRight />
            </Link>
            <Link href="/ayuda" className="btn btn-ghost">
              Hablar con alguien
            </Link>
          </div>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="shell">
          <Questions title="¿Buscabas alguna de estas?" />
        </div>
      </section>
    </>
  );
}
