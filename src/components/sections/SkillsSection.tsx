"use client";

import { motion } from "framer-motion";
import { Server, BrainCircuit, Layout, Database, Cloud, Code2, Sparkles, CheckCircle2 } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export function SkillsSection() {
  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-slate-50/50 dark:bg-slate-950/40" suppressHydrationWarning>
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
            <Code2 className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Engineering Skills & Stack
          </h2>
          <p className="max-w-2xl mx-auto text-sm text-slate-500 dark:text-slate-400">
            A comprehensive matrix of technologies, frameworks, and engineering tools mastered across AI, Backend, and Full-Stack development.
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
              className="p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-6">
                {/* Category Header */}
                <div className="flex items-center space-x-3.5 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                    {category.title.includes("Backend") && <Server className="w-5 h-5" />}
                    {category.title.includes("Artificial") && <BrainCircuit className="w-5 h-5" />}
                    {category.title.includes("Frontend") && <Layout className="w-5 h-5" />}
                    {category.title.includes("Databases") && <Database className="w-5 h-5" />}
                    {category.title.includes("DevOps") && <Cloud className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
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
                    <div key={skill.name} className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className={`font-semibold flex items-center space-x-1.5 ${skill.highlight ? "text-blue-600 dark:text-blue-400" : "text-slate-700 dark:text-slate-300"}`}>
                          {skill.highlight && <Sparkles className="w-3 h-3 text-amber-500" />}
                          <span>{skill.name}</span>
                        </span>
                        <span className="font-mono text-[11px] text-slate-400">
                          {skill.level}%
                        </span>
                      </div>

                      {/* Progress Track */}
                      <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className={`h-full rounded-full ${
                            skill.highlight
                              ? "bg-gradient-to-r from-blue-600 to-sky-400 shadow-[0_0_10px_rgba(37,99,235,0.4)]"
                              : "bg-slate-400 dark:bg-slate-600"
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer Badge */}
              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
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
