/** Shapes returned by the public blog API. */

export interface BlogCategory {
  id: string;
  name: string;
}

export interface Blog {
  slug: string;
  title: string;
  publishedAt: string;
  description?: string;
  contentHtml?: string;
  thumbnailUrl?: string;
  readTime?: number;
  category?: BlogCategory;
}

/** Card shape rendered by CommunityArticles. */
export interface BlogArticle {
  category: string;
  title: string;
  description: string;
  date: string;
  image: string;
  slug: string;
}
