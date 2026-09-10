/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.fanith.com",
  generateRobotsTxt: true,

  exclude: [
    "/test-modal",
    "/partnership",
    "/joinBeta",

    // Player pages are NOT listed here — they have their own sitemap tree
    // (/sitemap-players.xml, see additionalSitemaps below), split into
    // 5,000-URL chunks. Listing them here too would publish every player
    // twice.
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
    // Player URLs live in their own index, built alongside the player pages.
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
