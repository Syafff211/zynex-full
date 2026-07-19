// components/Navigation.tsx
'use client';
import { motion } from 'framer-motion';
import { slideDown } from '@/lib/motion';

const links = ['HOME', 'SERVICES', 'PRICING', 'PORTFOLIO', 'CONTACT'];

export default function Navigation() {
  return (
    <motion.header
      variants={slideDown}
      initial="hidden"
      animate="show"
      className="fixed top-0 z-30 flex w-full items-center justify-between px-8 py-7 md:px-14"
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <div className="h-4 w-4 rotate-45 border border-accent/70" />
        <span className="font-display text-sm font-semibold tracking-wide2">
          ZYNEX <span className="text-accent">STUDIO</span>
        </span>
      </div>

      {/* Center Nav */}
      <nav className="hidden items-center gap-9 lg:flex">
        {links.map((l) => (
          <a
            key={l}
            href="#"
            className="group relative text-[11px] tracking-wide2 text-white/60 transition-colors hover:text-ivory"
          >
            {l}
            <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-accent transition-all duration-500 group-hover:w-full" />
          </a>
        ))}
      </nav>

      {/* Right */}
      <div className="flex items-center gap-4">
        <button className="grid h-10 w-10 place-items-center rounded-full glass transition-transform hover:scale-105">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#F4F0E8" strokeWidth="1.5">
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </button>
        <button className="grid h-10 w-10 place-items-center rounded-full glass transition-transform hover:scale-105">
          <div className="space-y-1">
            <span className="block h-px w-4 bg-ivory" />
            <span className="block h-px w-4 bg-ivory" />
          </div>
        </button>
      </div>
    </motion.header>
  );
}