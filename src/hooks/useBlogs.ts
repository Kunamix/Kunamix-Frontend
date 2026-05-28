import { useState, useEffect, useCallback } from "react";
import { axiosInstance } from "@/lib/axios";
import type { BlogPost, PaginationMeta } from "@/data/blog.types";

interface UseBlogsOptions {
  page?: number;
  limit?: number;
  category?: string | null;
}

interface UseBlogsReturn {
  blogs: BlogPost[];
  pagination: PaginationMeta | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useBlogs = ({
  page = 1,
  limit = 10,
  category = null,
}: UseBlogsOptions = {}): UseBlogsReturn => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trigger, setTrigger] = useState(0);

  const refetch = useCallback(() => setTrigger((t) => t + 1), []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    const params: Record<string, string | number> = { page, limit };
    if (category) params.category = category;

    axiosInstance
      .get("/blogs", { params })
      .then((res) => {
        if (cancelled) return;
        setBlogs(res.data.data.blogs);
        setPagination(res.data.data.pagination);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(
          err?.response?.data?.message ?? "Failed to load blogs. Try again."
        );
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [page, limit, category, trigger]);

  return { blogs, pagination, loading, error, refetch };
};

// ─── Single blog by slug ──────────────────────────────────────────────────────

interface UseBlogBySlugReturn {
  blog: BlogPost | null;
  loading: boolean;
  error: string | null;
}

export const useBlogBySlug = (slug: string | undefined): UseBlogBySlugReturn => {
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    setBlog(null);

    axiosInstance
      .get(`/blogs/${slug}`)
      .then((res) => {
        if (cancelled) return;
        setBlog(res.data.data);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(
          err?.response?.status === 404
            ? "Blog not found."
            : "Failed to load blog."
        );
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  return { blog, loading, error };
};