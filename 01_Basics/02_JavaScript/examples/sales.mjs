import { pathToFileURL } from "node:url";

export const sales = [
  { region: "Москва", amount: 120000 },
  { region: "Казань", amount: 80000 },
  { region: "Сочи", amount: 60000 }
];

export function report(rows, { region = "", min = 0 } = {}) {
  if (!Number.isFinite(min) || min < 0) throw new TypeError("Некорректный порог");
  for (const row of rows) {
    if (typeof row.region !== "string" || !Number.isFinite(row.amount) || row.amount < 0)
      throw new TypeError("Некорректная строка");
  }
  const selected = rows.filter(row => (!region || row.region === region) && row.amount >= min);
  return { rows: selected, total: selected.reduce((sum, row) => sum + row.amount, 0) };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  console.log(report(sales));
  console.log(report(sales, { min: 80000 }));
}
