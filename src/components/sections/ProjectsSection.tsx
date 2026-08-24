"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Sparkles, Layers, ArrowUpRight, CheckCircle2, ShieldAlert, Cpu, X, Zap, Lock } from "lucide-react";
import { PORTFOLIO_DATA, Project } from "@/data/portfolio";

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
            <Layers className="w-3.5 h-3.5" />
            <span>Featured Engineering Work</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">
            Architected Projects
          </h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-500 dark:text-slate-400">
            Real-world enterprise systems, AI vision tools, and SaaS platforms built with high reliability and performance in mind.
          </p>
        </div>

        {/* Project Cards Stack */}
        <div className="space-y-12">
          {PORTFOLIO_DATA.projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="group relative rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-500/40 transition-all duration-500 overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                {/* Visual Media Graphic Banner (5 Cols) */}
                <div className="lg:col-span-5 relative min-h-[280px] lg:min-h-[420px] bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 p-6 flex flex-col justify-between overflow-hidden">
                  {/* Subtle Grid Pattern Overlay */}
                  <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />

                  {/* Badge Header */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold backdrop-blur-md">
                      {project.category}
                    </span>
                    <span className="text-slate-400 text-xs font-mono">
                      0{idx + 1} / 0{PORTFOLIO_DATA.projects.length}
                    </span>
                  </div>

                  {/* Abstract Tech Graphic Mockup */}
                  <div className="relative z-10 my-auto text-center py-6 space-y-4">
                    <div className="w-20 h-20 mx-auto rounded-3xl bg-blue-600/30 border border-blue-400/40 backdrop-blur-xl flex items-center justify-center shadow-2xl shadow-blue-500/50 group-hover:scale-110 transition-transform duration-500">
                      {project.id === "mbc-dent" && <Cpu className="w-10 h-10 text-blue-400" />}
                      {project.id === "educational-lms" && <Layers className="w-10 h-10 text-blue-400" />}
                      {project.id === "retina" && <Zap className="w-10 h-10 text-blue-400" />}
                      {project.id === "ismail-portfolio" && <Sparkles className="w-10 h-10 text-rose-400" />}
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-xl font-bold text-white tracking-wide">
                        {project.title}
                      </h4>
                      <p className="text-xs text-blue-200/80">
                        {project.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Key Metrics Chips */}
                  <div className="relative z-10 flex flex-wrap gap-2 pt-4 border-t border-slate-700/50">
                    {project.metrics.map((metric, mIdx) => (
                      <span
                        key={mIdx}
                        className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-[11px] font-mono text-emerald-400"
                      >
                        {metric}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Details Content (7 Cols) */}
                <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                          {project.title}
                        </h3>
                        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mt-1">
                          {project.subtitle}
                        </p>
                      </div>
                    </div>

                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center space-x-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 group/btn"
                    >
                      <span>Explore Case Study & Challenges</span>
                      <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </button>

                    <div className="flex items-center space-x-3">
                      {project.githubUrl === "private" ? (
                        <span
                          className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl border border-amber-500/30 bg-amber-500/10 text-xs font-semibold text-amber-600 dark:text-amber-400"
                          title="Client project under NDA (Private Repository)"
                        >
                          <Lock className="w-3.5 h-3.5" />
                          <span>Private (NDA)</span>
                        </span>
                      ) : (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-800/80 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:border-blue-500 transition-colors"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>Code</span>
                        </a>
                      )}

                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors shadow-md shadow-blue-500/20"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Demo</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Case Study Deep Dive Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl z-10 my-8 max-h-[85vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 px-6 py-5 bg-slate-50/50 dark:bg-slate-900/50">
                <div>
                  <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                    {selectedProject.title} — Architectural Breakdown
                  </h3>
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  {selectedProject.fullDescription}
                </p>

                {/* Technical Challenges */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                    <ShieldAlert className="w-4 h-4" />
                    <span>Key Engineering Challenges</span>
                  </div>
                  <ul className="space-y-2">
                    {selectedProject.challenges.map((ch, idx) => (
                      <li
                        key={idx}
                        className="p-3 rounded-xl border border-amber-200/50 dark:border-amber-900/30 bg-amber-50/40 dark:bg-amber-950/20 text-xs text-slate-700 dark:text-slate-300 flex items-start space-x-2.5"
                      >
                        <span className="font-mono text-amber-500 font-bold">•</span>
                        <span>{ch}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Solutions & Innovations */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Architectural Solutions</span>
                  </div>
                  <ul className="space-y-2">
                    {selectedProject.solutions.map((sol, idx) => (
                      <li
                        key={idx}
                        className="p-3 rounded-xl border border-emerald-200/50 dark:border-emerald-900/30 bg-emerald-50/40 dark:bg-emerald-950/20 text-xs text-slate-700 dark:text-slate-300 flex items-start space-x-2.5"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{sol}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="border-t border-slate-200 dark:border-slate-800 p-5 bg-slate-50/50 dark:bg-slate-900/50 flex justify-between items-center">
                {selectedProject.githubUrl === "private" ? (
                  <span
                    className="text-xs font-semibold text-amber-600 dark:text-amber-400 flex items-center space-x-1"
                    title="Client project under NDA (Private Repository)"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Private Repository (Client NDA)</span>
                  </span>
                ) : (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-blue-600 flex items-center space-x-1"
                  >
                    <Github className="w-4 h-4" />
                    <span>View Repository</span>
                  </a>
                )}

                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors"
                >
                  Visit Live Demo
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
