"use client";

import { motion } from "framer-motion";
import { ArrowRight, Code2, Download, FileText, Sparkles, Terminal, ChevronDown } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";

interface HeroSectionProps {
  onOpenResume: () => void;
}

export function HeroSection({ onOpenResume }: HeroSectionProps) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Subtle Background Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-blue-500/10 dark:bg-blue-600/15 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto text-center space-y-8 z-10">
        {/* Profile Avatar Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative inline-block mx-auto group"
        >
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-600 via-sky-400 to-blue-500 opacity-70 blur-md group-hover:opacity-100 transition duration-500 animate-pulse" />
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 border-blue-400/80 shadow-2xl bg-slate-900">
            <img
              src={PORTFOLIO_DATA.personal.avatar}
              alt={PORTFOLIO_DATA.personal.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </motion.div>

        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-blue-200 dark:border-blue-900/60 bg-blue-50/60 dark:bg-blue-950/40 backdrop-blur-md shadow-sm"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600 dark:bg-blue-400" />
          </span>
          <span className="text-xs font-semibold text-blue-700 dark:text-blue-300 tracking-wide">
            {PORTFOLIO_DATA.personal.status}
          </span>
        </motion.div>

        {/* Hero Title & Main Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-4"
        >
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            <span className="block">{PORTFOLIO_DATA.personal.role}</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-sky-400 dark:from-blue-400 dark:via-sky-400 dark:to-blue-300 font-black">
              Engineering Intelligent Backends
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
            Building high-concurrency backend systems, AI-powered SaaS platforms, and high-performance digital experiences from Egypt.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-2"
        >
          {/* View Projects CTA */}
          <a
            href="#projects"
            className="group relative inline-flex items-center space-x-2 px-7 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5"
          >
            <span>View Projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          {/* Download Resume CTA */}
          <button
            onClick={onOpenResume}
            className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-2xl border border-slate-300 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-bold text-sm transition-all duration-200 shadow-sm backdrop-blur-md hover:-translate-y-0.5"
          >
            <Download className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Download Resume</span>
          </button>

          {/* Contact Me CTA */}
          <a
            href="#contact"
            className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-2xl border border-transparent hover:border-slate-200 dark:hover:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-sm transition-all duration-200"
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
              className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md shadow-sm"
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400">
                {stat.value}
              </div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
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
            className="p-2 rounded-full text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors animate-bounce"
            aria-label="Scroll to About"
          >
            <ChevronDown className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
