import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { createServer } from "node:http";

const PORT = 4173;
const ROOT = join(process.cwd(), "dist");

const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

function safePath(urlPath) {
  const cleanPath = normalize(decodeURIComponent(urlPath).replace(/^\/+/, ""));
  const filePath = join(ROOT, cleanPath);

  if (!filePath.startsWith(ROOT)) {
    return null;
  }

  return filePath;
}

createServer((req, res) => {
  const requestedPath = req.url === "/" ? "/index.html" : req.url || "/index.html";
  const filePath = safePath(requestedPath);

  if (!filePath || !existsSync(filePath)) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
    return;
  }

  const stats = statSync(filePath);

  if (stats.isDirectory()) {
    res.writeHead(302, { Location: `${requestedPath.replace(/\/$/, "")}/index.html` });
    res.end();
    return;
  }

  const mimeType = MIME_TYPES[extname(filePath).toLowerCase()] || "application/octet-stream";
  res.writeHead(200, {
    "Content-Type": mimeType,
    "Cache-Control": "no-cache",
  });

  createReadStream(filePath).pipe(res);
}).listen(PORT, "127.0.0.1", () => {
  console.log(`Wedding invite available at http://127.0.0.1:${PORT}`);
});
