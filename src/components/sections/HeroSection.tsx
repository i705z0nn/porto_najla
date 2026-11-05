import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, MapPin } from "lucide-react";
import { useRef } from "react";
import { Tilt } from "@/components/ui/tilt";
import { WorkbenchPanel } from "@/components/ui/workbench-panel";

export function HeroSection({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const contentOpacity = useTransform(scrollYProgress, [0, .82], [1, 0]);
  const radialScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);

  return (
    <section ref={ref} data-theme="hero" id="home" className="noise relative min-h-dvh overflow-hidden bg-bg-base pt-28 text-fg-primary">
      <div className="grid-field absolute inset-0" aria-hidden />
      <div aria-hidden className="pastel-orb absolute left-[4%] top-[15%] size-24 rounded-[58%_42%_45%_55%] bg-accent-secondary/35 sm:size-36" />
      <div aria-hidden className="pastel-orb absolute right-[5%] top-[12%] size-20 rounded-[44%_56%_62%_38%] bg-accent-primary/25 sm:size-32" />
      <motion.div
        style={{
          scale: radialScale,
          background: "radial-gradient(closest-side, var(--sem-bg-base) 72%, color-mix(in srgb, var(--sem-accent-primary) 72%, white) 86%, color-mix(in srgb, var(--sem-accent-secondary) 84%, white) 94%, transparent 100%)",
        }}
        className="hero-arc pointer-events-none absolute left-1/2 top-[72%] h-[55vw] min-h-[520px] w-[120vw] -translate-x-1/2 rounded-[50%] opacity-95"
      />

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="hero-parallax container-shell relative z-10 grid min-h-[calc(100dvh-7rem)] grid-cols-[minmax(0,1fr)] items-center gap-12 pb-24 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,.75fr)]">
        <div className="min-w-0">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }} className="mb-8 flex flex-col items-start gap-3 text-[11px] font-semibold uppercase tracking-[.14em] text-fg-muted sm:flex-row sm:flex-wrap sm:items-center sm:text-xs sm:tracking-[.16em]">
            <span className="rounded-full border border-border-subtle bg-bg-elevated/70 px-4 py-2 shadow-sm">Backend Developer</span>
            <span className="flex items-center gap-1.5"><MapPin size={13} className="text-accent-primary" /> Tangerang, Indonesia</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 35, filter: "blur(10px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: .9, delay: .12, ease: [0.22, 1, 0.36, 1] }} className="font-display text-[clamp(3.1rem,10vw,8.8rem)] leading-[.82] tracking-[-.055em]">
            Building systems<br />that <em className="font-normal text-accent-primary">work.</em>
          </motion.h1>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .38 }} className="mt-10 grid max-w-3xl gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <p className="max-w-2xl text-base leading-7 text-fg-muted md:text-lg">
              I’m Najla Putri Afifah, a software engineering graduate with 1+ year of experience building dependable backend and web systems—connecting technical decisions with real business needs.
            </p>
            <a href="#projects" className="inline-flex w-fit items-center gap-2 rounded-full bg-accent-primary px-6 py-3.5 text-sm font-bold text-accent-on transition hover:-translate-y-1">
              Explore work <ArrowDownRight size={17} />
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .65 }} className="mt-12 flex flex-wrap gap-x-9 gap-y-4 border-t border-border-subtle pt-6">
            {[["13+", "Projects"], ["3", "Professional roles"], ["12", "Credentials"]].map(([value, label]) => (
              <div key={label}><strong className="font-display text-3xl font-normal text-fg-primary">{value}</strong><span className="ml-2 text-xs uppercase tracking-widest text-fg-muted">{label}</span></div>
            ))}
          </motion.div>
        </div>

        <motion.aside initial={{ opacity: 0, x: 35 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .85, delay: .3 }} className="relative mx-auto w-full max-w-[28rem]">
          <Tilt max={6}>
            <WorkbenchPanel ready={ready} />
            <div className="panel-badge">
              <span>Experience</span>
              <strong>1+ year</strong>
            </div>
          </Tilt>
        </motion.aside>
      </motion.div>
    </section>
  );
}
