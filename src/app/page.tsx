"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { TechStackSection } from "@/components/sections/TechStackSection";
import { LearningSection } from "@/components/sections/LearningSection";
import { ValuePropsSection } from "@/components/sections/ValuePropsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { CommandPalette } from "@/components/interactive/CommandPalette";
import { ResumeModal } from "@/components/interactive/ResumeModal";
import { CustomCursor } from "@/components/interactive/CustomCursor";
import { SmoothScroll } from "@/components/interactive/SmoothScroll";
import { Canvas3DBackground } from "@/components/interactive/Canvas3DBackground";
import { IntroLoader } from "@/components/interactive/IntroLoader";

export default function Home() {
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <SmoothScroll>
      {/* Intro Loading Animation */}
      <IntroLoader />

      {/* Interactive Ambient 3D Canvas Background */}
      <Canvas3DBackground />

      {/* Custom Follower Cursor */}
      <CustomCursor />

      {/* Cmd+K Command Palette Modal */}
      <CommandPalette onOpenResume={() => setResumeOpen(true)} />

      {/* Resume Viewer & Download Modal */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />

      {/* Top Glassmorphism Navigation */}
      <Navbar onOpenResume={() => setResumeOpen(true)} />

      {/* Main Content Assembly */}
      <main className="relative z-10 space-y-12" suppressHydrationWarning>
        <HeroSection onOpenResume={() => setResumeOpen(true)} />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <TechStackSection />
        <LearningSection />
        <ValuePropsSection />
        <ContactSection />
      </main>

      {/* Minimal Footer */}
      <Footer />
    </SmoothScroll>
  );
}
