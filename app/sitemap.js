export default function sitemap() {
  const base = "https://apexops.ai";
  const now = new Date();
  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/#features`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/#automation`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/#pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/#contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];
}
