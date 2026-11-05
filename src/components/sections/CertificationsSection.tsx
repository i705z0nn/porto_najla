import { ArrowUpRight } from "lucide-react";
import { MaskText } from "@/components/ui/mask-text";
import { Reveal } from "@/components/ui/reveal";
import { certificateBundle, certifications } from "@/data/portfolio";
import { trackCellSpot } from "@/lib/motion";

export function CertificationsSection() {
  return (
    <section data-theme="credentials" id="credentials" className="relative overflow-x-clip bg-bg-base py-24 text-fg-primary md:py-36">
      <div aria-hidden className="absolute left-1/4 top-10 size-80 rounded-full bg-accent-secondary/20 blur-3xl" />
      <div className="container-shell relative">
        <div className="section-intro">
          <div>
            <Reveal><p className="section-kicker mb-5">Credentials · 05</p></Reveal>
            <MaskText className="section-title" lines={["Learning,", <em className="text-accent-primary">verified.</em>]} />
          </div>
          <Reveal delay={.15}><p className="section-note">Professional, language, and technical learning credentials—with direct verification links.</p></Reveal>
        </div>

        <Reveal>
          <div className="soft-grid" onPointerMove={trackCellSpot}>
            {certifications.map((certification) => (
              <a className="grid-cell" key={certification.href} href={certification.href} target="_blank" rel="noreferrer" data-cursor="Verify">
                <div className="grid-cell-head">
                  <span className="grid-cell-title">{certification.title}</span>
                  <ArrowUpRight className="cert-arrow" size={16} aria-hidden />
                </div>
                <p className="mt-8 text-xs text-fg-muted">{certification.group}</p>
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-8 text-right">
          <a className="text-link" href={certificateBundle} target="_blank" rel="noreferrer">Open Bangkit certificate bundle <ArrowUpRight size={15} /></a>
        </Reveal>
      </div>
    </section>
  );
}
