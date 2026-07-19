"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const links = ["HOME", "SERVICES", "PRICING", "PORTFOLIO", "CONTACT"];

const slideDown = {
  hidden: { opacity: 0, y: -24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Navigation() {
  return (
    <motion.header
      variants={slideDown}
      initial="hidden"
      animate="show"
      className="fixed top-0 z-30 flex w-full items-center justify-between px-8 py-7 md:px-14"
    >
      <Link href="/" className="brand">
        <span className="brand-mark"><span /><span /></span>
        ZYNEX STUDIO
      </Link>

      <nav className="desktop-navigation">
        {links.map((l) => (
          <a key={l} href={`#${l.toLowerCase()}`}>{l}</a>
        ))}
      </nav>

      <div className="header-actions">
        <Link href="/login" className="login-button">LOGIN</Link>
      </div>
    </motion.header>
  );
}
