"use client";

import { motion } from "framer-motion";
import { Code2, Zap, Server, Sparkles, Layers, CheckCircle2, ShieldCheck } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export function ValuePropsSection() {
  return (
    <section id="why-me" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-slate-50/50 dark:bg-slate-950/40">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Core Strengths</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Why Work With Me?
          </h2>
          <p className="max-w-2xl mx-auto text-sm text-slate-500 dark:text-slate-400">
            Key engineering capabilities and execution principles that ensure project success and technical excellence.
          </p>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PORTFOLIO_DATA.whyWorkWithMe.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center space-x-3.5">
                  <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                    {item.icon === "Code2" && <Code2 className="w-6 h-6" />}
                    {item.icon === "Zap" && <Zap className="w-6 h-6" />}
                    {item.icon === "Server" && <Server className="w-6 h-6" />}
                    {item.icon === "Sparkles" && <Sparkles className="w-6 h-6" />}
                    {item.icon === "Layers" && <Layers className="w-6 h-6" />}
                    {item.icon === "CheckCircle2" && <CheckCircle2 className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Bullet details */}
              <ul className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                {item.details.map((detail, dIdx) => (
                  <li key={dIdx} className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
