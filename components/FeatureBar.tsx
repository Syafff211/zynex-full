// components/FeatureBar.tsx
"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

const features = [
  { n: "01", t: "MODERN DESIGN", d: "Premium UI crafted for startups." },
  { n: "02", t: "FAST DELIVERY", d: "Finished within 24–72 hours." },
  { n: "03", t: "HIGH PERFORMANCE", d: "Optimized speed & SEO." },
  { n: "04", t: "FULL SUPPORT", d: "Lifetime consultation." },
];

// FIX FINAL: Tambahkan 'as const satisfies Variants' atau cast tipe manual
// Ini cara paling ampuh biar TS gak ngambek
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      delay: 0.1 * i,
      ease: "easeOut" as const, // Cast ke const agar aman
    },
  }),
};

export default function FeatureBar() {
  return (
    <div className="fixed bottom-0 z-20 w-full px-8 pb-8 md:px-14">
      {/* Feature cards */}
      <div className="mb-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.06] md:grid-cols-4">
        {features.map((f, i) => (
          <motion.div
            key={f.n}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={11 + i}
            className="glass rounded-none px-6 py-5"
          >
            <span className="text-[11px] tracking-wide2 text-accent">{f.n}</span>
            <h3 className="mt-2 font-display text-xs font-semibold tracking-wide2 text-ivory">
              {f.t}
            </h3>
            <p className="mt-1.5 text-[11px] leading-relaxed text-white/55">
              {f.d}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Bottom row */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={16}
        className="flex items-center justify-between text-[10px] tracking-wide2 text-white/55"
      >
        <span>50+ COMPLETED PROJECTS</span>

        <div className="flex flex-col items-center gap-2 text-ivory">
          <span>SCROLL</span>
          <span className="h-6 w-px animate-pulse bg-accent" />
        </div>

        <div className="flex items-center gap-2">
          <span className="h-px w-8 bg-ivory" />
          <span className="h-px w-4 bg-white/25" />
          <span className="h-px w-4 bg-white/25" />
        </div>
      </motion.div>
    </div>
  );
}
