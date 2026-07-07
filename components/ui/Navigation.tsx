"use client";
import { useEffect, useState } from "react";
import { Magnetic } from "./Primitives";
import { cn } from "@/lib/utils";

const links = [
  { label: "Work", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
        scrolled ? "py-3 backdrop-blur-xl bg-bg/50 border-b border-border/40" : "py-6 bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
        <Magnetic strength={0.25}>
          <a href="#top" className="font-mono text-sm tracking-[0.3em] text-text uppercase">
            ZH<span className="text-amber">.</span>
          </a>
        </Magnetic>

        <nav className="hidden md:flex items-center gap-1 rounded-full border border-border/60 bg-bg/40 backdrop-blur-xl px-2 py-1.5">
          {links.map((link) => (
            <Magnetic key={link.href} strength={0.2}>
              <a
                href={link.href}
                className="px-4 py-1.5 text-sm text-text-muted hover:text-text transition-colors rounded-full hover:bg-bg-elevated"
              >
                {link.label}
              </a>
            </Magnetic>
          ))}
        </nav>

        <Magnetic strength={0.4}>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-amber px-5 py-2.5 text-sm font-semibold text-bg transition-all hover:bg-amber-bright"
          >
            Let&rsquo;s talk
            <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
          </a>
        </Magnetic>
      </div>
    </header>
  );
}
