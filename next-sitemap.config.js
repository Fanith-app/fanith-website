/** @type {import('next-sitemap').IConfig} */
const isDevPreview = process.env.NEXT_PUBLIC_DEPLOY_ENV === "dev";
const publicApiBaseUrl = (
  process.env.NEXT_PUBLIC_API_URL || "https://live.fanith.com/api/v1/"
).replace(/\/+$/, "");
const BLOG_PAGE_SIZE = 100;
const MAX_BLOG_PAGES = 1000;

async function fetchPublicBlogs() {
  const blogs = [];

  for (let page = 1; page <= MAX_BLOG_PAGES; page += 1) {
    const res = await fetch(
      `${publicApiBaseUrl}/public/blogs?page=${page}&limit=${BLOG_PAGE_SIZE}`
    );

    if (!res.ok) {
      throw new Error(`Blog sitemap fetch failed on page ${page}: HTTP ${res.status}`);
    }

    const payload = await res.json();
    const pageBlogs = payload?.data?.data;
    const meta = payload?.data?.meta;

    if (!Array.isArray(pageBlogs)) {
      throw new Error(`Blog sitemap response has no data array on page ${page}`);
    }

    blogs.push(...pageBlogs);

    const hasNext =
      meta?.hasNext ??
      (Number.isInteger(meta?.totalPages)
        ? page < meta.totalPages
        : pageBlogs.length === BLOG_PAGE_SIZE);

    if (!hasNext) return blogs;
  }

  throw new Error(`Blog sitemap exceeded the ${MAX_BLOG_PAGES}-page safety limit`);
}

module.exports = {
  siteUrl: "https://www.fanith.com",
  generateRobotsTxt: true,

  exclude: [
    "/test-modal",
    "/partnership",
    "/joinBeta",

    // Player pages are NOT listed here — they live in their own runtime
    // sitemap (see additionalSitemaps below). next-sitemap only sees pages
    // that exist in the build output, which for players is just the ~100
    // prebuilt top-of-leaderboard pages; listing those would publish an
    // arbitrary 100 out of ~25k and hide the rest.
    "/cricket/*",
    "/football/*",
    "/kabaddi/*",

    // The chunk routes are reachable through the player sitemap index; they
    // are sitemaps, not pages.
    "/sitemap-players.xml",
    "/sitemap-players/*",
  ],

  changefreq: "daily",
  priority: 0.7,

  sitemapSize: 5000,

  robotsTxtOptions: {
    // ~25k player URLs are generated at request time rather than at build
    // time, so Google is pointed at the live index instead.
    additionalSitemaps: isDevPreview
      ? []
      : ["https://www.fanith.com/sitemap-players.xml"],
    ...(isDevPreview
      ? { policies: [{ userAgent: "*", disallow: "/" }] }
      : {}),
  },

  // For adding dynamic blogs
  additionalPaths: async () => {
    const blogs = await fetchPublicBlogs();

    return blogs.map((blog) => ({
      loc: `/blog/${blog.slug}`,
      changefreq: "daily",
      priority: 0.8,
      lastmod: blog.publishedAt,
    }));
  },
};
