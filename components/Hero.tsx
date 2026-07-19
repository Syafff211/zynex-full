"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import MobileMenu from "./MobileMenu";
import SearchOverlay from "./SearchOverlay";

const CrystalScene = dynamic(() => import("./CrystalScene"), {
  ssr: false,
  loading: () => null,
});

const navLinks = ["HOME", "SERVICES", "PRICING", "PORTFOLIO", "CONTACT"];

const features = [
  {
    number: "01",
    title: "MODERN DESIGN",
    description: "Premium UI crafted for startups.",
  },
  {
    number: "02",
    title: "FAST DELIVERY",
    description: "Finished within 24–72 hours.",
  },
  {
    number: "03",
    title: "HIGH PERFORMANCE",
    description: "Optimized speed & SEO.",
  },
  {
    number: "04",
    title: "FULL SUPPORT",
    description: "Lifetime consultation.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      delay: 0.08 * i,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

const slideDown = {
  hidden: { opacity: 0, y: -24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const titleReveal = {
  hidden: { y: "110%" },
  show: (i: number) => ({
    y: "0%",
    transition: {
      duration: 1.05,
      delay: 0.35 + i * 0.08,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export default function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      document.documentElement.style.setProperty(
        "--cursor-x",
        `${event.clientX}px`
      );
      document.documentElement.style.setProperty(
        "--cursor-y",
        `${event.clientY}px`
      );
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    document.body.classList.toggle("search-open", searchOpen);

    return () => {
      document.body.classList.remove("menu-open", "search-open");
    };
  }, [menuOpen, searchOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <main className="hero-shell">
      <div className="webgl-layer" aria-hidden="true">
        {mounted && <CrystalScene />}
      </div>

      <div className="ambient-glow" aria-hidden="true" />
      <div className="cursor-glow" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      <div className="noise" aria-hidden="true" />

      <motion.header
        className="site-header"
        variants={slideDown}
        initial="hidden"
        animate="show"
      >
        <Link href="/" className="brand" aria-label="Zynex Studio home">
          <span className="brand-mark" aria-hidden="true">
            <span />
            <span />
          </span>
          ZYNEX STUDIO
        </Link>

        <nav className="desktop-navigation" aria-label="Primary">
          {navLinks.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`}>
              {link}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <Link href="/login" className="login-button">
            LOGIN
          </Link>

          <button
            className="icon-button search-button"
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="6.5" />
              <path d="m16 16 4 4" />
            </svg>
          </button>

          <button
            className="menu-button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <span />
            <span />
          </button>
        </div>
      </motion.header>

      <section className="hero-content">
        <motion.p
          className="eyebrow"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
        >
          <span aria-hidden="true" />
          DIGITAL CREATIVE AGENCY
          <span aria-hidden="true" />
        </motion.p>

        <h1 className="hero-title">
          {["ZYNEX", "STUDIO"].map((word, wordIndex) => (
            <span className="title-mask" key={word}>
              <motion.span
                variants={titleReveal}
                initial="hidden"
                animate="show"
                custom={wordIndex}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="hero-supporting-copy">
          <motion.p
            className="hero-subtitle"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={8}
          >
            Modern Website <span aria-hidden="true">•</span> Branding{" "}
            <span aria-hidden="true">•</span> Automation Solutions
          </motion.p>

          <motion.p
            className="hero-description"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={9}
          >
            Building premium websites, modern business platforms,
            high-converting landing pages, and digital experiences for
            startups, creators, and growing businesses.
          </motion.p>
        </div>
      </section>

      <section className="feature-bar" aria-label="Studio highlights">
        {features.map((feature, index) => (
          <motion.article
            className="feature-item"
            key={feature.number}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={11 + index}
          >
            <span className="feature-number">{feature.number}</span>
            <div>
              <h2>{feature.title}</h2>
              <p>{feature.description}</p>
            </div>
          </motion.article>
        ))}
      </section>

      <motion.div
        className="bottom-rail"
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={16}
      >
        <div className="project-count">
          <span className="status-dot" aria-hidden="true" />
          50+ COMPLETED PROJECTS
        </div>

        <a href="#services" className="scroll-indicator">
          SCROLL
          <span className="scroll-line" aria-hidden="true">
            <span />
          </span>
        </a>

        <div className="slider-indicator" aria-hidden="true">
          <span className="active" />
          <span />
          <span />
        </div>
      </motion.div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </main>
  );
}