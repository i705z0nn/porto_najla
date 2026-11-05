import { motion } from "framer-motion";
import { MaskText } from "@/components/ui/mask-text";
import { Reveal } from "@/components/ui/reveal";
import { experiences } from "@/data/portfolio";
import { EASE } from "@/lib/motion";

export function ExperienceSection() {
  return (
    <section data-theme="experience" id="experience" className="relative overflow-x-clip bg-bg-base py-24 text-fg-primary md:py-36">
      <div aria-hidden className="pastel-orb absolute -left-16 top-20 size-56 rounded-[65%_35%_50%_50%] bg-accent-secondary/35" />
      <div aria-hidden className="pastel-orb absolute -right-20 bottom-24 size-72 rounded-[42%_58%_38%_62%] bg-accent-primary/30" />
      <div className="container-shell relative split">
        <div className="split-side">
          <Reveal><p className="section-kicker mb-5">Experience · 04</p></Reveal>
          <MaskText className="section-title" lines={["Three contexts.", <em className="text-accent-primary">One direction.</em>]} />
          <Reveal delay={.15}><p className="mt-6 max-w-sm text-sm leading-relaxed text-fg-muted">Industry, government, and an intensive academy cohort shaped a perspective that moves comfortably between backend systems, user needs, and business workflows.</p></Reveal>
        </div>

        <div className="border-t border-border-subtle">
          {experiences.map((experience, index) => (
            <Reveal key={experience.organization} delay={index * .06}>
              <motion.article className="row experience-row" initial="hide" whileInView="show" viewport={{ once: true }}>
                <motion.span
                  className="row-line"
                  aria-hidden
                  variants={{ hide: { scaleX: 0 }, show: { scaleX: 1 } }}
                  transition={{ duration: 1.2, delay: .1 + index * .08, ease: EASE }}
                />
                <span className="pt-1.5 font-mono text-[.6875rem] text-fg-muted">{experience.period}</span>
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-medium tracking-[-.02em]">{experience.role}</h3>
                      <p className="mt-1 text-sm text-fg-muted">{experience.organization}</p>
                    </div>
                    <span className="experience-number" aria-hidden>{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <p className="mt-5 text-[.625rem] font-semibold uppercase tracking-[.16em] text-fg-muted">{experience.context}</p>
                  <p className="mt-2.5 text-sm leading-relaxed text-fg-muted">{experience.description}</p>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
