import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { contact } from "@/data/portfolio";
import { EASE } from "@/lib/motion";

type Token = { text: string; tone?: string; start: number };

const source: { indent?: string; gap?: boolean; tokens: [string, string?][] }[] = [
  { tokens: [["const ", "code-keyword"], ["engineer", "code-name"], [" = {"]] },
  { indent: "code-indent", tokens: [["name: "], ["'Najla'", "code-string"], [","]] },
  { indent: "code-indent", tokens: [["craft: "], ["'backend systems'", "code-string"], [","]] },
  { indent: "code-indent", tokens: [["stack: ["], ["'PHP'", "code-string"], [", "], ["'Laravel'", "code-string"], [","]] },
  { indent: "code-indent-deep", tokens: [["'PostgreSQL'", "code-string"], [", "], ["'MySQL'", "code-string"], [", "], ["'Redis'", "code-string"], ["],"]] },
  { indent: "code-indent", tokens: [["based: "], ["'Tangerang'", "code-value"], [","]] },
  { tokens: [["}"]] },
  { gap: true, tokens: [["// engineering with business value", "code-comment"]] },
  { tokens: [["engineer", "code-name"], [".build("], ["'systems that work'", "code-string"], [")"]] },
];

let codeLength = 0;
const code = source.map((line) => ({
  ...line,
  tokens: line.tokens.map(([text, tone]): Token => {
    const token = { text, tone, start: codeLength };
    codeLength += text.length;
    return token;
  }),
}));

// Types itself out; the untyped part keeps its space so nothing reflows.
function CodeView({ ready }: { ready: boolean }) {
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const typed = reduced ? codeLength : progress;

  useEffect(() => {
    if (!ready || reduced) return;
    let count = 0;
    const step = () => {
      count += 1;
      setProgress(count);
      if (count < codeLength) timer = window.setTimeout(step, 24);
    };
    let timer = window.setTimeout(step, 900);
    return () => window.clearTimeout(timer);
  }, [ready, reduced]);

  return (
    <div className="code-lines">
      {code.map((line, lineIndex) => (
        <div className={`${line.indent ?? ""} ${line.gap ? "code-gap" : ""}`} key={lineIndex}>
          {line.tokens.map(({ text, tone, start }, tokenIndex) => {
            const shown = Math.min(Math.max(typed - start, 0), text.length);
            const inToken = typed >= start && typed < start + text.length;
            const atEnd = typed >= codeLength && lineIndex === code.length - 1 && tokenIndex === line.tokens.length - 1;
            return (
              <span key={tokenIndex}>
                <span className={tone}>{text.slice(0, shown)}</span>
                {(inToken || atEnd) && <span className="code-caret" />}
                <span className="invisible">{text.slice(shown)}</span>
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export function WorkbenchPanel({ ready }: { ready: boolean }) {
  const [view, setView] = useState<"code" | "photo">("code");

  return (
    <div className="panel-frame">
      <div className="panel">
        <div className="flex items-center justify-between gap-2">
          <div className="panel-dots" aria-hidden><span /><span /><span /></div>
          <div className="panel-tabs" role="group" aria-label="Panel view">
            <button type="button" aria-pressed={view === "code"} onClick={() => setView("code")}>engineer.ts</button>
            <button type="button" aria-pressed={view === "photo"} onClick={() => setView("photo")}>najla.png</button>
          </div>
        </div>
        <div className="relative">
          <motion.div aria-hidden initial={false} animate={{ opacity: view === "code" ? 1 : 0 }} transition={{ duration: .2 }}>
            <CodeView ready={ready} />
            <div className="panel-status"><span>Ln 9, Col 36</span><span>UTF-8 · TypeScript</span></div>
          </motion.div>
          <AnimatePresence initial={false}>
            {view === "photo" && (
              <motion.div className="panel-photo" initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: .4, ease: EASE }}>
                <img src="/images/najla-portrait.png" alt="Najla Putri Afifah" className="h-full w-full object-cover object-top grayscale-[15%]" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg-contrast via-bg-contrast/55 to-transparent p-5 pt-16 text-fg-inverted">
                  <p className="font-display text-2xl">Najla Putri Afifah</p>
                  <a href={`mailto:${contact.email}`} className="mt-1 inline-flex items-center gap-1 text-xs text-fg-inverted/80">Available for meaningful work <ArrowUpRight size={13} /></a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
