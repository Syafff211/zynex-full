// lib/motion.ts
export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      delay: 0.1 * i,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export const slideDown = {
  hidden: { opacity: 0, y: -30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

export const staggerChar = {
  hidden: { opacity: 0, y: '110%' },
  show: (i: number) => ({
    opacity: 1,
    y: '0%',
    transition: {
      duration: 1.1,
      delay: 0.4 + i * 0.06,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};