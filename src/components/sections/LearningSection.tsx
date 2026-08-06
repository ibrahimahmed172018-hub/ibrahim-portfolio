"use client";

import { motion } from "framer-motion";
import { GraduationCap, Sparkles, CheckCircle2, Clock, ArrowRight } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export function LearningSection() {
  return (
    <section id="learning" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Continuous Improvement</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Current Learning & Mastery Roadmap
          </h2>
          <p className="max-w-2xl mx-auto text-sm text-slate-500 dark:text-slate-400">
            Active technical pursuits, ongoing domain specializations, and engineering research topics.
          </p>
        </div>

        {/* Timeline Items */}
        <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 sm:ml-8 space-y-10">
          {PORTFOLIO_DATA.learningJourney.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative pl-6 sm:pl-10"
            >
              {/* Timeline Dot Icon */}
              <div className="absolute -left-[17px] top-1 w-8 h-8 rounded-full border-4 border-white dark:border-slate-950 bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/30">
                <Clock className="w-3.5 h-3.5" />
              </div>

              {/* Card Container */}
              <div className="p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-lg space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                      {item.category}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {item.title}
                    </h3>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-semibold border border-blue-200/50 dark:border-blue-800/50">
                    {item.status} ({item.progress}%)
                  </span>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.description}
                </p>

                {/* Progress bar */}
                <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-blue-600 to-sky-400 rounded-full"
                  />
                </div>

                {/* Focus Highlights */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {item.highlights.map((hl, hIdx) => (
                    <div
                      key={hIdx}
                      className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 text-[11px] font-medium text-slate-700 dark:text-slate-300 flex items-center space-x-1.5"
                    >
                      <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />
                      <span className="truncate">{hl}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
