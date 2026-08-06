"use client";

import { motion } from "framer-motion";
import { GraduationCap, MapPin, Globe, BookOpen, Cpu, Sparkles, Award } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative" suppressHydrationWarning>
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Heading */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Engineering Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            About {PORTFOLIO_DATA.personal.name}
          </h2>
          <p className="max-w-2xl mx-auto text-sm text-slate-500 dark:text-slate-400">
            Passionate AI Software Engineer bridging theory and enterprise execution.
          </p>
        </div>

        {/* 2-Column Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Biography Card (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 p-8 sm:p-10 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-xl shadow-blue-500/5 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-blue-500/40 shadow-md shrink-0 bg-slate-900">
                  <img
                    src={PORTFOLIO_DATA.personal.avatar}
                    alt={PORTFOLIO_DATA.personal.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {PORTFOLIO_DATA.personal.fullTitle}
                  </h3>
                  <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5" />
                    {PORTFOLIO_DATA.personal.location}
                  </span>
                </div>
              </div>

              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                {PORTFOLIO_DATA.personal.bio}
              </p>

              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                {PORTFOLIO_DATA.personal.extendedBio}
              </p>
            </div>

            {/* Language Fluency Badges */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap gap-4">
              {PORTFOLIO_DATA.personal.languages.map((lang, idx) => (
                <div
                  key={idx}
                  className="flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-xs font-medium text-slate-700 dark:text-slate-300"
                >
                  <Globe className="w-3.5 h-3.5 text-blue-500" />
                  <span className="font-bold">{lang.name}:</span>
                  <span>{lang.level}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Academic & Specialization Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            {/* Education Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-xl shadow-blue-500/5 space-y-4"
            >
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-500">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                    Academic Degree
                  </span>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                    {PORTFOLIO_DATA.personal.degree}
                  </h4>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-500">University:</span>
                  <span className="font-medium text-slate-900 dark:text-slate-100">{PORTFOLIO_DATA.personal.university}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-500">Faculty:</span>
                  <span className="font-medium text-slate-900 dark:text-slate-100">{PORTFOLIO_DATA.personal.faculty}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-500">Specialization:</span>
                  <span className="font-medium text-blue-600 dark:text-blue-400">{PORTFOLIO_DATA.personal.department}</span>
                </div>
              </div>
            </motion.div>

            {/* Core Focus Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-gradient-to-br from-blue-50/80 via-white to-sky-50/50 dark:from-slate-900/90 dark:via-slate-900 dark:to-blue-950/40 backdrop-blur-xl shadow-xl shadow-blue-500/5 space-y-4"
            >
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-500/30">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  Current Engineering Focus
                </h4>
              </div>

              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  <span>High-throughput Async Backends (FastAPI & Node.js)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  <span>AI Agent Architectures & Vector Search Integration</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  <span>Real-time Computer Vision (OpenCV & PyTorch)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  <span>Relational Database Optimization & Microservices</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
