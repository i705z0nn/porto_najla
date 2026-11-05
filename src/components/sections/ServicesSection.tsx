import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useState, type PointerEvent } from "react";
import { MaskText } from "@/components/ui/mask-text";
import { Reveal } from "@/components/ui/reveal";
import { capabilities } from "@/data/portfolio";
import { EASE, trackCellSpot, useInteractive } from "@/lib/motion";

const cells: { title: string; subtitle: string; image?: string }[] = [...capabilities, { title: "Tangerang, Indonesia", subtitle: "Based in" }];

const FOLLOW_SPRING = { stiffness: 220, damping: 26, mass: .5 };

export function ServicesSection() {
  const interactive = useInteractive();
  const [hovered, setHovered] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const followX = useSpring(x, FOLLOW_SPRING);
  const followY = useSpring(y, FOLLOW_SPRING);

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    x.set(event.clientX);
    y.set(event.clientY);
    trackCellSpot(event);
  };

  const image = hovered === null ? null : cells[hovered].image;

  return (
    <section data-theme="services" id="expertise" className="relative overflow-x-clip bg-bg-base py-24 text-fg-primary md:py-36">
      <div aria-hidden className="pastel-orb absolute -left-20 top-24 size-64 rounded-[55%_45%_65%_35%] bg-accent-secondary/25" />
      <div className="container-shell relative">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-24">
          <div>
            <Reveal><p className="section-kicker mb-5">What I bring · 02</p></Reveal>
            <MaskText className="section-title" lines={["Technical depth,", <em className="text-accent-primary">business context.</em>]} />
          </div>
          <Reveal className="flex flex-col justify-end" delay={.15}>
            <p className="max-w-xl text-xl leading-relaxed tracking-[-.02em] md:text-2xl">A backend foundation with a growing focus on business analysis and project management—useful where technical systems must make sense to the people running them.</p>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-fg-muted">Backend developer connecting dependable engineering with business value.</p>
          </Reveal>
        </div>

        <Reveal>
          <div className="soft-grid mt-14 md:mt-20" onPointerMove={onPointerMove} onPointerLeave={() => setHovered(null)}>
            {cells.map((cell, index) => (
              <div className="grid-cell" key={cell.title} onPointerEnter={() => setHovered(index)}>
                <div className="grid-cell-head">
                  <span className="grid-cell-title">{cell.title}</span>
                  <span className="grid-cell-number" aria-hidden>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <p className="mt-8 text-xs text-fg-muted">{cell.subtitle}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {interactive && (
        <motion.div className="follow-preview" style={{ x: followX, y: followY }} aria-hidden>
          <AnimatePresence>
            {image && (
              <motion.img
                key={image}
                src={image}
                alt=""
                initial={{ opacity: 0, scale: .85, rotate: -4 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: .9 }}
                transition={{ duration: .35, ease: EASE }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
}
