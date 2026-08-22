import { readFile, readdir, stat } from "node:fs/promises";
import { join, relative } from "node:path";

const outputDirectory = new URL("../out/", import.meta.url);
const expectedIndexablePages = 30;

async function walk(directory) {
  const entries = await readdir(directory);
  const files = await Promise.all(
    entries.map(async (entry) => {
      const path = join(directory.pathname, entry);
      return (await stat(path)).isDirectory() ? walk(new URL(`${entry}/`, directory)) : path;
    }),
  );
  return files.flat();
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function hasMeta(html, attribute, name) {
  const first = new RegExp(`<meta[^>]*${attribute}=["']${name}["'][^>]*content=["'][^"']+["'][^>]*>`, "i");
  const reversed = new RegExp(`<meta[^>]*content=["'][^"']+["'][^>]*${attribute}=["']${name}["'][^>]*>`, "i");
  return first.test(html) || reversed.test(html);
}

function hasLink(html, rel, extra = "") {
  const pattern = new RegExp(`<link[^>]*rel=["']${rel}["'][^>]*${extra}[^>]*>`, "i");
  return pattern.test(html);
}

function capture(html, pattern, label, route) {
  const match = html.match(pattern);
  assert(match?.[1], `${route}: could not read ${label}`);
  return match[1];
}

const files = await walk(outputDirectory);
const htmlFiles = files.filter(
  (file) =>
    file.endsWith("index.html") &&
    !file.endsWith("/404/index.html") &&
    !file.endsWith("/_not-found/index.html"),
);

assert(
  htmlFiles.length === expectedIndexablePages,
  `Expected ${expectedIndexablePages} indexable pages, found ${htmlFiles.length}`,
);

const titles = new Set();
const descriptions = new Set();
const canonicals = new Set();

for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  const route = `/${relative(outputDirectory.pathname, file).replace(/index\.html$/, "")}`;
  const h1Count = (html.match(/<h1(?:\s|>)/gi) ?? []).length;

  const title = capture(html, /<title>([^<]+)<\/title>/i, "title", route);
  const description = capture(
    html,
    /<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i,
    "description",
    route,
  );
  const canonical = capture(
    html,
    /<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i,
    "canonical",
    route,
  );

  assert(/<title>[^<]{10,}<\/title>/i.test(html), `${route}: missing unique title`);
  assert(hasMeta(html, "name", "description"), `${route}: missing description`);
  assert(hasLink(html, "canonical"), `${route}: missing canonical`);
  assert(/hreflang=["']en["']/i.test(html), `${route}: missing English hreflang`);
  assert(/hreflang=["']zh-CN["']/i.test(html), `${route}: missing Chinese hreflang`);
  assert(/hreflang=["']x-default["']/i.test(html), `${route}: missing x-default hreflang`);
  assert(hasMeta(html, "property", "og:title"), `${route}: missing og:title`);
  assert(hasMeta(html, "property", "og:description"), `${route}: missing og:description`);
  assert(hasMeta(html, "property", "og:image"), `${route}: missing og:image`);
  assert(hasMeta(html, "name", "twitter:card"), `${route}: missing Twitter card`);
  assert(/<script[^>]*type=["']application\/ld\+json["']/i.test(html), `${route}: missing JSON-LD`);
  assert(h1Count === 1, `${route}: expected one h1, found ${h1Count}`);
  assert(!/Create Next App/i.test(html), `${route}: starter metadata remains`);
  assert(!/noindex/i.test(html), `${route}: unexpectedly marked noindex`);
  assert(!titles.has(title), `${route}: duplicate title: ${title}`);
  assert(!descriptions.has(description), `${route}: duplicate description`);
  assert(!canonicals.has(canonical), `${route}: duplicate canonical: ${canonical}`);

  titles.add(title);
  descriptions.add(description);
  canonicals.add(canonical);

  const expectedLanguage = route.startsWith("/zh-cn/") || route === "/zh-cn/" ? "zh-CN" : "en";
  assert(
    new RegExp(`<html[^>]*lang=["']${expectedLanguage}["']`, "i").test(html),
    `${route}: expected html lang ${expectedLanguage}`,
  );
}

for (const required of ["robots.txt", "sitemap.xml", "manifest.webmanifest", "og.png"]) {
  assert(files.some((file) => file.endsWith(`/${required}`)), `Missing out/${required}`);
}

const sitemap = await readFile(new URL("sitemap.xml", outputDirectory), "utf8");
assert(
  (sitemap.match(/<url>/g) ?? []).length === expectedIndexablePages,
  `Sitemap must contain ${expectedIndexablePages} URLs`,
);
assert(
  (sitemap.match(/hreflang="zh-CN"/g) ?? []).length === expectedIndexablePages,
  "Sitemap is missing language alternates",
);

console.log(`SEO check passed: ${htmlFiles.length} static pages, complete metadata, JSON-LD, hreflang, robots, and sitemap.`);
