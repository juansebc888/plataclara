import Link from "next/link";
import { CategoryGrid } from "@/components/ui/CategoryGrid";
import { Facts } from "@/components/ui/Facts";
import { Reveal } from "@/components/ui/Reveal";
import { LazyAhorro } from "@/components/tools/LazyTools";
import { ArrowRight } from "@/components/ui/Icon";
import styles from "./page.module.css";

/** Server Component. */
export default function Home() {
  return (
    <>
      <section className={styles.hero}>
        <div className={`shell ${styles.heroGrid}`}>
          <div>
            <p className="eyebrow rise">Guías gratuitas · Colombia</p>
            <h1 className={`h1 ${styles.title}`}>
              Tu plata, explicada{" "}
              <span className="underline-mark">sin tanta vuelta.</span>
            </h1>
            <p className="sub">
              Cuentas, presupuesto, crédito y deudas — explicado para quien
              cobra en efectivo, sin contrato y sin haber pisado nunca un banco.
            </p>
            <div className={styles.ctaRow}>
              <Link href="/empezando" className="btn">
                Empezar aquí
                <ArrowRight />
              </Link>
              <Link href="/programas" className="btn btn-ghost">
                Programas del gobierno
              </Link>
            </div>
          </div>

          <div className={styles.heroViz}>
            <LazyAhorro />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <Reveal>
            <div className={styles.head}>
              <div>
                <p className="eyebrow">Seis temas</p>
                <h2 className="h2">¿Por dónde quieres empezar?</h2>
              </div>
              <p className="lede">
                No hay que leerlo todo. Cada tema arranca con algo concreto que
                puedes hacer esta semana.
              </p>
            </div>
          </Reveal>
          <CategoryGrid />
        </div>
      </section>

      <Facts />
    </>
  );
}
