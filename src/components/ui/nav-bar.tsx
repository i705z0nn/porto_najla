import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Magnetic } from "@/components/ui/magnetic";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

const links = [
  { label: "Home", href: "#home" },
  { label: "Work", href: "#projects" },
  { label: "Expertise", href: "#expertise" },
  { label: "Toolkit", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Credentials", href: "#credentials" },
];

export function NavBar() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: .3 });
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(`#${entry.target.id}`);
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    links.forEach((link) => {
      const section = document.querySelector(link.href);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <motion.div className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-accent-primary to-accent-secondary" style={{ scaleX: progress }} aria-hidden />
      <motion.header
        data-theme="nav"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: .25, duration: .65 }}
        className={cn(
          "fixed left-1/2 top-5 z-50 hidden -translate-x-1/2 items-center border border-border-subtle bg-bg-elevated/75 text-fg-primary shadow-[0_12px_38px_rgba(112,80,108,.14)] backdrop-blur-xl transition-all duration-500 md:flex",
          scrolled ? "gap-6 rounded-full px-5 py-2.5" : "gap-9 rounded-[1.35rem] px-7 py-3.5",
        )}
      >
        <a href="#home" className="font-display text-xl tracking-tight">Najla.</a>
        <span className="h-5 w-px bg-border-subtle" />
        <nav className="flex items-center gap-5">
          {links.map((link) => <a key={link.href} href={link.href} className="nav-link text-xs font-semibold" aria-current={active === link.href && link.href !== "#home" ? "true" : undefined}>{link.label}</a>)}
        </nav>
        <ThemeToggle className="grid size-8 place-items-center rounded-full transition hover:bg-accent-primary/20" />
        <AnimatePresence initial={false}>
          {scrolled && (
            <motion.span initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: "auto" }} exit={{ opacity: 0, width: 0 }} transition={{ duration: .4, ease: EASE }} className="-my-2 overflow-hidden py-2">
              <Magnetic><a href="#contact" className="nav-talk">Let’s talk <ArrowUpRight size={13} /></a></Magnetic>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.header>

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="fixed right-4 top-4 z-[70] grid size-12 place-items-center rounded-full bg-bg-contrast text-fg-inverted shadow-[0_12px_30px_rgba(112,80,108,.2)] md:hidden"
        aria-expanded={open}
        aria-label={open ? "Close navigation" : "Open navigation"}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
      <ThemeToggle size={20} className="fixed right-[4.5rem] top-4 z-[70] grid size-12 place-items-center rounded-full bg-bg-contrast text-fg-inverted shadow-[0_12px_30px_rgba(112,80,108,.2)] md:hidden" />

      <AnimatePresence>
        {open && (
          <motion.div
            data-theme="nav"
            initial={{ opacity: 0, clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            transition={{ duration: .55, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] flex flex-col justify-between overflow-hidden bg-bg-base p-6 text-fg-primary md:hidden"
          >
            <div aria-hidden className="pastel-orb absolute -left-16 top-1/4 size-52 rounded-full bg-accent-primary/25" />
            <div aria-hidden className="pastel-orb absolute -right-20 bottom-1/4 size-64 rounded-full bg-accent-secondary/35" />
            <a href="#home" onClick={() => setOpen(false)} className="font-display text-3xl">Najla.</a>
            <nav className="relative flex flex-col gap-3">
              {links.map((link, index) => (
                <motion.a key={link.href} href={link.href} onClick={() => setOpen(false)} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .12 + index * .06 }} className="font-display text-6xl leading-none tracking-tight hover:text-accent-primary">
                  {link.label}
                </motion.a>
              ))}
            </nav>
            <a href="mailto:najlaputriafifah16@gmail.com" className="text-sm text-fg-muted">najlaputriafifah16@gmail.com</a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
