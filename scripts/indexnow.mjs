// Tells Bing (which powers ChatGPT search) and other IndexNow engines that pages changed.
// Run after a deploy is live: `npm run indexnow` (all sitemap URLs) or `npm run indexnow -- /guides/new-post`.
const HOST = "www.designnext.co";
const KEY = "9b04e844dcd7e040d4b30fcd67366439";

const paths = process.argv.slice(2);
const urlList = paths.length
  ? paths.map((p) => `https://${HOST}${p.startsWith("/") ? p : `/${p}`}`)
  : [...(await (await fetch(`https://${HOST}/sitemap.xml`)).text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
});
console.log(`IndexNow: ${res.status} ${res.statusText} for ${urlList.length} URL(s)`);
if (!res.ok) process.exit(1);
