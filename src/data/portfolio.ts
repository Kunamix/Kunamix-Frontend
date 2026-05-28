import kirana from "@/assets/portfolio/1.webp";
import onlinetranscriber from "@/assets/portfolio/2.webp";
import quizApp from "@/assets/portfolio/3.webp";

export const PORTFOLIO_BREADCRUMB = [
  { label: "Home", href: "/" },
  { label: "Portfolio" },
];

export const PORTFOLIO_PROJECTS = [
  {
    id: "gov-exam-prep",
    title: "Government Exam Mock Test App",
    problem:
      "Client needed: A highly scalable, subscription-based mobile platform for Indian government exam preparation and timed mock testing.",
    description:
      "A robust cross-platform mobile application and admin dashboard handling secure payments, subscription tiers, and high-concurrency mock examinations with real-time performance analytics.",
    category: "Mobile Application",
    technologies: [
      "React Native",
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
    ],
    image: quizApp, // Kept your existing image variable
    link: "https://dekhoexam.com",
    featured: true,
    confidential: false,
    results: [
      { val: "100%", label: "Uptime during exams" },
      { val: "Seamless", label: "Payment Integration" },
      { val: "Zero", label: "Data loss in tests" },
    ],
  },
  {
    id: "ai-transcoding-engine",
    title: "Offline AI Audio Transcriber",
    problem:
      "Client needed: A highly secure, locally-hosted AI transcription tool to convert sensitive audio into structured PDF reports without cloud APIs.",
    description:
      "A custom Python application leveraging multiple local LLMs and speech-to-text models to achieve over 96% accuracy. Runs entirely on the user's local hardware to guarantee absolute data privacy.",
    category: "AI & Desktop Software",
    technologies: ["Python", "Local LLMs", "Speech-to-Text", "PDF Generation"],
    image: onlinetranscriber, // Kept your existing image variable
    link: "",
    featured: true,
    confidential: true,
    results: [
      { val: "96%+", label: "Transcription Accuracy" },
      { val: "100%", label: "Local Data Privacy" },
      { val: "Auto", label: "PDF Exporting" },
    ],
  },
  {
    id: "kirana-pos-erp",
    title: "Retail & Kirana Management System",
    problem:
      "Client needed: A locally-hosted, offline-first Point of Sale (POS) and inventory system to be sold as a full-source-code product to shop owners.",
    description:
      "A comprehensive retail management suite handling real-time stock, fast billing, employee shifts, and deep analytics, all safely stored in a local PostgreSQL database.",
    category: "Desktop & ERP Solution",
    technologies: ["Electron.js", "PostgreSQL", "Local Network"],
    image: kirana, // Kept your existing image variable
    link: "",
    featured: true,
    confidential: true,
    results: [
      { val: "Offline", label: "First Architecture" },
      { val: "1-Click", label: "Fast Billing" },
      { val: "Full", label: "Source Code Handoff" },
    ],
  },
];
