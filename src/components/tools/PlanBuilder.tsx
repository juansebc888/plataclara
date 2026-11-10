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
        <h2 className={styles.pickerTitle}>¿Qué quieres hacer? Marca lo que aplique.</h2>
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

        <div className={styles.actions}>
          <a
            className={`btn ${styles.print}`}
            href={ordered.length ? whatsappUrl(planText(ordered)) : undefined}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={ordered.length === 0}
          >
            Enviar a mi WhatsApp
          </a>
          <button
            type="button"
            className={`btn btn-ghost ${styles.secondary}`}
            onClick={() => saveImage(ordered)}
            disabled={ordered.length === 0}
          >
            Guardar como imagen
          </button>
          <button
            type="button"
            className={styles.printLink}
            onClick={() => window.print()}
            disabled={ordered.length === 0}
          >
            Imprimir
          </button>
        </div>
        <p className={styles.privacy}>
          En WhatsApp, mándatelo a ti mismo o a alguien de confianza. La
          imagen queda en tu galería.
        </p>
        <p className={styles.privacy}>Nada de esto sale de tu teléfono.</p>
      </div>

      {/* This is what actually goes on paper. */}
      <div>
      <p className={styles.previewLabel}>Así queda tu hoja</p>
      <div className={styles.sheet} id="plan-imprimible">
        <div className={styles.sheetHead}>
          <p className={styles.sheetBrand}>Plata Clara</p>
          <h2 className={styles.sheetTitle}>Mi plan</h2>
          <p className={styles.sheetName}>
            Nombre: ______________________ Fecha: ___________
          </p>
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
    </div>
  );
}

type GoalItem = (typeof GOALS)[number];

const FOOT =
  "Nada de esto cuesta plata. Si alguien te cobra por abrirte una cuenta, por gestionarte un subsidio o por consultar tu historial, es una estafa.";

/** The plan as plain text, for WhatsApp. */
function planText(goals: GoalItem[]): string {
  const blocks = goals.map(
    (g) => `*${g.label}*\n` + TASKS[g.key].map((t) => `☐ ${t}`).join("\n")
  );
  return ["*Mi plan* · Plata Clara", ...blocks, FOOT, "plataclara.co"].join("\n\n");
}

/** Opens WhatsApp with the plan ready; the reader picks who gets it. */
function whatsappUrl(text: string): string {
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

/** Draws the plan on a canvas and shares or downloads it as a PNG. */
async function saveImage(goals: GoalItem[]) {
  if (goals.length === 0) return;
  const W = 1080;
  const PAD = 72;
  const scale = 1;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const font = (size: number, weight = 400) =>
    `${weight} ${size}px system-ui, -apple-system, Roboto, Arial, sans-serif`;

  const wrap = (text: string, size: number, weight: number, maxW: number) => {
    ctx.font = font(size, weight);
    const lines: string[] = [];
    let line = "";
    for (const word of text.split(" ")) {
      const test = line ? `${line} ${word}` : word;
      if (ctx.measureText(test).width > maxW && line) {
        lines.push(line);
        line = word;
      } else line = test;
    }
    if (line) lines.push(line);
    return lines;
  };

  // Lay out once to measure height, then draw.
  type Row = { text: string; size: number; weight: number; color: string; x: number; gap: number; box?: boolean };
  const rows: Row[] = [];
  const push = (text: string, size: number, weight: number, color: string, gap: number, x = PAD, box = false) =>
    wrap(text, size, weight, W - x - PAD).forEach((t, i) =>
      rows.push({ text: t, size, weight, color, x, gap: i === 0 ? gap : 8, box: box && i === 0 })
    );

  push("Plata Clara", 30, 700, "#5b6672", 0);
  push("Mi plan", 72, 800, "#0a1725", 12);
  for (const g of goals) {
    push(g.label, 42, 700, "#0a1725", 48);
    for (const t of TASKS[g.key]) push(t, 34, 400, "#0a1725", 22, PAD + 56, true);
  }
  push(FOOT, 28, 400, "#4a5562", 56);
  push("plataclara.co", 28, 700, "#0a1725", 16);

  const height = rows.reduce((h, r) => h + r.gap + r.size * 1.3, PAD * 2);
  canvas.width = W * scale;
  canvas.height = Math.ceil(height) * scale;
  ctx.scale(scale, scale);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, W, height);

  let y = PAD;
  for (const r of rows) {
    y += r.gap + r.size * 1.3;
    ctx.font = font(r.size, r.weight);
    ctx.fillStyle = r.color;
    ctx.fillText(r.text, r.x, y - r.size * 0.3);
    if (r.box) {
      ctx.strokeStyle = "#0a1725";
      ctx.lineWidth = 3;
      ctx.strokeRect(PAD + 4, y - r.size * 1.05, 32, 32);
    }
  }

  const blob: Blob | null = await new Promise((res) => canvas.toBlob(res, "image/png"));
  if (!blob) return;
  const file = new File([blob], "mi-plan.png", { type: "image/png" });

  // Phones: open the share sheet (WhatsApp, Galería…). Otherwise download.
  if (navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file], title: "Mi plan" });
      return;
    } catch {
      /* cancelled: fall through to download */
    }
  }
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "mi-plan.png";
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
