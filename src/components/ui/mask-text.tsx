import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

// Lines slide up from behind a mask. The trigger sits on the parent because the
// hidden lines are clipped and would never report as intersecting themselves.
export function MaskText({ lines, className, delay = 0 }: { lines: ReactNode[]; className?: string; delay?: number }) {
  return (
    <motion.h2 className={cn("mask-text", className)} initial="hide" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
      {lines.map((line, index) => (
        <span className="mask-line" key={index}>
          <motion.span
            className="mask-inner"
            variants={{ hide: { y: "125%" }, show: { y: 0 } }}
            transition={{ duration: 1, delay: delay + index * 0.1, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.h2>
  );
}
