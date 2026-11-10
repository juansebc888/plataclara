import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { LazyPlan } from "@/components/tools/LazyTools";
import shared from "../subpage.module.css";

export const metadata: Metadata = {
  title: "Mi plan",
  description:
    "Arma tu plan en una hoja y llévatelo en el WhatsApp, como imagen o impreso. Sin registro y sin datos.",
  openGraph: {
    title: "Mi plan",
    description: "Arma tu plan en una hoja, imprímelo y llévatelo. Sin registro, sin datos y sin necesidad de volver a entrar.",
    url: "/mi-plan",
  },
  alternates: { canonical: "/mi-plan" },
};

export default function Page() {
  return (
    <>
      <PageHero
        title="Mi plan en una hoja"
        answer={<p>Marca lo que quieres hacer y sale una lista. Mándatela al WhatsApp o guárdala como imagen. No pide datos.</p>}
        tone="blue"
        trail={[{ label: "Mi plan" }]}
      />

      <section className={shared.body}>
        <div className="shell">
          <LazyPlan />
        </div>
      </section>
    </>
  );
}
