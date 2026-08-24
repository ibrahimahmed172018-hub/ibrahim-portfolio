"use client";

import { motion } from "framer-motion";
import { Server, BrainCircuit, Layout, Database, Cloud, Code2, Sparkles, CheckCircle2 } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export function SkillsSection() {
  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-transparent" suppressHydrationWarning>
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
            <Code2 className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
            Engineering Skills & Stack
          </h2>
          <p className="max-w-2xl mx-auto text-sm text-slate-500 dark:text-slate-400">
            A comprehensive matrix of technologies, neural frameworks, and engineering systems mastered across AI, Backend, and Full-Stack architecture.
          </p>
        </div>

        {/* Skill Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PORTFOLIO_DATA.skillCategories.map((category, catIdx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIdx * 0.1 }}
              className="p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-500/50 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-6">
                {/* Category Header */}
                <div className="flex items-center space-x-3.5 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-md">
                    {category.title.includes("Backend") && <Server className="w-5 h-5" />}
                    {category.title.includes("Artificial") && <BrainCircuit className="w-5 h-5" />}
                    {category.title.includes("Frontend") && <Layout className="w-5 h-5" />}
                    {category.title.includes("Databases") && <Database className="w-5 h-5" />}
                    {category.title.includes("DevOps") && <Cloud className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white">
                      {category.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* Skill Items Progress List */}
                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="space-y-1.5 group/skill">
                      <div className="flex justify-between items-center text-xs">
                        <span className={`font-bold flex items-center space-x-1.5 ${skill.highlight ? "text-blue-600 dark:text-blue-400" : "text-slate-700 dark:text-slate-300"}`}>
                          {skill.highlight && <Sparkles className="w-3 h-3 text-amber-500 animate-pulse" />}
                          <span>{skill.name}</span>
                        </span>
                        <span className="font-mono text-[11px] font-bold text-slate-400 dark:text-slate-400">
                          {skill.level}%
                        </span>
                      </div>

                      {/* Progress Track */}
                      <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800/80 overflow-hidden p-0.5 border border-slate-200/40 dark:border-slate-800">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                          className={`h-full rounded-full ${
                            skill.highlight
                              ? "bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-500 shadow-[0_0_12px_rgba(59,130,246,0.6)]"
                              : "bg-gradient-to-r from-slate-400 to-slate-600 dark:from-slate-600 dark:to-slate-400"
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer Badge */}
              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center space-x-1 font-semibold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Production Ready</span>
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400">
                  {category.skills.length} Stack Skills
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
