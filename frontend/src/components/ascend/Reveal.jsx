import { motion } from "framer-motion";

export const Reveal = ({ children, delay = 0, className = "", y = 28 }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

export const Chapter = ({ num, label, testId }) => (
  <Reveal>
    <div data-testid={testId} className="flex items-center gap-3 mb-6">
      <span className="font-mono-accent text-xs text-[#2AFFF1] tracking-widest">{num}</span>
      <span className="h-px w-10 bg-[#2AFFF1]/40" />
      <span className="font-mono-accent text-[11px] sm:text-xs tracking-[0.25em] uppercase text-[#A0A7B5]">
        {label}
      </span>
    </div>
  </Reveal>
);
