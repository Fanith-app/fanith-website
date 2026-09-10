/** @type {import('next-sitemap').IConfig} */
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
    additionalSitemaps: ["https://www.fanith.com/sitemap-players.xml"],
  },

  // For adding dynamic blogs
  additionalPaths: async (config) => {
    try {
      const res = await fetch(
        "https://live.fanith.com/api/v1/public/blogs?page=1&limit=100"
      );

      const data = await res.json();

      // ✅ safe check
      if (!data?.data?.blogs) {
        console.error("Invalid API response:", data);
        return [];
      }

      return data.data.blogs.map((blog) => ({
        loc: `/blog/${blog.slug}`,
        changefreq: "daily",
        priority: 0.8,
        lastmod: blog.publishedAt,
      }));
    } catch (error) {
      console.error("Sitemap fetch error:", error);
      return []; // 🔥 prevent build crash
    }
  },
};
