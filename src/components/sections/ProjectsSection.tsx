import { AnimatePresence, LayoutGroup, motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";
import { MaskText } from "@/components/ui/mask-text";
import { Reveal } from "@/components/ui/reveal";
import { categories, projects, projectThemes, type Project } from "@/data/portfolio";
import { EASE, useInteractive, useScrollLock } from "@/lib/motion";

const pad = (value: number) => String(value).padStart(2, "0");

const themeVars = (project: Project) => {
  const theme = projectThemes[project.id];
  return { "--project-bg": theme.bg, "--project-accent": theme.accent, "--project-text": theme.text } as CSSProperties;
};

type CasePanelProps = {
  project: Project;
  position: number;
  total: number;
  onClose: () => void;
  onStep: (amount: number) => void;
};

function CasePanel({ project, position, total, onClose, onStep }: CasePanelProps) {
  const panelRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  useScrollLock(true);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    return () => opener?.focus?.({ preventScroll: true });
  }, []);

  useEffect(() => {
    panelRef.current?.scrollTo({ top: 0 });
  }, [project.id]);

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") onClose();
    if (event.key === "ArrowRight") onStep(1);
    if (event.key === "ArrowLeft") onStep(-1);
    if (event.key !== "Tab" || !panelRef.current) return;
    const focusable = panelRef.current.querySelectorAll<HTMLElement>("a[href], button");
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <motion.div className="fixed inset-0 z-[70]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .3 }} onKeyDown={onKeyDown}>
      <div className="absolute inset-0 bg-bg-contrast/45 backdrop-blur-sm" data-cursor="Close" onClick={onClose} />
      <motion.aside
        className="case-panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-title"
        tabIndex={-1}
        style={themeVars(project)}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: .6, ease: EASE }}
      >
        <div className="case-bar">
          <span className="font-mono text-xs text-fg-muted">{pad(position + 1)} / {pad(total)}</span>
          <div className="flex gap-1.5">
            <button type="button" aria-label="Previous project" onClick={() => onStep(-1)}><ArrowLeft size={17} /></button>
            <button type="button" aria-label="Next project" onClick={() => onStep(1)}><ArrowRight size={17} /></button>
            <button type="button" aria-label="Close case study" ref={closeRef} onClick={onClose}><X size={17} /></button>
          </div>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={project.id} className="px-5 pb-11 pt-5 md:px-8 md:pb-14 md:pt-7" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: .3, ease: EASE }}>
            <div className="case-image"><img src={project.image} alt={`${project.title} interface`} /></div>
            <p className="project-eyebrow">{project.eyebrow}</p>
            <h3 id="case-title" className="mb-4 mt-3 font-display text-[clamp(2.5rem,6vw,3.5rem)] leading-none tracking-[-.04em]">{project.title}</h3>
            <p className="text-[1.0625rem] leading-[1.65] text-fg-muted">{project.summary}</p>
            <dl className="my-6 grid grid-cols-2 gap-4 border-y border-border-subtle py-[1.125rem]">
              <div><dt className="project-eyebrow mb-1 text-fg-muted">Role</dt><dd className="text-[.9375rem] font-medium text-fg-primary">{project.role}</dd></div>
              <div><dt className="project-eyebrow mb-1 text-fg-muted">Period</dt><dd className="text-[.9375rem] font-medium text-fg-primary">{project.period}</dd></div>
            </dl>
            <div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            <ul className="case-list">
              {project.contributions.map((item, index) => (
                <motion.li key={item} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .15 + index * .05, duration: .5, ease: EASE }}>{item}</motion.li>
              ))}
            </ul>
            {project.link && <a className="pill-button" href={project.link.href} target="_blank" rel="noreferrer">{project.link.label} <ArrowUpRight size={16} /></a>}
          </motion.div>
        </AnimatePresence>
      </motion.aside>
    </motion.div>
  );
}

const WINDOW_SPRING = { stiffness: 120, damping: 18 };

