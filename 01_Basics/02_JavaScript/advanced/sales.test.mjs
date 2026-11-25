import test from "node:test";
import assert from "node:assert/strict";
import { sales, report } from "./sales.mjs";

test("all rows", () => {
  assert.equal(report(sales).total, 260000);
});
test("minimum filter", () => {
  const result = report(sales, { min: 80000 });
  assert.equal(result.rows.length, 2);
  assert.equal(result.total, 200000);
});
test("region filter", () => {
  assert.equal(report(sales, { region: "Сочи" }).total, 60000);
});
test("empty report", () => {
  assert.deepEqual(report(sales, { min: 200000 }), { rows: [], total: 0 });
});
test("invalid threshold", () => {
  assert.throws(() => report(sales, { min: NaN }), TypeError);
});
test("invalid row", () => {
  assert.throws(() => report([{ region: "X", amount: "100" }]), TypeError);
});
