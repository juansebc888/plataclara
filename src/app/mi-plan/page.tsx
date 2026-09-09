import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { LazyPlan } from "@/components/tools/LazyTools";
import shared from "../subpage.module.css";

export const metadata: Metadata = {
  title: "Mi plan",
  description:
    "Arma tu plan en una hoja, imprímelo y llévatelo. Sin registro, sin datos y sin necesidad de volver a entrar.",
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Llévatelo en papel"
        title="Mi plan en una hoja"
        intro="Marca lo que quieres hacer y te armamos una lista concreta. Imprímela y pégala donde la veas. No hace falta volver a entrar ni tener datos."
        tone="blue"
        trail={[{ label: "Mi plan" }]}
      />

      <section className={shared.body}>
        <div className="shell">
          <Reveal>
            <LazyPlan />
          </Reveal>
        </div>
      </section>
    </>
  );
}
