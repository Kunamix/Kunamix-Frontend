import { useState, useMemo, useEffect } from "react";
import { motion } from "motion/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import useSEOMeta from "@/hooks/useSEOMeta";
import { useBlogs } from "@/hooks/useBlogs";

import BlogHero from "@/components/blog/BlogHero";
import BlogSearchFilter from "@/components/blog/BlogSearchFilter";
import BlogGrid from "@/components/blog/BlogGrid";
import BlogFeaturedPost from "@/components/blog/BlogFeaturedPost";

// ─── Skeleton loader ──────────────────────────────────────────────────────────
const BlogSkeleton = () => (
  <div className="pb-24 px-4 xs:px-5 sm:px-6 md:px-5 max-w-[1280px] mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="rounded-[14px] border border-border overflow-hidden animate-pulse"
        >
          <div className="aspect-[16/9] bg-muted" />
          <div className="p-5 space-y-3">
            <div className="h-3 bg-muted rounded w-1/3" />
            <div className="h-5 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-2/3" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────
const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const { blogs, pagination, loading, error } = useBlogs({
    page,
    limit: 10,
    category: selectedCategory,
  });

  // Reset to page 1 when category changes
  useEffect(() => {
    setPage(1);
  }, [selectedCategory]);

  useSEOMeta({
    title: "Blog | Kunamix - MVP Development & Startup Guides",
    description:
      "Read our latest articles about MVP development, startups, technology stack, and app development tips from industry experts.",
    canonical: "https://kunamix.com/blog",
    ogTitle: "Blog | Kunamix Digital Solutions",
    ogDescription:
      "Insights, guides, and tutorials on MVP development, startups, and technology",
    ogUrl: "https://kunamix.com/blog",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Client-side search filter (on top of server-side category filter)
  const filteredBlogs = useMemo(() => {
    if (!searchTerm) return blogs;
    const term = searchTerm.toLowerCase();
    return blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(term) ||
        blog.metaDescription.toLowerCase().includes(term) ||
        blog.keyword.toLowerCase().includes(term) ||
        blog.tags.some((tag) => tag.toLowerCase().includes(term)),
    );
  }, [blogs, searchTerm]);

  const isFiltering = !!searchTerm || !!selectedCategory;
  const featuredPost = blogs[0] ?? null;
  const gridBlogs = isFiltering
    ? filteredBlogs
    : filteredBlogs.filter((b) => featuredPost && b.id !== featuredPost.id);

  // Derive unique categories from loaded blogs for the filter dropdown
  const CATEGORIES = useMemo(
    () => [...new Set(blogs.map((b) => b.category))].sort(),
    [blogs],
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen max-w-screen overflow-x-hidden bg-background"
    >
      <Header />

      <main id="main-content">
        <BlogHero />

        <BlogSearchFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={CATEGORIES}
        />

        {/* Error state */}
        {error && !loading && (
          <div className="text-center py-20 px-4">
            <p className="text-muted-foreground text-[1rem] mb-2">{error}</p>
            <button
              onClick={() => setPage(1)}
              className="text-primary text-[0.875rem] font-semibold underline"
            >
              Try again
            </button>
          </div>
        )}

        {/* Loading state */}
        {loading && <BlogSkeleton />}

        {/* Content */}
        {!loading && !error && (
          <>
            {!isFiltering && featuredPost && (
              <BlogFeaturedPost blog={featuredPost} />
            )}
            <BlogGrid blogs={gridBlogs} />

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && !searchTerm && (
              <div className="flex items-center justify-center gap-3 pb-16">
                <button
                  disabled={!pagination.hasPrevPage}
                  onClick={() => setPage((p) => p - 1)}
                  className="px-4 py-2 rounded-full border border-border text-[0.875rem] font-medium text-foreground disabled:opacity-40 hover:border-primary/40 transition-colors"
                >
                  ← Previous
                </button>
                <span className="text-[0.875rem] text-muted-foreground">
                  Page {pagination.page} of {pagination.totalPages}
                </span>
                <button
                  disabled={!pagination.hasNextPage}
                  onClick={() => setPage((p) => p + 1)}
                  className="px-4 py-2 rounded-full border border-border text-[0.875rem] font-medium text-foreground disabled:opacity-40 hover:border-primary/40 transition-colors"
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
      <WhatsAppButton />
    </motion.div>
  );
};

export default BlogPage;
