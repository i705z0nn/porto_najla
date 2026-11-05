import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";
import { useRef } from "react";
import { marqueeItems } from "@/data/portfolio";

const wrap = (min: number, max: number, value: number) => {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
};

// Drifts on its own, speeds up and flips direction with the scroll.
export function Marquee({ baseVelocity = -1.4 }: { baseVelocity?: number }) {
  const reduced = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(velocity, [0, 1000], [0, 4], { clamp: false });
  const x = useTransform(baseX, (value) => `${wrap(-50, 0, value)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    const speed = factor.get();
    if (speed < 0) direction.current = -1;
    else if (speed > 0) direction.current = 1;
    const move = direction.current * baseVelocity * (delta / 1000);
    baseX.set(baseX.get() + move + move * Math.abs(speed));
  });

  const copy = [...marqueeItems, ...marqueeItems];
  return (
    <div aria-hidden className="overflow-hidden border-y border-border-subtle bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-primary py-3 text-accent-on">
      <motion.div className="flex w-max will-change-transform" style={{ x }}>
        {[0, 1].map((group) => (
          <div className="flex whitespace-nowrap text-xs font-bold uppercase tracking-[.18em]" key={group}>
            {copy.map((item, index) => (
              <span className="inline-flex items-center" key={index}>
                {item}
                <i className="mx-10 size-1 rounded-full bg-accent-on/40" />
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
