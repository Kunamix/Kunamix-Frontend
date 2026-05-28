// components/Footer.tsx
import { useNavigate } from "react-router-dom";
import KunamixLogo from "./KunamixLogo";

const COMPANY_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
  { name: "Calculator", href: "/calculator" },
];

const SERVICE_LINKS = [
  { name: "MVP Development", href: "/services" },
  { name: "Web App Dev", href: "/services" },
  { name: "Mobile App Dev", href: "/services" },
  { name: "SaaS Products", href: "/services" },
  { name: "UI/UX Design", href: "/services" },
  { name: "White Label", href: "/services" },
];

const LEGAL_LINKS = [
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms & Conditions", href: "/terms-conditions" },
];

// ── Social icons ──
const GithubIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M7 1C3.69 1 1 3.69 1 7c0 2.65 1.72 4.9 4.1 5.69.3.05.41-.13.41-.29v-1c-1.67.36-2.02-.8-2.02-.8-.27-.69-.67-.87-.67-.87-.55-.37.04-.36.04-.36.6.04.92.62.92.62.54.92 1.41.65 1.76.5.05-.39.21-.65.38-.8-1.34-.15-2.74-.67-2.74-2.97 0-.66.23-1.19.62-1.61-.06-.15-.27-.76.06-1.59 0 0 .51-.16 1.67.62A5.8 5.8 0 017 4.8c.52 0 1.04.07 1.52.2 1.16-.78 1.67-.62 1.67-.62.33.83.12 1.44.06 1.59.39.42.62.95.62 1.61 0 2.31-1.41 2.82-2.75 2.97.22.19.41.56.41 1.13v1.67c0 .16.11.35.41.29C11.28 11.9 13 9.65 13 7c0-3.31-2.69-6-6-6z"
      fill="currentColor"
    />
  </svg>
);
const LinkedinIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    aria-hidden="true"
  >
    <rect
      x="1"
      y="1"
      width="12"
      height="12"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.1"
    />
    <path
      d="M4.5 6v4M4.5 4.5v.01"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
    />
    <path
      d="M7 10V7.5a1.5 1.5 0 013 0V10M7 7.5V10"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
    />
  </svg>
);
const TwitterIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M13 2s-1 .5-2 .7A2.5 2.5 0 003.5 5c0 .3 0 .5.1.7C2 5.5 1 4.5 1 4.5S.5 7 3 8c-.5 0-1-.2-1-.2s.3 2 3 2.5c-1 .5-3 .5-3 .5s2 1.5 5 1.5c4 0 7-3 7-7v-.5c.5-.4 1-1 1-1s-1 0-2-.5z"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const InstagramIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    aria-hidden="true"
  >
    <rect
      x="1.5"
      y="1.5"
      width="11"
      height="11"
      rx="3"
      stroke="currentColor"
      strokeWidth="1.1"
    />
    <circle cx="7" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.1" />
    <circle cx="10.5" cy="3.5" r=".5" fill="currentColor" />
  </svg>
);

const SOCIALS = [
  { label: "GitHub", icon: <GithubIcon />, href: "https://github.com/kunamix" },
  {
    label: "LinkedIn",
    icon: <LinkedinIcon />,
    href: "https://linkedin.com/company/kunamix",
  },
  {
    label: "Twitter",
    icon: <TwitterIcon />,
    href: "https://x.com/kuna_mix",
  },
  {
    label: "Instagram",
    icon: <InstagramIcon />,
    href: "https://instagram.com/kuna.mix",
  },
];

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer
      className="bg-dark-bg border-t border-[hsl(var(--dark-border))]
                 pt-12 md:pt-16 pb-8
                 px-4 xs:px-5 sm:px-6 md:px-8"
      role="contentinfo"
      itemScope
      itemType="https://schema.org/Organization"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* ── Top grid ──
            320px → 1 col
            480px → 2 col (brand + 1 link col stacked)
            1024px → [2fr 1fr 1fr 1fr]
        */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]
                     gap-8 sm:gap-10 lg:gap-16
                     pb-10 md:pb-14
                     border-b border-[hsl(var(--dark-border))] mb-8"
        >
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-[0.625rem] mb-[0.875rem]">
              <KunamixLogo size={28} gradientId="footer-logo" />
              <span
                className="font-mono text-[0.8125rem] font-medium text-white/50
                           tracking-[0.06em] uppercase"
                itemProp="name"
              >
                Kunamix
              </span>
            </div>
            <p
              className="text-[0.875rem] leading-[1.7] text-white/28 mb-6 max-w-[280px]"
              itemProp="description"
            >
              Custom software development company in India. Building scalable
              MVPs, web apps, mobile apps, and SaaS products for startups and
              businesses globally.
            </p>
            {/* Social */}
            <div className="flex gap-2" aria-label="Social media links">
              {SOCIALS.map(({ label, icon, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-md border border-white/8
                             flex items-center justify-center text-white/28
                             transition-all duration-150
                             hover:border-primary/40 hover:text-primary"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <nav aria-label="Company links">
            <p className="font-mono text-[0.5875rem] text-white/20 tracking-[0.12em] uppercase mb-[1.125rem]">
              Company
            </p>
            <ul className="flex flex-col gap-[0.625rem]">
              {COMPANY_LINKS.map(({ name, href }) => (
                <li key={name}>
                  <button
                    onClick={() => navigate(href)}
                    className="text-[0.8125rem] text-white/38 hover:text-white/80
                               transition-colors duration-150 cursor-pointer text-left"
                  >
                    {name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label="Services links">
            <p className="font-mono text-[0.5875rem] text-white/20 tracking-[0.12em] uppercase mb-[1.125rem]">
              Services
            </p>
            <ul className="flex flex-col gap-[0.625rem]">
              {SERVICE_LINKS.map(({ name, href }) => (
                <li key={name}>
                  <button
                    onClick={() => navigate(href)}
                    className="text-[0.8125rem] text-white/38 hover:text-white/80
                               transition-colors duration-150 cursor-pointer text-left"
                  >
                    {name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact + Legal */}
          <div>
            <p className="font-mono text-[0.5875rem] text-white/20 tracking-[0.12em] uppercase mb-[1.125rem]">
              Contact
            </p>
            <ul className="flex flex-col gap-[0.625rem] mb-6">
              <li>
                <a
                  href="mailto:contact@kunamix.com"
                  className="text-[0.8125rem] text-white/38 hover:text-white/80
                             transition-colors duration-150 break-all"
                  itemProp="email"
                >
                  contact@kunamix.com
                </a>
              </li>
              <li className="text-[0.8125rem] text-white/20">
                India — Serving clients globally
              </li>
            </ul>
            <p className="font-mono text-[0.5875rem] text-white/20 tracking-[0.12em] uppercase mb-[1.125rem]">
              Legal
            </p>
            <ul className="flex flex-col gap-[0.625rem]">
              {LEGAL_LINKS.map(({ name, href }) => (
                <li key={name}>
                  <button
                    onClick={() => navigate(href)}
                    className="text-[0.8125rem] text-white/38 hover:text-white/80
                               transition-colors duration-150 cursor-pointer text-left"
                  >
                    {name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2 flex-wrap">
          <p className="font-mono text-[0.5875rem] text-white/18 tracking-[0.04em]">
            © {new Date().getFullYear()} Kunamix Digital Solutions. All rights
            reserved.
          </p>
          <p className="font-mono text-[0.5875rem] text-white/18 tracking-[0.04em]">
            Custom Software Development — India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
