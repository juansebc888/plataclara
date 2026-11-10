import { test } from "node:test";
import assert from "node:assert/strict";
import { money, parseAmount, percent } from "./format.ts";

test("money formats pesos and negatives", () => {
  assert.equal(money(1234), "$1.234");
  assert.equal(money(1234.5), "$1.235");
  assert.equal(money(-1234.5), "-$1.235");
  assert.equal(money(-1234), "-$1.234");
  assert.equal(money(-0.4), "$0");
  assert.equal(money(-0), "$0");
  assert.equal(money(0), "$0");
  assert.equal(money(6_040_129), "$6.040.129");
  assert.equal(money(NaN), "$0");
});

test("percent rounds the decimal value, not the float", () => {
  assert.equal(percent(0.105), "10,5%");
  assert.equal(percent(0.04, 0), "4%");
  assert.equal(percent(0.2834, 2), "28,34%");
  assert.equal(percent(0.01005, 2), "1,01%");
  assert.equal(percent(0.025), "2,5%");
  assert.equal(percent(-0.0001), "0,0%");
  assert.equal(percent(-0.05, 0), "-5%");
  assert.equal(percent(NaN), "—");
});

test("parseAmount reads Colombian amounts", () => {
  assert.deepEqual(parseAmount("100.000"), { value: 100000, negative: false, empty: false });
  assert.equal(parseAmount("1.500,50").value, 1500);
  assert.equal(parseAmount("$ 20.000").value, 20000);
  assert.equal(parseAmount("007").value, 7);
  const neg = parseAmount("-500");
  assert.equal(neg.value, 500);
  assert.equal(neg.negative, true);
  assert.equal(parseAmount("").empty, true);
  assert.equal(parseAmount("abc").empty, true);
});
