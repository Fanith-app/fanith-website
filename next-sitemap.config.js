/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.fanith.com",
  generateRobotsTxt: true,

  exclude: [
    "/test-modal",
    "/partnership",
    "/joinBeta",
    "/fanpedia",
  ],

  changefreq: "daily",
  priority: 0.7,

  sitemapSize: 5000,

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
}