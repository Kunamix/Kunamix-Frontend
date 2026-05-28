import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Send, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCalculatorForm } from "@/hooks/useContactFrom";
import { toast } from "sonner";
import useSEOMeta from "@/hooks/useSEOMeta";

// ─── Constants ────────────────────────────────────────────────────────────────

const PLATFORMS = [
  "Web App",
  "iOS App",
  "Android App",
  "Cross-Platform Mobile",
  "Admin Dashboard",
  "Landing Page / Website",
  "API / Backend Only",
] as const;

const TIMELINES = [
  "1 month",
  "2 months",
  "3 months",
  "4–6 months",
  "6+ months",
  "No fixed deadline",
] as const;

const USER_SCALES = [
  "Small (< 500 users)",
  "Medium (500 – 10,000 users)",
  "Large (10,000 – 100,000 users)",
  "Massive (100,000+ users)",
] as const;

interface FormState {
  name: string;
  email: string;
  platforms: string[];
  description: string;
  timeline: string;
  userScale: string;
  notes: string;
}

const INITIAL_FORM: FormState = {
  name: "",
  email: "",
  platforms: [],
  description: "",
  timeline: "",
  userScale: "",
  notes: "",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

const CalculatorPage = () => {
  const { sendCalculatorForm, loading } = useCalculatorForm();
  const [formData, setFormData] = useState<FormState>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);

  useSEOMeta({
    title: "Project Cost Calculator | Kunamix Digital Solutions",
    description:
      "Get an instant project cost estimate for your web app, mobile app or MVP. Fill out the form and receive a detailed PDF estimate in your inbox.",
    canonical: "https://kunamix.com/calculator",
    ogTitle: "Project Cost Calculator | Kunamix",
    ogDescription:
      "Get a personalized estimate for your project — free and instant.",
    ogUrl: "https://kunamix.com/calculator",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePlatform = (platform: string) => {
    setFormData((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter((p) => p !== platform)
        : [...prev.platforms, platform],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.platforms.length === 0) {
      toast.error("Please select at least one platform.");
      return;
    }

    const res = await sendCalculatorForm({
      name: formData.name,
      email: formData.email,
      platforms: formData.platforms,
      description: formData.description,
      timeline: formData.timeline,
      userScale: formData.userScale,
      notes: formData.notes || undefined,
    });

    if (res.success) {
      setSubmitted(true);
    } else {
      toast.error(res.message || "Something went wrong. Please try again.");
    }
  };

  const isValid =
    formData.name &&
    formData.email &&
    formData.platforms.length > 0 &&
    formData.description &&
    formData.timeline &&
    formData.userScale;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen max-w-screen overflow-x-hidden bg-background"
    >
      <Header />

      <main id="main-content">
        {/* Hero */}
        <section className="pt-[120px] pb-10 px-4 xs:px-5 sm:px-6 md:px-5 max-w-[800px] mx-auto md:pt-[140px] text-center">
          <motion.div
            className="inline-flex items-center justify-center gap-[0.625rem] mb-6"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-blink shrink-0" />
            <span className="font-mono text-[0.625rem] text-muted-foreground tracking-[0.08em] uppercase">
              Free Estimate
            </span>
          </motion.div>

          <motion.h1
            className="font-display font-bold leading-[1.05] tracking-[-0.026em] text-foreground mb-5 text-[clamp(2rem,5vw,3.5rem)]"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Project Cost Calculator
          </motion.h1>

          <motion.p
            className="text-[0.9375rem] md:text-[1.0625rem] leading-[1.72] text-muted-foreground max-w-[520px] mx-auto"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Tell us about your project. We'll generate a detailed estimate and
            email it to you as a PDF — completely free, no commitment required.
          </motion.p>
        </section>

        {/* Form / Success */}
        <section className="pb-24 px-4 xs:px-5 sm:px-6 md:px-5 max-w-[720px] mx-auto">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-card border border-border rounded-[20px] p-10 md:p-14 text-center flex flex-col items-center gap-5"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <h2 className="font-display font-bold text-[1.75rem] text-foreground tracking-[-0.01em]">
                Estimate sent!
              </h2>
              <p className="text-[1rem] text-muted-foreground max-w-[400px] leading-[1.7]">
                Check your inbox at{" "}
                <strong className="text-foreground">{formData.email}</strong>.
                Your PDF estimate is on its way. We'll also follow up within 24
                hours.
              </p>
              <Button
                onClick={() => {
                  setSubmitted(false);
                  setFormData(INITIAL_FORM);
                }}
                variant="outline"
                className="mt-2 border-border hover:border-primary/40"
              >
                Calculate another project
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-card rounded-[20px] border border-border p-6 sm:p-8 md:p-10"
            >
              <form onSubmit={handleSubmit} className="flex flex-col gap-7">
                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="name"
                      className="text-[0.8125rem] font-medium text-foreground"
                    >
                      Your Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="h-12 bg-background border-border focus-visible:ring-primary/20 text-[0.875rem]"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="email"
                      className="text-[0.8125rem] font-medium text-foreground"
                    >
                      Email Address <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className="h-12 bg-background border-border focus-visible:ring-primary/20 text-[0.875rem]"
                    />
                  </div>
                </div>

                {/* Platforms */}
                <div className="flex flex-col gap-3">
                  <Label className="text-[0.8125rem] font-medium text-foreground">
                    Platforms <span className="text-destructive">*</span>
                    <span className="text-muted-foreground font-normal ml-1">
                      (select all that apply)
                    </span>
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {PLATFORMS.map((platform) => {
                      const selected = formData.platforms.includes(platform);
                      return (
                        <button
                          key={platform}
                          type="button"
                          onClick={() => togglePlatform(platform)}
                          className={`px-3.5 py-2 rounded-full text-[0.8125rem] font-medium border transition-all duration-150 cursor-pointer ${
                            selected
                              ? "bg-primary text-white border-primary"
                              : "bg-background text-foreground border-border hover:border-primary/50"
                          }`}
                        >
                          {platform}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Timeline + User Scale */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <Label className="text-[0.8125rem] font-medium text-foreground">
                      Timeline <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      required
                      value={formData.timeline}
                      onValueChange={(val) =>
                        setFormData((p) => ({ ...p, timeline: val }))
                      }
                    >
                      <SelectTrigger className="h-12 bg-background border-border focus:ring-primary/20 text-[0.875rem]">
                        <SelectValue placeholder="How soon?" />
                      </SelectTrigger>
                      <SelectContent>
                        {TIMELINES.map((t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label className="text-[0.8125rem] font-medium text-foreground">
                      Expected User Scale{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      required
                      value={formData.userScale}
                      onValueChange={(val) =>
                        setFormData((p) => ({ ...p, userScale: val }))
                      }
                    >
                      <SelectTrigger className="h-12 bg-background border-border focus:ring-primary/20 text-[0.875rem]">
                        <SelectValue placeholder="How many users?" />
                      </SelectTrigger>
                      <SelectContent>
                        {USER_SCALES.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Description */}
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="description"
                    className="text-[0.8125rem] font-medium text-foreground"
                  >
                    Project Description{" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    required
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe what you want to build — features, integrations, target audience..."
                    rows={5}
                    className="bg-background border-border focus-visible:ring-primary/20 text-[0.875rem] resize-none pt-3"
                  />
                </div>

                {/* Notes (optional) */}
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="notes"
                    className="text-[0.8125rem] font-medium text-foreground"
                  >
                    Additional Notes{" "}
                    <span className="text-muted-foreground font-normal">
                      (optional)
                    </span>
                  </Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Any specific tech stack preferences, existing codebase, or constraints..."
                    rows={3}
                    className="bg-background border-border focus-visible:ring-primary/20 text-[0.875rem] resize-none pt-3"
                  />
                </div>

                {/* Info strip */}
                <div className="flex items-start gap-3 p-4 bg-primary/5 border border-primary/20 rounded-[10px] text-[0.8125rem] text-muted-foreground">
                  <span className="text-primary shrink-0 mt-0.5">📄</span>
                  <span>
                    A detailed PDF estimate will be emailed to you instantly.
                    Our team will also follow up within 24 hours to refine the
                    scope.
                  </span>
                </div>

                <Button
                  type="submit"
                  disabled={loading || !isValid}
                  className="bg-primary text-white hover:bg-primary-dark shadow-brand hover:shadow-brand-hover hover:-translate-y-px transition-all duration-200 font-semibold h-12 gap-2 text-[0.9375rem] w-full mt-1"
                >
                  {loading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full mr-1"
                    />
                  ) : (
                    <Send className="w-4 h-4 shrink-0" />
                  )}
                  {loading ? "Generating Estimate..." : "Get My Free Estimate"}
                </Button>
              </form>
            </motion.div>
          )}
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </motion.div>
  );
};

export default CalculatorPage;
