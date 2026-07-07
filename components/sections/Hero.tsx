"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { RevealText, Magnetic } from "@/components/ui/Primitives";
import { cn } from "@/lib/utils";

const stats = [
  { value: "15+", label: "Projects Delivered" },
  { value: "8+", label: "AI Systems Built" },
  { value: "50+", label: "Intl. Client Interactions" },
];

const CODE_LINES = [
  "> INITIALIZING AI CORE...",
  "> LOADING NEURAL NETWORKS...",
  "> SYNCING CLOUD ARCHITECTURE...",
  "  [OK] FastAPI Server Running on :8000",
  "  [OK] Next.js 15 Client Active on :3000",
  "  [OK] Voice AI Pipeline Connected",
  "> ESTABLISHING DATABASE CONNECTION...",
  "  [OK] PostgreSQL Synced",
  "> SYSTEM READY.",
  "> AWAITING INPUT_"
];

function Terminal() {
  const [lines, setLines] = useState<string[]>([]);
  
  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < CODE_LINES.length) {
        setLines(prev => [...prev, CODE_LINES[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
      }
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-xl border border-border/60 bg-bg-elevated overflow-hidden shadow-2xl">
      <div className="flex items-center gap-2 border-b border-border/40 bg-bg-warm px-4 py-3">
        <div className="h-3 w-3 rounded-full bg-red-500/80" />
        <div className="h-3 w-3 rounded-full bg-amber-500/80" />
        <div className="h-3 w-3 rounded-full bg-green-500/80" />
        <span className="ml-2 font-mono text-xs text-text-faint">zunaid-ai-core ~ bash</span>
      </div>
      <div className="p-6 font-mono text-sm leading-relaxed text-cool/80 h-[320px] overflow-hidden flex flex-col justify-end">
        {lines.map((line, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, x: -10 }} 
            animate={{ opacity: 1, x: 0 }}
            className={typeof line === "string" && line.startsWith("  [OK]") ? "text-amber/90" : ""}
          >
            {line}
          </motion.div>
        ))}
        {lines.length < CODE_LINES.length && (
          <motion.div animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }}>_</motion.div>
        )}
      </div>
    </div>
  );
}

function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (ref.current) {
        ref.current.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(232,146,60,0.07), transparent 70%)`;
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return <div ref={ref} className="absolute inset-0 pointer-events-none" />;
}

function GridTiles() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (ref.current) {
        ref.current.style.setProperty("--mx", `${e.clientX}px`);
        ref.current.style.setProperty("--my", `${e.clientY}px`);
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <div
      ref={ref}
      className="absolute inset-0 pointer-events-none opacity-[0.18]"
      style={{
        backgroundImage: `
          linear-gradient(to right, var(--border) 1px, transparent 1px),
          linear-gradient(to bottom, var(--border) 1px, transparent 1px)
        `,
        backgroundSize: "64px 64px",
        maskImage:
          "radial-gradient(450px circle at var(--mx, 50%) var(--my, 50%), black, transparent 70%)",
        WebkitMaskImage:
          "radial-gradient(450px circle at var(--mx, 50%) var(--my, 50%), black, transparent 70%)",
      }}
    />
  );
}

export function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex items-center px-6 pt-32 pb-20">
      <MouseGlow />
      <GridTiles />

      <div className="relative z-10 mx-auto max-w-7xl w-full grid lg:grid-cols-2 gap-16 items-center">
        {/* Terminal Left */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden lg:block w-full max-w-lg"
        >
          <Terminal />
        </motion.div>

        {/* Identity Right */}
        <div>
          {/* Eyebrow / Badges */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 flex flex-wrap items-center gap-3"
          >
            <span className="rounded-full border border-amber/40 bg-amber/10 px-3 py-1 font-mono text-[0.65rem] tracking-wider uppercase text-amber">
              Available for Work
            </span>
            <span className="rounded-full border border-cool/40 bg-cool/10 px-3 py-1 font-mono text-[0.65rem] tracking-wider uppercase text-cool">
              Based in Dhaka
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="display text-5xl sm:text-6xl max-w-3xl">
            <RevealText text="Building production" delay={0.1} />
            <br />
            <RevealText text="AI systems that" delay={0.3} />
            <br />
            <span className="text-amber">
              <RevealText text="matter." delay={0.5} />
            </span>
          </h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-8 max-w-xl text-lg text-text-muted leading-relaxed"
          >
            Voice AI, LLM pipelines, and SaaS solutions focused on real business impact in
            Bangladesh. Creator of <span className="text-text">DeshVox</span> — an AI-powered cloud
            call center platform making advanced automation accessible to local businesses.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Magnetic strength={0.3}>
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full bg-amber px-7 py-3.5 text-sm font-semibold text-bg transition-all hover:bg-amber-bright shadow-[0_0_20px_rgba(232,146,60,0.3)] hover:shadow-[0_0_30px_rgba(232,146,60,0.5)]"
              >
                View My Work
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </Magnetic>
            <Magnetic strength={0.3}>
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full border border-border-strong px-7 py-3.5 text-sm font-semibold text-text transition-all hover:border-amber hover:text-amber"
              >
                Get in Touch
              </a>
            </Magnetic>
          </motion.div>

          {/* Trust stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-16 flex flex-wrap gap-x-12 gap-y-6 border-t border-border/60 pt-8"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-bold text-text">{s.value}</div>
                <div className="mt-1 font-mono text-[0.7rem] tracking-[0.2em] uppercase text-text-faint">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-faint"
      >
        <span className="font-mono text-[0.65rem] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="h-8 w-px bg-gradient-to-b from-amber to-transparent"
        />
      </motion.div>
    </section>
  );
}
