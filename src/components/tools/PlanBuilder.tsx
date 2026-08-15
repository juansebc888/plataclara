"use client";

import { useState } from "react";
import styles from "./PlanBuilder.module.css";

/**
 * Client Component, lazy-loaded.
 *
 * Builds a one-page plan the reader can print and take home. Nothing is
 * stored or sent anywhere: the whole point is that it works on paper,
 * offline, after the session is over.
 */

type Goal = "cuenta" | "ahorrar" | "deuda" | "negocio";

const GOALS: { key: Goal; label: string; sub: string }[] = [
  { key: "cuenta", label: "Abrir mi primera cuenta", sub: "Todavía no tengo cuenta en ningún banco" },
  { key: "ahorrar", label: "Empezar a guardar", sub: "Quiero separar algo aunque sea poco" },
  { key: "deuda", label: "Salir de una deuda", sub: "Le debo a un prestamista y quiero salir" },
  { key: "negocio", label: "Conseguir plata para mi negocio", sub: "Necesito capital para trabajar" },
];

const TASKS: Record<Goal, string[]> = {
  cuenta: [
    "Revisar que mi cédula esté vigente",
    "Escoger una entidad y preguntar por la cuenta de trámite simplificado",
    "Preguntar si cobra cuota de manejo (no debería)",
    "Preguntar cuál es el tope de saldo y de retiro al mes",
    "Abrir la cuenta",
  ],
  ahorrar: [
    "Escribir cuánto voy a separar cada vez: $____________",
    "Decidir cuándo lo separo (el mismo día que entra la plata)",
    "Guardarlo aparte, donde no se mezcle con lo del diario",
    "Al mes, revisar si el número que escogí sí me aguantó",
    "Preguntar por un CDT cuando ya tenga un monto junto",
  ],
  deuda: [
    "Anotar cuánto debo en total y cuánto pago por cuota",
    "Calcular cuánto llevo pagado hasta hoy",
    "Preguntar en una entidad formal si puedo refinanciar",
    "No pedir un préstamo nuevo para pagar el anterior",
    "Si hay amenazas: denunciar. Deber no le da derecho a nadie a asustarme",
  ],
  negocio: [
    "Escribir en una frase para qué necesito la plata",
    "Anotar cuánto vendo en una semana normal",
    "Preguntar en un banco o cooperativa si manejan microcrédito",
    "Buscar si hay una convocatoria abierta de capital semilla",
    "Antes de firmar: preguntar cuota, número de cuotas y total a pagar",
  ],
};

export function PlanBuilder() {
  const [picked, setPicked] = useState<Goal[]>(["cuenta"]);

  const toggle = (g: Goal) =>
    setPicked((p) => (p.includes(g) ? p.filter((x) => x !== g) : [...p, g]));

  const ordered = GOALS.filter((g) => picked.includes(g.key));

  return (
    <div className={styles.wrap}>
      <div className={styles.picker}>
        <p className={styles.pickerTitle}>¿Qué quieres hacer? Marca lo que aplique.</p>
        <div className={styles.goals}>
          {GOALS.map((g) => {
            const on = picked.includes(g.key);
            return (
              <button
                key={g.key}
                type="button"
                onClick={() => toggle(g.key)}
                aria-pressed={on}
                className={`${styles.goal} ${on ? styles.goalOn : ""}`}
              >
                <span className={styles.box} aria-hidden="true">
                  {on ? "✓" : ""}
                </span>
                <span>
                  <strong>{g.label}</strong>
                  <em>{g.sub}</em>
                </span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          className={`btn ${styles.print}`}
          onClick={() => window.print()}
          disabled={ordered.length === 0}
        >
          Imprimir mi plan
        </button>
        <p className={styles.privacy}>
          No guardamos nada de esto. Se imprime y ya.
        </p>
      </div>

      {/* This is what actually goes on paper. */}
      <div className={styles.sheet} id="plan-imprimible">
        <div className={styles.sheetHead}>
          <p className={styles.sheetBrand}>Plata Clara</p>
          <p className={styles.sheetTitle}>Mi plan</p>
          <p className={styles.sheetName}>Nombre: ______________________________</p>
        </div>

        {ordered.length === 0 ? (
          <p className={styles.empty}>Marca al menos una cosa arriba.</p>
        ) : (
          ordered.map((g) => (
            <section key={g.key} className={styles.block}>
              <h3 className={styles.blockTitle}>{g.label}</h3>
              <ul className={styles.tasks}>
                {TASKS[g.key].map((t) => (
                  <li key={t}>
                    <span className={styles.check} aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
            </section>
          ))
        )}

        <div className={styles.sheetFoot}>
          <p>
            <strong>Nada de esto cuesta plata.</strong> Si alguien te cobra por
            abrirte una cuenta, por gestionarte un subsidio o por consultar tu
            historial, es una estafa.
          </p>
          <p className={styles.sheetUrl}>plataclara.co</p>
        </div>
      </div>
    </div>
  );
}
