import { motion, useMotionValue, useSpring } from "framer-motion";
import type { PointerEvent, ReactNode } from "react";
import { useInteractive } from "@/lib/motion";

const SPRING = { stiffness: 180, damping: 18 };

export function Tilt({ children, max = 5, className }: { children: ReactNode; max?: number; className?: string }) {
  const interactive = useInteractive();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, SPRING);
  const springY = useSpring(rotateY, SPRING);

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const rect = event.currentTarget.getBoundingClientRect();
    rotateY.set(((event.clientX - rect.left) / rect.width - .5) * max * 2);
    rotateX.set(-((event.clientY - rect.top) / rect.height - .5) * max * 2);
  };
  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      className={className}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 1100, transformStyle: "preserve-3d" }}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.div>
  );
}
