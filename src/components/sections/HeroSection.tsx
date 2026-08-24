"use client";

import { motion } from "framer-motion";
import { ArrowRight, Code2, Download, Sparkles, Terminal, ChevronDown, Cpu, Network, Database, Layers } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";

interface HeroSectionProps {
  onOpenResume: () => void;
}

export function HeroSection({ onOpenResume }: HeroSectionProps) {
  const floatingTags = [
    { label: "Deep Learning", icon: Cpu, color: "text-cyan-400 border-cyan-500/30 bg-cyan-950/40" },
    { label: "Neural Networks", icon: Network, color: "text-violet-400 border-violet-500/30 bg-violet-950/40" },
    { label: "High-Concurrency APIs", icon: Database, color: "text-blue-400 border-blue-500/30 bg-blue-950/40" },
    { label: "Microservices", icon: Layers, color: "text-emerald-400 border-emerald-500/30 bg-emerald-950/40" }
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Dynamic Background Glow Spheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-violet-600/20 blur-[150px] rounded-full pointer-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto text-center space-y-8 z-10">
        {/* Profile Avatar Showcase with Rotating Cyber Ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative inline-block mx-auto group"
        >
          {/* Animated Neon Cyber Ring */}
          <div className="absolute -inset-2.5 rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 to-violet-600 opacity-80 blur-lg group-hover:opacity-100 transition-all duration-700 animate-spin [animation-duration:10s]" />
          
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-2 border-blue-400/90 dark:border-blue-400 shadow-[0_0_40px_rgba(59,130,246,0.5)] bg-slate-950">
            <img
              src={PORTFOLIO_DATA.personal.avatar}
              alt={PORTFOLIO_DATA.personal.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </div>

          {/* AI Core Status Indicator Dot */}
          <div className="absolute bottom-2 right-2 p-1 rounded-full bg-slate-950 border border-blue-500/50 shadow-lg">
            <div className="w-4 h-4 rounded-full bg-emerald-500 animate-ping absolute opacity-75" />
            <div className="w-4 h-4 rounded-full bg-emerald-500 relative flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>
          </div>
        </motion.div>

        {/* Availability & System Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center space-x-2.5 px-5 py-2.5 rounded-full border border-blue-400/40 dark:border-blue-500/40 bg-blue-500/10 dark:bg-blue-950/60 backdrop-blur-xl shadow-[0_0_25px_rgba(59,130,246,0.2)]"
        >
          <Terminal className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400 animate-pulse" />
          <span className="text-xs font-mono font-bold text-blue-700 dark:text-blue-300 tracking-wider uppercase">
            AI_CORE: ACTIVE • {PORTFOLIO_DATA.personal.status}
          </span>
        </motion.div>

        {/* Hero Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="space-y-4"
        >
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            <span className="block">{PORTFOLIO_DATA.personal.role}</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-400 to-violet-500 dark:from-blue-400 dark:via-cyan-300 dark:to-violet-400 font-black drop-shadow-sm">
              Engineering Intelligent Backends
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
            Building high-concurrency backend systems, neural network workflows, and high-performance digital platforms from Mansoura National University, Egypt.
          </p>
        </motion.div>

        {/* Floating Specialty Chips */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-2.5 max-w-3xl mx-auto pt-1"
        >
          {floatingTags.map((tag, idx) => {
            const Icon = tag.icon;
            return (
              <div
                key={idx}
                className={`inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl border text-xs font-bold backdrop-blur-md transition-all duration-300 hover:scale-105 shadow-sm ${tag.color}`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tag.label}</span>
              </div>
            );
          })}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-4"
        >
          {/* View Projects CTA */}
          <a
            href="#projects"
            className="group relative inline-flex items-center space-x-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm transition-all duration-300 shadow-[0_0_35px_rgba(37,99,235,0.45)] hover:shadow-[0_0_50px_rgba(37,99,235,0.7)] hover:-translate-y-0.5"
          >
            <span>Explore Projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </a>

          {/* Download Resume CTA */}
          <button
            onClick={onOpenResume}
            className="inline-flex items-center space-x-2 px-7 py-4 rounded-2xl border border-slate-300 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-bold text-sm transition-all duration-300 shadow-sm backdrop-blur-md hover:border-blue-500/50 hover:-translate-y-0.5"
          >
            <Download className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Download Resume</span>
          </button>

          {/* Contact Me CTA */}
          <a
            href="#contact"
            className="inline-flex items-center space-x-2 px-6 py-4 rounded-2xl border border-transparent hover:border-slate-200 dark:hover:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-sm transition-all duration-200"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Contact Me</span>
          </a>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {PORTFOLIO_DATA.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md shadow-sm hover:border-blue-500/40 transition-all duration-300 group"
            >
              <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-cyan-300 group-hover:scale-105 transition-transform">
                {stat.value}
              </div>
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="pt-8 flex justify-center"
        >
          <a
            href="#about"
            className="p-2.5 rounded-full text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors animate-bounce"
            aria-label="Scroll to About"
          >
            <ChevronDown className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
