// utils/trackerScanner.js
const axios = require('axios');
const cheerio = require('cheerio');
const path = require('path');
const trackers = require('../data/trackers.json');

function normalizeUrl(u, base) {
  try { return new URL(u, base).href; } catch { return null; }
}

function toHostname(u) {
  try { return new URL(u).hostname; } catch { return null; }
}

function domainMatches(hostname, trackerDomain) {
  if (!hostname || !trackerDomain) return false;
  return hostname === trackerDomain || hostname.endsWith('.' + trackerDomain);
}

function summarize(trackHits) {
  const byVendor = {};
  const byCategory = {};
  let high = 0, med = 0, low = 0;

  trackHits.forEach(t => {
    byVendor[t.name] = (byVendor[t.name] || 0) + t.occurrences;
    byCategory[t.category] = (byCategory[t.category] || 0) + t.occurrences;

    if (t.severity === 'High') high += t.occurrences;
    else if (t.severity === 'Medium') med += t.occurrences;
    else low += t.occurrences;
  });

  return {
    vendorsTop: Object.entries(byVendor).sort((a,b)=>b[1]-a[1]).slice(0,5)
      .map(([name,count])=>({ name, count })),
    categories: Object.entries(byCategory).map(([category,count])=>({ category, count })),
    severity: { high, medium: med, low }
  };
}

async function scanTrackers(targetUrl) {
  // 1) Fetch HTML
  const res = await axios.get(targetUrl, { timeout: 20000, headers: { 'User-Agent': 'PrivacyGuard/1.0' } });
  const html = res.data;

  // 2) Parse resources
  const $ = cheerio.load(html);
  const candidates = new Set();

  const pushAttr = (selector, attr) => {
    $(selector).each((_, el) => {
      const val = $(el).attr(attr);
      const abs = normalizeUrl(val, targetUrl);
      if (abs) candidates.add(abs);
    });
  };

  // Common resource locations
  pushAttr('script[src]', 'src');
  pushAttr('link[href]', 'href');
  pushAttr('img[src]', 'src');
  pushAttr('iframe[src]', 'src');
  pushAttr('source[src]', 'src');
  pushAttr('video[src]', 'src');
  pushAttr('audio[src]', 'src');

  // 3) Hostnames for all resources
  const resources = [...candidates];
  const hosts = resources.map(toHostname).filter(Boolean);

  // 4) Match against tracker list
  const hitsMap = new Map(); // key: trackerDomain
  for (const host of hosts) {
    for (const t of trackers) {
      if (domainMatches(host, t.domain)) {
        const key = t.domain;
        if (!hitsMap.has(key)) {
          hitsMap.set(key, { ...t, domain: t.domain, occurrences: 0, matchedResources: new Set() });
        }
        const item = hitsMap.get(key);
        item.occurrences += 1;
        item.matchedResources.add(host);
      }
    }
  }

  const hits = [...hitsMap.values()].map(h => ({
    name: h.name,
    domain: h.domain,
    category: h.category,
    severity: h.severity,
    occurrences: h.occurrences,
    matchedHosts: [...h.matchedResources]
  })).sort((a,b)=> b.occurrences - a.occurrences);

  // 5) Build response
  return {
    scannedUrl: targetUrl,
    source: 'Local list (offline)',
    totalResources: resources.length,
    totalTrackers: hits.length,
    summary: summarize(hits),
    trackers: hits
  };
}

module.exports = { scanTrackers };
