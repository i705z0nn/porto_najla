import { motion } from "framer-motion";
import { MaskText } from "@/components/ui/mask-text";
import { Reveal } from "@/components/ui/reveal";
import { skills } from "@/data/portfolio";
import { EASE } from "@/lib/motion";

export function SkillsSection() {
  return (
    <section data-theme="skills" id="skills" className="relative overflow-x-clip bg-bg-base py-24 text-fg-primary md:py-36">
      <div aria-hidden className="absolute -right-24 top-32 size-72 rounded-full bg-accent-secondary/20 blur-3xl" />
      <div aria-hidden className="absolute -left-28 bottom-16 size-80 rounded-full bg-accent-primary/16 blur-3xl" />

      <div className="container-shell relative split">
        <div className="split-side">
          <Reveal><p className="section-kicker mb-5">Toolkit · 03</p></Reveal>
          <MaskText className="section-title" lines={["The stack behind", <em className="text-accent-primary">the work.</em>]} />
          <Reveal delay={.15}><p className="mt-6 max-w-sm text-sm leading-relaxed text-fg-muted">What powers my logistics and government systems—from Laravel APIs and queues to realtime updates, frontend views, and deployment.</p></Reveal>
        </div>

        <ul className="border-t border-border-subtle">
          {skills.map((skill, index) => (
            <motion.li className="row" key={skill.name} initial="hide" whileInView="show" viewport={{ once: true, amount: .4 }}>
              <motion.span
                className="row-line"
                aria-hidden
                variants={{ hide: { scaleX: 0 }, show: { scaleX: 1 } }}
                transition={{ duration: 1.2, delay: .1 + index * .05, ease: EASE }}
              />
              <h3 className="text-lg font-medium tracking-[-.02em]">{skill.name}</h3>
              <div className="flex flex-wrap gap-2">
                {skill.tools.map((tool, toolIndex) => (
                  <motion.span
                    className="stack-tool"
                    key={tool}
                    variants={{ hide: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                    transition={{ duration: .6, delay: .1 + toolIndex * .06, ease: EASE }}
                  >
                    {tool}
                  </motion.span>
                ))}
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
