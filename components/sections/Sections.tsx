"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { RevealText, SectionLabel, TiltCard } from "@/components/ui/Primitives";
import { cn } from "@/lib/utils";

// ---------- ABOUT ----------
const quickStats = [
  { value: "15+", label: "Projects Delivered" },
  { value: "8+", label: "AI Systems Built" },
  { value: "50+", label: "International Client Interactions" },
  { value: "B.Sc.", label: "Computer Science & Engineering" },
];

export function About() {
  return (
    <section id="about" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-5 relative">
            <SectionLabel num="01" text="About" />
            <h2 className="display mt-6 text-4xl lg:text-5xl">
              <RevealText text="Technology should" />
              <br />
              <span className="text-text-muted">
                <RevealText text="remove barriers." delay={0.1} />
              </span>
            </h2>
            
            {/* Avatar Image Add */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-10 relative max-w-xs rounded-2xl overflow-hidden border border-border/60 bg-bg-warm aspect-[4/5] shadow-2xl"
            >
              {/* Fallback glow if image fails or before load */}
              <div className="absolute inset-0 bg-gradient-to-tr from-amber/20 to-transparent z-0" />
              <img 
                src="/zunaid.png" 
                alt="Zunaid Hasan" 
                className="w-full h-full object-cover relative z-10 transition-transform hover:scale-105 duration-700"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </motion.div>
          </div>
          
          <div className="lg:col-span-7 space-y-6 text-text-muted text-lg leading-relaxed">
            <p>
              I&rsquo;m <span className="text-text font-medium">Zunaid Hasan</span>, an AI Engineer
              and Full Stack Developer based in Dhaka, Bangladesh. I build production-ready AI
              systems and full-stack applications with a focus on practical impact — especially
              solutions that work well for Bangla-speaking users and local businesses.
            </p>
            <p>
              My approach combines strong technical execution with clear communication. Currently
              balancing client coordination at <span className="text-text">Sardar IT</span> while
              actively developing <span className="text-text">DeshVox</span>, Bangladesh&rsquo;s
              AI-powered cloud call center platform.
            </p>
            <p className="border-l-2 border-amber pl-6 text-text">
              Core Philosophy: Technology should remove barriers. I&rsquo;m passionate about making advanced AI accessible, reliable, and useful for real people and businesses in Bangladesh.
            </p>
          </div>
        </div>

        {/* Quick stats — hairline grid */}
        <div className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-px bg-border/40">
          {quickStats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-bg p-8 hover:bg-bg-warm transition-colors"
            >
              <div className="text-4xl font-bold text-amber">{s.value}</div>
              <div className="mt-2 text-sm text-text-muted">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- SKILLS ----------
const ApiConstellationScene = dynamic(
  () => import("@/components/scenes/ApiConstellationScene").then(mod => mod.ApiConstellationScene),
  { ssr: false, loading: () => null }
);

const SKILL_CARDS = [
  {
    category: "lang", title: "Languages", color: "#E8923C",
    skills: ["Python", "JavaScript", "TypeScript", "SQL"]
  },
  {
    category: "ai", title: "AI / ML", color: "#F5A956",
    skills: ["Claude API", "OpenAI GPT", "ElevenLabs", "Retell AI", "PyTorch", "TensorFlow", "LangChain", "RAG Pipelines", "NLP", "Computer Vision (YOLO)"]
  },
  {
    category: "be", title: "Backend", color: "#B8D4E3",
    skills: ["FastAPI", "Node.js", "REST APIs", "Supabase", "PostgreSQL"]
  },
  {
    category: "fe", title: "Frontend", color: "#E8923C",
    skills: ["Next.js 15", "React", "Tailwind CSS", "Framer Motion"]
  },
  {
    category: "infra", title: "Infrastructure", color: "#B8D4E3",
    skills: ["Vercel", "Docker", "GitHub Actions", "Render"]
  },
  {
    category: "domain", title: "Communication & Domain", color: "#F5A956",
    skills: ["International Client Relations", "Voice AI Architecture", "Bangla-first AI Systems", "Cross-cultural Technical Coordination"]
  }
];

export function SkillsSectionWithScene() {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleMouseEnterCategory = (catId: string) => setActiveCategory(catId);
  const handleMouseEnterSkill = (skillName: string) => setActiveSkill(skillName);
  const handleMouseLeave = () => {
    setActiveSkill(null);
    setActiveCategory(null);
  };

  return (
    <section id="skills" className="relative min-h-screen px-6 py-32 overflow-hidden">
      
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ApiConstellationScene 
          activeSkill={activeSkill} 
          activeCategory={activeCategory} 
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-24">
          <SectionLabel num="02" text="Capabilities" />
          <h2 className="mt-6 text-5xl md:text-7xl font-extrabold tracking-tightest text-text">
            The stack <br />
            <span className="text-text-muted">behind the work.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CARDS.map((cat) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              onMouseEnter={() => handleMouseEnterCategory(cat.category)}
              onMouseLeave={handleMouseLeave}
              className={cn(
                "group relative overflow-hidden rounded-2xl border p-8 backdrop-blur-sm transition-all duration-300 cursor-pointer",
                activeCategory === cat.category 
                  ? "border-amber/60 bg-bg-warm/80" 
                  : "border-border/60 bg-bg/60 hover:border-border-strong"
              )}
            >
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at 50% 0%, ${cat.color}15, transparent 70%)` }}
              />

              <div className="relative flex items-center gap-3 mb-6">
                <span className="w-2 h-2 rounded-full" style={{ background: cat.color }} />
                <h3 className="font-mono text-xs tracking-[0.2em] uppercase text-text-muted">
                  {cat.title}
                </h3>
              </div>

              <div className="relative flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    onMouseEnter={() => handleMouseEnterSkill(skill)}
                    className={cn(
                      "rounded-lg border px-3 py-1.5 text-sm transition-all duration-200",
                      activeSkill === skill 
                        ? "border-amber bg-amber/10 text-amber scale-105" 
                        : "border-border bg-bg/40 text-text-muted hover:text-text hover:-translate-y-0.5"
                    )}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- PROJECTS ----------
const projectData = [
  {
    name: "DeshVox",
    description: "Bangladesh’s first AI-powered cloud call center platform. Features AI virtual receptionists (Bangla + English), smart IVR with intent detection, bulk voice/SMS campaigns, and real-time analytics.",
    stack: ["Next.js", "FastAPI", "ElevenLabs", "Retell AI", "Supabase"],
    git: "https://github.com/zunaidhasan/DeshVox",
    live: "https://desh-vox.vercel.app/"
  },
  {
    name: "e-FuelCard",
    description: "The e-FuelCard platform is a complete digital solution designed to eliminate the physical queues and manual paperwork currently required for fuel cards in Bangladesh. It provides a seamless mobile-first experience for citizens, admins, and pump operators.",
    stack: ["Next.js", "React", "Typescript", "CSS", "FastAPI"],
    git: "https://github.com/zunaidhasan/e-FuelCard",
    live: "https://e-fuel-card.vercel.app/"
  },
  {
    name: "MaatiGyan",
    description: "Satellite imagery + RAG-powered soil health analysis and crop recommendation system for smallholder farmers via WhatsApp. Democratizing agricultural intelligence in Bangla.",
    stack: ["React", "Python", "Pinecone", "WhatsApp API"],
    git: "https://github.com/zunaidhasan/MaatiGyan",
    live: "https://maatigyan.onrender.com/farmer/"
  },
  {
    name: "Fiverr Smart Assistant",
    description: "AI proposal generator and project matcher that helps freelancers win better gigs through smart reply generation and risk detection.",
    stack: ["FastAPI", "React", "Claude API"],
    git: "https://github.com/zunaidhasan/fiverr-smart-assistant",
    live: "https://fiverr-smart-assistant.vercel.app/"
  }
];

export function Projects() {
  return (
    <section id="projects" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <SectionLabel num="03" text="Featured Work" />
        <h2 className="display mt-6 text-5xl lg:text-7xl">
          <RevealText text="Selected projects" />
        </h2>
        <p className="mt-6 max-w-xl text-lg text-text-muted">
          Selected work that showcases my ability to deliver production-ready AI and full-stack solutions.
        </p>

        <div className="mt-20 grid lg:grid-cols-2 gap-8">
          {projectData.map((project, i) => (
            <TiltCard key={i} className="group relative rounded-2xl border border-border/60 bg-bg/40 p-8 backdrop-blur-sm transition-colors hover:border-amber/40 hover:bg-bg/60">
              <h3 className="text-2xl font-bold text-text group-hover:text-amber transition-colors">{project.name}</h3>
              <p className="mt-4 text-text-muted leading-relaxed min-h-[120px]">{project.description}</p>
              
              <div className="mt-6 flex flex-wrap gap-2">
                {project.stack.map(tech => (
                  <span key={tech} className="rounded-full border border-border bg-bg-warm px-3 py-1 text-xs text-text-faint">{tech}</span>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-4">
                <a href={project.live} target="_blank" rel="noreferrer" className="text-sm font-semibold text-amber hover:text-amber-bright transition-colors">View Live →</a>
                <a href={project.git} target="_blank" rel="noreferrer" className="text-sm font-semibold text-text-muted hover:text-text transition-colors">GitHub</a>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- EXPERIENCE ----------
const experienceData = [
  {
    role: "Foreign Communication Executive",
    company: "Sardar IT, Dhaka",
    period: "April 2026 – Present",
    desc: [
      "Managing international client communication and requirement gathering",
      "Bridging business needs with technical teams",
      "Ensuring smooth cross-cultural project coordination"
    ],
    stack: ["Client Relations", "Technical Translation", "Project Coordination"]
  },
  {
    role: "AI Engineering Intern",
    company: "CodeAlpha (Remote)",
    period: "January 2025 – February 2025",
    desc: [
      "Developed multiple AI applications including language translation tools, AI music generation (RNNs/GANs), real-time object detection & tracking (YOLO), and intelligent FAQ chatbots",
      "Gained hands-on experience with modern AI/ML frameworks and production workflows"
    ],
    stack: ["Python", "PyTorch", "TensorFlow", "OpenCV", "Claude API", "NLP"]
  },
  {
    role: "Operations Manager",
    company: "Data Nomad (Remote)",
    period: "February 2021 – June 2022",
    desc: [
      "Led team operations, training, and performance improvement initiatives",
      "Implemented data-driven quality control and reporting systems"
    ],
    stack: []
  }
];

export function Experience() {
  return (
    <section id="experience" className="relative px-6 py-32 bg-bg-warm/30">
      <div className="mx-auto max-w-7xl">
        <SectionLabel num="04" text="Experience" />
        <h2 className="display mt-6 text-5xl lg:text-7xl">
          <RevealText text="Where I've" />
          <br />
          <span className="text-text-muted">
            <RevealText text="made an impact." delay={0.1} />
          </span>
        </h2>

        <div className="mt-20 space-y-12">
          {experienceData.map((exp, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative pl-8 md:pl-0"
            >
              <div className="hidden md:block absolute left-[8.5rem] top-0 bottom-0 w-px bg-border/40" />
              <div className="hidden md:block absolute left-[8.5rem] top-2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-amber bg-bg" />
              
              <div className="md:grid md:grid-cols-[8rem_1fr] md:gap-12">
                <div className="text-sm font-mono text-text-faint mb-4 md:mb-0 md:pt-1">{exp.period}</div>
                <div>
                  <h3 className="text-2xl font-bold text-text">{exp.role}</h3>
                  <div className="text-amber mt-1">{exp.company}</div>
                  <ul className="mt-6 space-y-3 text-text-muted">
                    {exp.desc.map((item, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className="text-amber mt-1.5 text-xs">▹</span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                  {exp.stack.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {exp.stack.map(s => (
                        <span key={s} className="rounded-md bg-bg/50 px-2.5 py-1 text-xs text-text-muted border border-border/50">{s}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- EDUCATION ----------
export function Education() {
  return (
    <section className="relative px-6 py-20 bg-bg">
      <div className="mx-auto max-w-7xl">
        <SectionLabel num="05" text="Education" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 rounded-2xl border border-border/60 bg-bg-elevated p-8 md:p-12 hover:border-amber/40 transition-colors"
        >
          <div className="md:flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-bold text-text">B.Sc. in Computer Science & Engineering</h3>
              <div className="text-amber mt-1 text-lg">Daffodil International University</div>
            </div>
            <div className="text-sm font-mono text-text-faint mt-4 md:mt-0">2022 – 2025</div>
          </div>
          <div className="mt-6 text-text-muted">
            <span className="font-semibold text-text">Thesis:</span> Deep Learning-Based Identification of Hydrocotyle sibthorpioides — Dataset Contribution and Model Performance Benchmarking.
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ---------- CONTACT & FOOTER ----------
export function Contact() {
  return (
    <section id="contact" className="relative px-6 pt-32 pb-12">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-3xl border border-border/60 bg-bg-elevated p-8 md:p-16 lg:p-24 overflow-hidden relative group hover:border-amber/40 transition-colors">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-amber/10 rounded-full blur-3xl pointer-events-none group-hover:bg-amber/20 transition-colors duration-1000" />
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="display text-4xl md:text-6xl text-text">
                Let&rsquo;s Build Something <span className="text-amber">Together</span>
              </h2>
              <p className="mt-6 text-lg text-text-muted max-w-md leading-relaxed">
                Whether you’re looking to implement AI voice solutions, develop a full-stack SaaS product, or explore collaboration opportunities — I’m always excited to connect with like-minded builders and businesses.
              </p>
              <div className="mt-10">
                <a href="mailto:connect.zunaid@gmail.com" className="inline-flex items-center justify-center gap-2 rounded-full bg-amber px-8 py-4 font-semibold text-bg transition-all hover:bg-amber-bright hover:scale-105">
                  Ready to build something impactful? Let&rsquo;s talk.
                </a>
              </div>
            </div>

            <div className="space-y-8 lg:pl-12">
              <div>
                <div className="font-mono text-xs tracking-widest uppercase text-text-faint mb-2">Email</div>
                <a href="mailto:connect.zunaid@gmail.com" className="text-xl text-text hover:text-amber transition-colors">connect.zunaid@gmail.com</a>
              </div>
              <div>
                <div className="font-mono text-xs tracking-widest uppercase text-text-faint mb-2">Phone</div>
                <a href="tel:+8801960569957" className="text-xl text-text hover:text-amber transition-colors">(+880) 1960-569957</a>
              </div>
              <div className="flex gap-6 pt-4">
                <a href="https://linkedin.com/in/zunaid-ishan" target="_blank" rel="noreferrer" className="text-text-muted hover:text-amber transition-colors font-semibold">LinkedIn</a>
                <a href="https://github.com/zunaidhasan" target="_blank" rel="noreferrer" className="text-text-muted hover:text-amber transition-colors font-semibold">GitHub</a>
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-20 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-border/40 pt-8 text-sm text-text-faint">
          <div>© 2026 Zunaid Hasan. Dhaka, Bangladesh.</div>
          <div className="flex items-center gap-6">
            <a href="#top" className="hover:text-text transition-colors">Back to top ↑</a>
          </div>
        </footer>
      </div>
    </section>
  );
}
