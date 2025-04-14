const { SitemapStream, streamToPromise } = require("sitemap");
const fs = require("fs");

const links = [
  { url: "/", changefreq: "daily", priority: 1.0 },
  { url: "/services", changefreq: "weekly", priority: 0.8 },
  { url: "/contact", changefreq: "monthly", priority: 0.6 },
];

const stream = new SitemapStream({ hostname: "https://your-domain.com" });

links.forEach((link) => stream.write(link));
stream.end();

streamToPromise(stream).then((data) => {
  fs.writeFileSync("sitemap.xml", data.toString());
});
