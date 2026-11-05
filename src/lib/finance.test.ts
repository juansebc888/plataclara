/**
 * Run with `npm test`. Uses Node's built-in test runner, no dependencies.
 * These numbers are what readers see; a regression here is a wrong
 * figure on the site.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  RATES,
  REFERENCE,
  compound,
  futureValue,
  monthlyToEA,
  simulateCdtSavings,
} from "./finance.ts";

const close = (a: number, b: number, eps = 1) =>
  assert.ok(Math.abs(a - b) <= eps, `${a} ≠ ${b}`);

test("monthlyToEA compounds twelve months", () => {
  close(monthlyToEA(0.02), 0.26824, 1e-5);
});

test("compound and futureValue", () => {
  close(compound(100, 0.1, 2), 121, 1e-9);
  assert.equal(futureValue(10, 0, 5), 50);
  close(futureValue(100, 0.1, 2), 210, 1e-9);
  assert.equal(futureValue(100, 0.1, 0), 0);
});

test("CDT savings: nothing is earned before the first CDT matures", () => {
  const pts = simulateCdtSavings({ deposit: 5000, periodsPerYear: 365, periods: 365 });
  assert.equal(pts.length, 366);
  const last = pts[365];
  assert.equal(last.saved, 5000 * 365);
  assert.equal(last.withCdt, last.saved);
});

test("CDT savings: a matured CDT pays interest net of withholding", () => {
  // $100.000 al mes: un CDT nuevo cada mes, el primero vence en el mes 13.
  const pts = simulateCdtSavings({
    deposit: 100_000,
    periodsPerYear: 12,
    periods: 13,
    annualEA: 0.1,
    minimum: 100_000,
    withholding: 0.04,
  });
  close(pts[12].withCdt, 1_200_000);
  close(pts[13].withCdt, 1_300_000 + 100_000 * 0.1 * 0.96);
});

test("CDT savings: money below the minimum waits at home", () => {
  const pts = simulateCdtSavings({
    deposit: 1000,
    periodsPerYear: 12,
    periods: 36,
    minimum: 1_000_000,
  });
  assert.equal(pts[36].withCdt, pts[36].saved);
});

test("CDT savings never loses money against the mattress", () => {
  for (const [deposit, perYear] of [[2000, 365], [20000, 52], [50000, 12]]) {
    const pts = simulateCdtSavings({ deposit, periodsPerYear: perYear, periods: perYear * 10 });
    for (const p of pts) assert.ok(p.withCdt >= p.saved - 1e-6);
    assert.ok(pts.at(-1)!.withCdt > pts.at(-1)!.saved);
  }
});

test("reference data is for the current year", () => {
  assert.equal(
    REFERENCE.year,
    new Date().getFullYear(),
    "REFERENCE en src/lib/finance.ts está desactualizado: revisa salario mínimo, usura y tasas."
  );
  assert.ok(RATES.cdtEA > 0 && RATES.cdtEA < 0.3);
});
