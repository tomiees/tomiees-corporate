// ビルド後に、ルートごとの <head>（title / description / OGP）を差し替えた HTML を書き出す。
// LINE や X のクローラは JS を実行しないので、ページごとの OGP は静的な HTML に
// 焼き込んでおく必要がある。アプリ本体は共通のバンドルをそのまま使う。
//
//   dist/public/index.html          … "/" 用（そのまま上書き）
//   dist/public/company.html        … "/company" 用（vercel.json の cleanUrls で拡張子なしで配信）
//   dist/public/cheesy/terms.html   … "/cheesy/terms" 用
//
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "dist/public");
const meta = JSON.parse(readFileSync(join(root, "client/src/site-meta.json"), "utf8"));
const template = readFileSync(join(outDir, "index.html"), "utf8");

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function headFor(path, m) {
  const url = meta.origin + path;
  const image = meta.origin + m.image + "?v=2";
  return [
    `<title>${esc(m.title)}</title>`,
    `<meta name="description" content="${esc(m.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(meta.siteName)}" />`,
    `<meta property="og:locale" content="ja_JP" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${esc(m.title)}" />`,
    `<meta property="og:description" content="${esc(m.description)}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="cheesy のロゴとピンクの使い捨てカメラ" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(m.title)}" />`,
    `<meta name="twitter:description" content="${esc(m.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
  ].join("\n    ");
}

const re = /<!--meta:start-->[\s\S]*?<!--meta:end-->/;
if (!re.test(template)) {
  throw new Error("index.html に <!--meta:start--> … <!--meta:end--> がありません");
}

for (const [path, m] of Object.entries(meta.routes)) {
  const html = template.replace(re, `<!--meta:start-->\n    ${headFor(path, m)}\n    <!--meta:end-->`);
  const file = path === "/" ? "index.html" : path.replace(/^\//, "") + ".html";
  mkdirSync(dirname(join(outDir, file)), { recursive: true });
  writeFileSync(join(outDir, file), html);
  console.log(`prerendered head: ${path} → ${file}`);
}
