import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { Magnetic } from "@/components/ui/magnetic";
import { MaskText } from "@/components/ui/mask-text";
import { Reveal } from "@/components/ui/reveal";
import { contact } from "@/data/portfolio";
import { useInteractive } from "@/lib/motion";

const copyLabels = { idle: "Copy email", copied: "Copied ✓", failed: "Couldn’t copy" };

export function Footer() {
  const interactive = useInteractive();
  const [status, setStatus] = useState<keyof typeof copyLabels>("idle");
  const timer = useRef(0);
  const wrapRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start end", "start 40%"] });
  const scale = useTransform(scrollYProgress, [0, 1], [.94, 1]);

  const glowX = useMotionValue(50);
  const glowY = useMotionValue(30);
  const glow = useMotionTemplate`radial-gradient(520px circle at ${glowX}% ${glowY}%, color-mix(in srgb, var(--color-accent-primary) 28%, transparent), transparent 70%)`;

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const rect = event.currentTarget.getBoundingClientRect();
    glowX.set(((event.clientX - rect.left) / rect.width) * 100);
    glowY.set(((event.clientY - rect.top) / rect.height) * 100);
  };

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setStatus("idle"), 2000);
  };

  return (
    <footer data-theme="projects" id="contact" ref={wrapRef} className="bg-bg-base px-4 pb-4 pt-8 md:px-8 md:pb-24">
      <motion.div className="contact-card" style={{ scale }} onPointerMove={onPointerMove}>
        <motion.div className="pointer-events-none absolute inset-0" style={{ background: glow }} aria-hidden />
        <div className="relative mx-auto max-w-5xl text-center">
          <Reveal><p className="mb-8 text-[.72rem] font-bold uppercase tracking-[.2em] text-accent-secondary">Contact · 06</p></Reveal>
          <MaskText className="contact-title" lines={["Let’s build something", <em className="text-accent-primary">that matters.</em>]} />
          <Reveal delay={.15} className="mt-12 flex flex-wrap items-center justify-center gap-x-7 gap-y-4">
            <Magnetic strength={.4}><a className="say-hello" href={`mailto:${contact.email}`}>Start a conversation <ArrowUpRight size={17} /></a></Magnetic>
            <button className="copy-button" type="button" onClick={copyEmail}>
              <span className="copy-address">{contact.email}</span>
              <span className="inline-block min-w-[5.5rem] text-left font-mono text-[.6875rem] text-accent-secondary" aria-live="polite">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span className="inline-block" key={status} initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -12, opacity: 0 }} transition={{ duration: .18 }}>{copyLabels[status]}</motion.span>
                </AnimatePresence>
              </span>
            </button>
          </Reveal>
        </div>

        <div className="relative mt-20 flex flex-col items-start justify-between gap-7 border-t border-fg-inverted/15 pt-7 text-xs text-fg-inverted/70 md:mt-28 md:flex-row md:items-end">
          <div>
            <p className="mb-2 text-fg-inverted">Najla Putri Afifah</p>
            <p>Backend Developer · Tangerang, Indonesia</p>
          </div>
          <div className="contact-links">
            <a href={contact.github} target="_blank" rel="noreferrer">GitHub</a>
            <a href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={`mailto:${contact.email}`}>Email</a>
          </div>
          <p>© {new Date().getFullYear()} Najla Putri Afifah.</p>
        </div>
      </motion.div>
    </footer>
  );
}
