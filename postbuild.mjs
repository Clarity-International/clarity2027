// Creates entry files for clean page addresses (e.g. /call-for-proposals) after "vite build".
import { readFileSync, writeFileSync } from "node:fs";

const SITE = "https://clarity2027.org";
const CLEAN_PATHS = ["call-for-proposals"];
const html = readFileSync("dist/index.html", "utf8");

for (const path of CLEAN_PATHS) {
  const page = html
    .replace(`<meta property="og:url" content="${SITE}/" />`, `<meta property="og:url" content="${SITE}/${path}" />`)
    .replace("</head>", `  <link rel="canonical" href="${SITE}/${path}" />\n  </head>`);
  // GitHub Pages serves /call-for-proposals from call-for-proposals.html without a redirect.
  writeFileSync(`dist/${path}.html`, page);
}
// Unknown addresses load the site (home page) instead of GitHub's 404 page.
writeFileSync("dist/404.html", html);
console.log(`postbuild: created ${CLEAN_PATHS.map((p) => p + ".html").join(", ")} and 404.html`);