// The browser window drifts toward the pointer and lifts while hovered.
function ProjectCardBody({ project, number, onOpen }: { project: Project; number: string; onOpen: () => void }) {
  const interactive = useInteractive();
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);
  const windowX = useSpring(offsetX, WINDOW_SPRING);
  const windowY = useSpring(offsetY, WINDOW_SPRING);

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const rect = event.currentTarget.getBoundingClientRect();
    offsetX.set(((event.clientX - rect.left) / rect.width - .5) * 22);
    offsetY.set(((event.clientY - rect.top) / rect.height - .5) * 14 - 14);
  };
  const reset = () => {
    offsetX.set(0);
    offsetY.set(0);
  };

  return (
    <div className="project-inner" onPointerMove={onPointerMove} onPointerLeave={reset}>
      <div className="project-preview">
        <span className="project-arrow" aria-hidden><ArrowUpRight size={18} /></span>
        <motion.div className="project-window" style={{ x: windowX, y: windowY }}>
          <div className="project-window-bar" aria-hidden><span /><span /><span /></div>
          <img src={project.image} alt="" loading="lazy" />
        </motion.div>
      </div>
      <div className="project-copy">
        <div>
          <p className="project-eyebrow">{number} · {project.eyebrow}</p>
          <h3 className="mt-5 font-display text-5xl leading-none tracking-[-.04em]">
            <button type="button" className="project-open" data-cursor="View case" onClick={onOpen}>{project.title}</button>
          </h3>
          <p className="mt-4 max-w-md text-sm leading-relaxed opacity-80">{project.summary}</p>
        </div>
        <div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
      </div>
    </div>
  );
}

export function ProjectsSection() {
  const [category, setCategory] = useState("All");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const visible = category === "All" ? projects : projects.filter((project) => project.category === category);
  const position = visible.findIndex((project) => project.id === selectedId);

  const step = (amount: number) => {
    setSelectedId(visible[(position + amount + visible.length) % visible.length].id);
  };

  // The first card spans the row, and so does a last card left without a partner.
  const isWide = (index: number) => index === 0 || (index === visible.length - 1 && index % 2 === 1);

  return (
    <section data-theme="projects" id="projects" className="relative overflow-x-clip bg-bg-base py-24 text-fg-primary md:py-36">
      <div aria-hidden className="absolute -left-32 top-56 size-96 rounded-full bg-accent-secondary/20 blur-3xl" />
      <div aria-hidden className="absolute -right-40 top-[38%] size-[30rem] rounded-full bg-accent-primary/20 blur-3xl" />
      <div className="container-shell relative">
        <div className="section-intro">
          <div>
            <Reveal><p className="section-kicker mb-5">Selected work · 01</p></Reveal>
            <MaskText className="section-title" lines={["Systems with", <em className="text-accent-primary">real-world weight.</em>]} />
          </div>
          <Reveal delay={.15}><p className="section-note">From logistics operations to public services and mobile products. Open any project to read the full case study.</p></Reveal>
        </div>

        <LayoutGroup>
          <Reveal className="mb-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div role="group" aria-label="Filter projects by discipline" className="flex flex-wrap gap-1">
              {categories.map((item) => (
                <button key={item} type="button" className={`filter ${item === category ? "is-active" : ""}`} aria-pressed={item === category} onClick={() => setCategory(item)}>
                  {item === category && <motion.span className="absolute inset-0 rounded-full bg-accent-primary" layoutId="filter-pill" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                  <span className="relative">{item}</span>
                </button>
              ))}
            </div>
            <span className="whitespace-nowrap font-mono text-[.6875rem] text-fg-muted" aria-live="polite">{pad(visible.length)} projects</span>
          </Reveal>

          <motion.div className="project-grid" layout>
            <AnimatePresence mode="popLayout">
              {visible.map((project, index) => (
                <motion.article
                  id={`project-${project.id}`}
                  className={`project-card ${isWide(index) ? "is-wide" : ""}`}
                  style={themeVars(project)}
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 34 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: .12 }}
                  exit={{ opacity: 0, scale: .96 }}
                  transition={{ duration: .65, ease: EASE }}
                >
                  <ProjectCardBody project={project} number={pad(projects.indexOf(project) + 1)} onOpen={() => setSelectedId(project.id)} />
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>

      <AnimatePresence>
        {position >= 0 && (
          <CasePanel project={visible[position]} position={position} total={visible.length} onClose={() => setSelectedId(null)} onStep={step} />
        )}
      </AnimatePresence>
    </section>
  );
}
