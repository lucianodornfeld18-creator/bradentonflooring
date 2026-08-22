import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { dirname, join, relative, sep } from 'node:path';

const ROOT = process.cwd();
const DOMAIN = 'https://bradentonflooring.com';
const errors = [];
const warnings = [];

function walk(dir) {
  return readdirSync(dir).flatMap(name => {
    const full = join(dir, name);
    const rel = relative(ROOT, full).split(sep).join('/');
    if (rel.startsWith('.git/') || rel.startsWith('design-options/') || rel.startsWith('scripts/')) return [];
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

function pagePath(full) {
  const rel = relative(ROOT, dirname(full)).split(sep).join('/');
  return rel === '' ? '/' : `/${rel}/`;
}

function one(html, pattern) {
  return html.match(pattern)?.[1]?.trim() || '';
}

function cleanVisible(html) {
  return html
    .replace(/<head[\s\S]*?<\/head>/gi, ' ')
    .replace(/<header[\s\S]*?<\/header>/gi, ' ')
    .replace(/<footer[\s\S]*?<\/footer>/gi, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z0-9#]+;/gi, ' ')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function shingles(text, size = 5) {
  const words = text.split(' ');
  const set = new Set();
  for (let index = 0; index <= words.length - size; index += 1) set.add(words.slice(index, index + size).join(' '));
  return set;
}

function jaccard(a, b) {
  let intersection = 0;
  for (const item of a) if (b.has(item)) intersection += 1;
  return intersection / (a.size + b.size - intersection || 1);
}

function internalTargetExists(url) {
  const clean = url.split('#')[0].split('?')[0];
  if (clean === '' || clean === '/') return existsSync(join(ROOT, 'index.html'));
  const relativeUrl = clean.replace(/^\//, '');
  if (relativeUrl.endsWith('/')) return existsSync(join(ROOT, relativeUrl, 'index.html'));
  return existsSync(join(ROOT, relativeUrl));
}

const publicFiles = walk(ROOT).filter(full => full.endsWith('.html') && readFileSync(full, 'utf8').includes('aria-label="Bradenton Flooring home"'));
const indexFiles = publicFiles.filter(full => full.endsWith(`${sep}index.html`) || full === join(ROOT, 'index.html'));
const titles = new Map();
const canonicals = new Map();
const h1s = new Map();
const pageStats = [];

for (const full of publicFiles) {
  const html = readFileSync(full, 'utf8');
  const rel = relative(ROOT, full).split(sep).join('/');
  const title = one(html, /<title>([\s\S]*?)<\/title>/i);
  const description = one(html, /<meta\s+name="description"\s+content="([^"]*)"/i);
  const canonical = one(html, /<link\s+rel="canonical"\s+href="([^"]*)"/i);
  const h1 = one(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  const visible = cleanVisible(html);
  const words = visible ? visible.split(' ').length : 0;
  pageStats.push({ rel, path: pagePath(full), words, title, description, canonical, h1 });

  if (!title) errors.push(`${rel}: missing title`);
  if (!description) errors.push(`${rel}: missing meta description`);
  if (!canonical) errors.push(`${rel}: missing canonical`);
  if (!h1) errors.push(`${rel}: missing H1`);
  if (rel !== '404.html' && canonical !== `${DOMAIN}${pagePath(full)}`) errors.push(`${rel}: canonical does not match file path (${canonical})`);
  if (title.length > 68) warnings.push(`${rel}: title is ${title.length} characters`);
  if (description.length < 100 || description.length > 170) warnings.push(`${rel}: description is ${description.length} characters`);
  if ((html.match(/G-M454TH7VJM/g) || []).length !== 2) errors.push(`${rel}: Analytics ID should appear exactly twice`);
  if (html.includes('{{')) errors.push(`${rel}: unresolved placeholder`);
  if (/name="keywords"/i.test(html)) errors.push(`${rel}: meta keywords should not be used`);
  if (/"sameAs"\s*:\s*\[\]/.test(html)) warnings.push(`${rel}: empty sameAs array`);

  for (const [label, value, map] of [['title', title, titles], ['canonical', canonical, canonicals], ['H1', h1, h1s]]) {
    if (!value) continue;
    const prior = map.get(value);
    if (prior) errors.push(`${rel}: duplicate ${label} also used by ${prior}: ${value}`);
    else map.set(value, rel);
  }

  const ldBlocks = [...html.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
  if (rel !== '404.html' && ldBlocks.length === 0) errors.push(`${rel}: no JSON-LD`);
  for (const [index, match] of ldBlocks.entries()) {
    try { JSON.parse(match[1]); }
    catch (error) { errors.push(`${rel}: JSON-LD block ${index + 1} is invalid: ${error.message}`); }
  }

  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/gi)) {
    const value = match[1];
    if (value.startsWith('/') && !value.startsWith('//') && !internalTargetExists(value)) errors.push(`${rel}: broken internal reference ${value}`);
  }
  for (const match of html.matchAll(/https:\/\/bradentonflooring\.com(\/images\/[A-Za-z0-9._/-]+)/g)) {
    if (!internalTargetExists(match[1])) errors.push(`${rel}: missing absolute image ${match[1]}`);
  }
}

const expectedSitemap = new Set(indexFiles.map(full => `${DOMAIN}${pagePath(full)}`));
const sitemap = readFileSync(join(ROOT, 'sitemap.xml'), 'utf8');
const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
const sitemapSet = new Set(sitemapUrls);
if (sitemapUrls.length !== sitemapSet.size) errors.push('sitemap.xml: duplicate URLs');
for (const url of expectedSitemap) if (!sitemapSet.has(url)) errors.push(`sitemap.xml: missing ${url}`);
for (const url of sitemapSet) if (!expectedSitemap.has(url)) errors.push(`sitemap.xml: URL has no index page ${url}`);
if ([...sitemap.matchAll(/<lastmod>(.*?)<\/lastmod>/g)].some(match => !/^\d{4}-\d{2}-\d{2}$/.test(match[1]))) errors.push('sitemap.xml: invalid lastmod format');
if (/<priority>|<changefreq>/.test(sitemap)) warnings.push('sitemap.xml: priority/changefreq present even though Google ignores them');

for (const file of ['robots.txt', 'llms.txt', 'llms-full.txt', 'feed.xml', 'seo/keyword-map.json']) {
  if (!existsSync(join(ROOT, file))) errors.push(`missing technical file ${file}`);
}

const robots = readFileSync(join(ROOT, 'robots.txt'), 'utf8');
for (const bot of ['Googlebot', 'Bingbot', 'OAI-SearchBot', 'Claude-SearchBot', 'PerplexityBot']) {
  if (!robots.includes(`User-agent: ${bot}`)) errors.push(`robots.txt: ${bot} not explicitly covered`);
}
if (!robots.includes(`Sitemap: ${DOMAIN}/sitemap.xml`)) errors.push('robots.txt: sitemap declaration missing');

const keyFiles = walk(ROOT).filter(full => /^[a-f0-9]{32}\.txt$/.test(relative(ROOT, full).split(sep).join('/')));
if (keyFiles.length !== 1) errors.push(`IndexNow: expected one 32-character key file, found ${keyFiles.length}`);
else {
  const key = relative(ROOT, keyFiles[0]).replace(/\.txt$/, '');
  if (readFileSync(keyFiles[0], 'utf8').trim() !== key) errors.push('IndexNow: key file content does not match filename');
}

const newServicePages = pageStats.filter(page => /^(tile|hardwood|laminate|carpet|commercial-flooring)\/(lakewood-ranch|sarasota|parrish|palmetto|venice)\/index\.html$/.test(page.rel) && !['tile/lakewood-ranch/index.html', 'tile/sarasota/index.html'].includes(page.rel));
for (const page of newServicePages) if (page.words < 1150) warnings.push(`${page.rel}: ${page.words} visible words; target is at least 1,150 for this expansion`);
const cityHubs = pageStats.filter(page => /^flooring\/(lakewood-ranch|sarasota|parrish|palmetto|venice)\/index\.html$/.test(page.rel));
for (const page of cityHubs) if (page.words < 850) warnings.push(`${page.rel}: ${page.words} visible words; city hub target is at least 850`);
const newGuides = pageStats.filter(page => /^blog\/(concrete-slab-moisture-flooring-florida|best-flooring-for-florida-humidity|flooring-installation-timeline-florida|flooring-removal-subfloor-prep-cost|best-flooring-for-dogs-cats-florida|how-to-compare-flooring-estimates)\/index\.html$/.test(page.rel));
for (const page of newGuides) if (page.words < 900) warnings.push(`${page.rel}: ${page.words} visible words; editorial guide target is at least 900`);

const shinglePages = newServicePages.map(page => ({ ...page, shingles: shingles(cleanVisible(readFileSync(join(ROOT, page.rel), 'utf8'))) }));
let highestSimilarity = { score: 0, pair: [] };
for (let left = 0; left < shinglePages.length; left += 1) {
  for (let right = left + 1; right < shinglePages.length; right += 1) {
    const score = jaccard(shinglePages[left].shingles, shinglePages[right].shingles);
    if (score > highestSimilarity.score) highestSimilarity = { score, pair: [shinglePages[left].rel, shinglePages[right].rel] };
    if (score > 0.52) warnings.push(`high main-content similarity ${(score * 100).toFixed(1)}%: ${shinglePages[left].rel} <> ${shinglePages[right].rel}`);
  }
}

const summary = {
  publicHtmlPages: publicFiles.length,
  indexablePages: indexFiles.length,
  sitemapUrls: sitemapUrls.length,
  newServiceCityPages: newServicePages.length,
  cityHubs: cityHubs.length,
  newGuides: newGuides.length,
  newServiceWordRange: newServicePages.length ? [Math.min(...newServicePages.map(page => page.words)), Math.max(...newServicePages.map(page => page.words))] : [],
  cityHubWordRange: cityHubs.length ? [Math.min(...cityHubs.map(page => page.words)), Math.max(...cityHubs.map(page => page.words))] : [],
  guideWordRange: newGuides.length ? [Math.min(...newGuides.map(page => page.words)), Math.max(...newGuides.map(page => page.words))] : [],
  highestServicePageSimilarity: { percent: Number((highestSimilarity.score * 100).toFixed(1)), pair: highestSimilarity.pair },
  errors: errors.length,
  warnings: warnings.length
};

console.log(JSON.stringify(summary, null, 2));
if (warnings.length) console.log(`\nWARNINGS\n${warnings.map(item => `- ${item}`).join('\n')}`);
if (errors.length) {
  console.error(`\nERRORS\n${errors.map(item => `- ${item}`).join('\n')}`);
  process.exit(1);
}
