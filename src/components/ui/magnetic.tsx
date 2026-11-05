import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type PointerEvent, type ReactNode } from "react";
import { useInteractive } from "@/lib/motion";
import { cn } from "@/lib/utils";

const SPRING = { stiffness: 220, damping: 16, mass: 0.4 };

export function Magnetic({ children, strength = 0.3, className }: { children: ReactNode; strength?: number; className?: string }) {
  const interactive = useInteractive();
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);

  const onPointerMove = (event: PointerEvent) => {
    if (!interactive || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * strength);
    y.set((event.clientY - rect.top - rect.height / 2) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span ref={ref} className={cn("inline-block will-change-transform", className)} style={{ x: springX, y: springY }} onPointerMove={onPointerMove} onPointerLeave={reset}>
      {children}
    </motion.span>
  );
}
