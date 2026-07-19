"use client";

import { motion } from "framer-motion";

const features = [
  { n: "01", t: "MODERN DESIGN", d: "Premium UI crafted for startups." },
  { n: "02", t: "FAST DELIVERY", d: "Finished within 24–72 hours." },
  { n: "03", t: "HIGH PERFORMANCE", d: "Optimized speed & SEO." },
  { n: "04", t: "FULL SUPPORT", d: "Lifetime consultation." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      delay: 0.08 * i,
      ease: [0.16, 1, 0.3, 1] as const,   // ← KUNCI: as const
    },
  }),
};

export default function FeatureBar() {
  return (
    <section className="feature-bar" aria-label="Studio highlights">
      {features.map((f, i) => (
        <motion.article
          key={f.n}
          className="feature-item"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={11 + i}
        >
          <span className="feature-number">{f.n}</span>
          <div>
            <h2>{f.t}</h2>
            <p>{f.d}</p>
          </div>
        </motion.article>
      ))}
    </section>
  );
}
