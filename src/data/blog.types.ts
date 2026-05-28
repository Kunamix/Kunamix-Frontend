// ─── Types ────────────────────────────────────────────────────────────────────

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keyword: string;
  category: string;
  author: string;
  authorTitle: string;
  publishedAt: string;
  readTime: string;
  coverImage: string;
  tags: string[];
  content: {
    intro: string;
    sections: {
      id: string;
      heading: string;
      body: string;
    }[];
    conclusion: string;
    cta: {
      heading: string;
      subheading: string;
      buttonText: string;
      buttonLink: string;
      note?: string;
    };
  };
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface BlogsApiResponse {
  blogs: BlogPost[];
  pagination: PaginationMeta;
}
