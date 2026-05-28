// src/components/home/Testimonials.tsx
import { motion } from "motion/react";
import { useTestimonials } from "@/hooks/useTestimonials";

const StarIcon = ({ filled = true }: { filled?: boolean }) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill={filled ? "#D97706" : "#E5E7EB"}
    aria-hidden="true"
  >
    <path d="M6 1l1.3 3.9H11L8.1 7.1l1 3.9L6 9.1 2.9 11l1-3.9L1 4.9h3.7z" />
  </svg>
);

// Shimmering Skeleton for loading state
const TestimonialSkeleton = () => (
  <div className="bg-card p-7 sm:p-10 flex flex-col animate-pulse">
    <div className="flex gap-[0.2rem] mb-5">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="w-3 h-3 bg-muted rounded-sm" />
      ))}
    </div>
    <div className="flex-1 space-y-3 mb-10">
      <div className="h-4 bg-muted rounded-md w-full" />
      <div className="h-4 bg-muted rounded-md w-[90%]" />
      <div className="h-4 bg-muted rounded-md w-[80%]" />
      <div className="h-4 bg-muted rounded-md w-[60%]" />
    </div>
    <div className="border-t border-border mb-6" />
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-muted shrink-0" />
      <div className="space-y-2">
        <div className="h-3 bg-muted rounded-md w-24" />
        <div className="h-2 bg-muted rounded-md w-32" />
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  const { testimonials, isLoading, error } = useTestimonials();

  // Helper to extract initials from full name
  const getInitials = (name: string) => {
    return name
      ? name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .substring(0, 2)
          .toUpperCase()
      : "U";
  };

  return (
    <section
      className="px-4 xs:px-5 sm:px-6 md:px-5 py-20 md:py-28 max-w-[1280px] mx-auto"
      id="testimonials"
    >
      {/* Header */}
      <motion.div
        className="mb-14 md:mb-16"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="section-label">
          <span className="section-label-line" />
          <span className="section-label-tag">Client Feedback</span>
        </div>
        <h2 className="font-display font-bold leading-[1.05] text-[clamp(2rem,4vw,3.5rem)]">
          What clients say
        </h2>
        <p
          className="font-display italic text-muted-foreground font-light text-[clamp(1.25rem,2.5vw,2rem)]"
          style={{ fontStyle: "italic" }}
        >
          after we ship
        </p>
      </motion.div>

      {/* Grid */}
      <div
        className="grid grid-cols-1 md:grid-cols-3 border border-border rounded-[16px] overflow-hidden"
        style={{ gap: "1px", background: "hsl(var(--border))" }}
      >
        {/* Loading State: Show 3 Skeletons */}
        {isLoading && (
          <>
            <TestimonialSkeleton />
            <TestimonialSkeleton />
            <TestimonialSkeleton />
          </>
        )}

        {/* Error State: Fallback UI just in case API goes down */}
        {error && !isLoading && (
          <div className="col-span-1 md:col-span-3 p-10 text-center bg-card">
            <p className="text-muted-foreground">
              Unable to load latest reviews at this time.
            </p>
          </div>
        )}

        {/* Success State: Render dynamic testimonials */}
        {!isLoading &&
          !error &&
          testimonials.length > 0 &&
          testimonials.map((t, i) => {
            const name = t.answers?.["Full Name"] || t.respondent;
            const reviewText = t.answers?.Review || "";
            const company = t.answers?.["Company Name"] || "";
            const role = t.answers?.Role || "";
            const rating = t.rating || 5;

            return (
              <motion.div
                key={t._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="bg-card hover:bg-background transition-colors duration-150 p-7 sm:p-10 flex flex-col"
                itemScope
                itemType="https://schema.org/Review"
              >
                {/* Stars */}
                <div
                  className="flex gap-[0.2rem] mb-5"
                  aria-label={`${rating} out of 5 stars`}
                  role="img"
                >
                  {Array.from({ length: 5 }).map((_, j) => (
                    <StarIcon key={j} filled={j < rating} />
                  ))}
                </div>

                {/* Quote */}
                <blockquote
                  className="font-display italic text-[1rem] sm:text-[1.05rem] leading-[1.75] text-foreground mb-10 flex-1"
                  itemProp="reviewBody"
                >
                  "{reviewText}"
                </blockquote>

                {/* Divider */}
                <div className="border-t border-border mb-6" />

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-display font-bold text-[0.875rem] shrink-0"
                    aria-hidden="true"
                  >
                    {getInitials(name)}
                  </div>
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-display font-bold text-[0.875rem] shrink-0">
                    <img src={t.documentUrl} alt="" />
                  </div>
                  <div>
                    <p
                      className="text-sm font-semibold leading-none mb-[0.2rem]"
                      itemProp="author"
                    >
                      {name}
                    </p>
                    {(role || company) && (
                      <p className="text-xs font-mono text-muted-foreground leading-snug mt-1 line-clamp-1">
                        {role} {role && company ? "·" : ""}{" "}
                        <span className="text-foreground/70">{company}</span>
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
      </div>

      {/* Promo badge for your SaaS */}
      <div className="mt-8 text-center">
        <a
          href="https://fillfeedback.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border text-[0.75rem] text-muted-foreground hover:text-foreground hover:bg-muted transition-colors font-mono"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          Verified reviews powered by FillFeedback.com
        </a>
      </div>
    </section>
  );
};

export default Testimonials;
