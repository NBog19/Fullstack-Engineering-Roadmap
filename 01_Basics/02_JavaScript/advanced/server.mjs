import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { sales, report } from "./sales.mjs";

function json(res, status, value) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(value));
}

createServer(async (req, res) => {
  try {
    const url = new URL(req.url, "http://127.0.0.1:3000");
    if (req.method !== "GET") return json(res, 405, { error: "Method not allowed" });
    if (url.pathname === "/") {
      const html = await readFile(new URL("../report.html", import.meta.url));
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      return res.end(html);
    }
    if (url.pathname !== "/api/report") return json(res, 404, { error: "Not found" });
    const min = Number(url.searchParams.get("min") ?? "0");
    if (!Number.isFinite(min) || min < 0) return json(res, 400, { error: "Invalid min" });
    json(res, 200, report(sales, { min, region: url.searchParams.get("region") ?? "" }));
  } catch {
    json(res, 500, { error: "Internal server error" });
  }
}).listen(3000, "127.0.0.1", () => console.log("http://127.0.0.1:3000"));
