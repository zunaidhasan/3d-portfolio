"use client";
import { useRef } from "react";
import { Navigation } from "@/components/ui/Navigation";
import { ShaderBackground } from "@/components/ui/ShaderBackground";
import { SceneCanvas } from "@/components/three/SceneCanvas";
import { Hero } from "@/components/sections/Hero";
import { 
  About, 
  SkillsSectionWithScene, 
  Projects, 
  Experience, 
  Education, 
  Contact 
} from "@/components/sections/Sections";

export default function Home() {
  const progressRef = useRef(0);

  return (
    <main className="relative min-h-screen">
      {/* Background elements */}
      <ShaderBackground />
      <SceneCanvas progressRef={progressRef} />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Page Content */}
      <div className="relative z-10">
        <Hero />
        <About />
        <SkillsSectionWithScene />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </div>
    </main>
  );
}
