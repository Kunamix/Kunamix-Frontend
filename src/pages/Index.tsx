// pages/Index.tsx
import { motion } from "motion/react";
import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/home/Hero";
import TechTicker from "@/components/home/TechTicker";
import Services from "@/components/home/Services";
import Process from "@/components/home/Process";
import Work from "@/components/home/Work";
import BlogPreview from "@/components/home/BlogPreview";
import AudienceSplit from "@/components/home/AudienceSplit";
import Testimonials from "@/components/home/Testimonials";
import CTABlock from "@/components/home/CTABlock";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import useSEOMeta from "@/hooks/useSEOMeta";
import FounderStrip from "@/components/home/FounderStrip";

const Index = () => {
  useSEOMeta({
    title:
      "Kunamix Digital Solutions | Custom Software Development Company India",
    description:
      "Kunamix builds scalable MVPs, web apps, mobile apps, and SaaS products for startups and businesses globally. React, Next.js, Node.js, Flutter, AWS. Book a free consultation.",
    canonical: "https://kunamix.com",
    ogTitle:
      "Kunamix Digital Solutions | Custom Software Development Company India",
    ogDescription:
      "Scalable MVPs, web apps, mobile apps and SaaS products. Built with React, Node.js, Flutter and AWS. Serving startups and businesses globally.",
    ogUrl: "https://kunamix.com",
    ogImage: "https://kunamix.com/org-image.png",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen max-w-screen overflow-x-hidden bg-background"
    >
      <Header />

      <main id="main-content">
        {/* 1. Hero — value prop + metrics + latest project */}
        <Hero />

        {/* 2. Tech ticker — credibility signal */}
        <TechTicker />

        {/* 9. Founder - msg  */}
        {/* <FounderStrip /> */}

        {/* Pull Quote */}
        <section className="px-4 py-12 md:py-16 max-w-[1280px] mx-auto text-center">
          <h2 className="font-display text-[clamp(1.5rem,3vw,2.5rem)] font-light text-muted-foreground italic">
            "Not an agency.{" "}
            <strong className="font-semibold text-foreground not-italic">
              A founding-level partner.
            </strong>
            "
          </h2>
        </section>

        {/* 3. Services — what we build */}
        <Services />

        {/* 4. Process — how we work (dark section) */}
        <Process />

        {/* 5. Work — case studies with results */}
        <Work />

        {/* 6. Blog — latest articles */}
        <BlogPreview />

        {/* 7. Audience split — startups vs businesses */}
        <AudienceSplit />

        {/* 8. Testimonials — social proof */}
        <Testimonials />
        {/* How you're protected — condensed homepage version */}
        <section className="px-4 py-16 md:py-24 bg-[#fcfcfc] dark:bg-zinc-950 mb-16 md:mb-20">
          <div className="max-w-[1280px] mx-auto text-center">
            <p className="text-[1.125rem] md:text-[1.25rem] font-medium text-foreground max-w-[800px] mx-auto leading-relaxed">
              You only pay when you see working software. Fixed price agreed
              before we start. Full source code yours from day one. That's how
              every Kunamix project works — regardless of budget.
            </p>
          </div>
        </section>

        {/* 9. CTA — final conversion block */}
        <CTABlock />
      </main>

      <Footer />
      <WhatsAppButton />
    </motion.div>
  );
};

export default Index;
