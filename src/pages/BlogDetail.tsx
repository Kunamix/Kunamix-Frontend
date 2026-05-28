import { useParams } from "react-router-dom";
import { motion } from "motion/react";
import { useEffect, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import NotFound from "./NotFound";
import useSEOMeta from "@/hooks/useSEOMeta";
import { useBlogBySlug, useBlogs } from "@/hooks/useBlogs";

import BlogDetailHero from "@/components/blog/BlogDetailHero";
import BlogDetailContent from "@/components/blog/BlogDetailContent";
import BlogDetailNav from "@/components/blog/BlogDetailNav";
import BlogDetailTOC from "@/components/blog/BlogDetailTOC";
import BlogRelatedPosts from "@/components/blog/BlogRelatedPosts";

// ─── Skeleton ─────────────────────────────────────────────────────────────────
const BlogDetailSkeleton = () => (
  <div className="max-w-[800px] mx-auto px-4 pt-[140px] animate-pulse space-y-6">
    <div className="h-4 bg-muted rounded w-1/4" />
    <div className="h-8 bg-muted rounded w-3/4" />
    <div className="h-8 bg-muted rounded w-1/2" />
    <div className="aspect-[16/9] bg-muted rounded-[14px]" />
    <div className="space-y-3 pt-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className={`h-4 bg-muted rounded ${i % 3 === 0 ? "w-2/3" : "w-full"}`}
        />
      ))}
    </div>
  </div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────
const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { blog, loading, error } = useBlogBySlug(slug);

  // Fetch all blogs for related posts + prev/next nav
  const { blogs: allBlogs } = useBlogs({ limit: 50 });

  const blogIndex = useMemo(
    () => allBlogs.findIndex((b) => b.slug === slug),
    [allBlogs, slug],
  );

  const nextBlog =
    blogIndex !== -1 && blogIndex < allBlogs.length - 1
      ? allBlogs[blogIndex + 1]
      : null;
  const previousBlog = blogIndex > 0 ? allBlogs[blogIndex - 1] : null;

  useSEOMeta({
    title: blog?.metaTitle,
    description: blog?.metaDescription,
    canonical: blog ? `https://kunamix.com/blog/${blog.slug}` : undefined,
    ogTitle: blog?.title,
    ogDescription: blog?.metaDescription,
    ogImage: blog?.coverImage,
    ogUrl: blog ? `https://kunamix.com/blog/${blog.slug}` : undefined,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading)
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <BlogDetailSkeleton />
      </div>
    );

  if (error || !blog) return <NotFound />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen max-w-screen overflow-x-hidden bg-background"
    >
      <Header />

      <main id="main-content">
        <BlogDetailHero blog={blog} />

        <div className="max-w-[1200px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 mt-12 md:mt-16 lg:mt-20 flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-16">
          <article className="w-full lg:max-w-[720px] xl:max-w-[760px] shrink-0 min-w-0">
            <BlogDetailContent blog={blog} />
          </article>
          <aside className="hidden lg:block w-[280px] xl:w-[300px] shrink-0 sticky top-32 pb-10">
            <BlogDetailTOC blog={blog} />
          </aside>
        </div>

        <section className="border-t border-border bg-[#fcfcfc] dark:bg-zinc-950 mt-20 md:mt-32 pt-20 pb-24">
          <div className="max-w-[1200px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8">
            <BlogRelatedPosts currentBlog={blog} allBlogs={allBlogs} />
          </div>
        </section>

        <BlogDetailNav previousBlog={previousBlog} nextBlog={nextBlog} />
      </main>

      <Footer />
      <WhatsAppButton />
    </motion.div>
  );
};

export default BlogDetail;
