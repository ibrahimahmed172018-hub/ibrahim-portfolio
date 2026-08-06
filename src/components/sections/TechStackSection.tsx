"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Cpu, Terminal, Sparkles, Filter } from "lucide-react";

interface TechItem {
  name: string;
  category: "Backend" | "AI & ML" | "Frontend" | "Database & Cloud";
  level: "Expert" | "Advanced" | "Proficient";
  description: string;
}

const techItems: TechItem[] = [
  { name: "Node.js / Express", category: "Backend", level: "Expert", description: "Event-driven asynchronous I/O and microservices" },
  { name: "FastAPI", category: "Backend", level: "Expert", description: "High-performance Python ASGI backend framework" },
  { name: "Python", category: "AI & ML", level: "Expert", description: "Data structures, PyTorch, OpenCV, and AI modeling" },
  { name: "TypeScript", category: "Frontend", level: "Expert", description: "Strict type safety across full-stack applications" },
  { name: "React 19 / Next.js 15", category: "Frontend", level: "Expert", description: "Server components, App router & fast UI state" },
  { name: "PostgreSQL", category: "Database & Cloud", level: "Expert", description: "Relational indexing, JSONB & query optimization" },
  { name: "Drizzle ORM", category: "Database & Cloud", level: "Expert", description: "Type-safe SQL schema definitions & migrations" },
  { name: "Docker", category: "Database & Cloud", level: "Advanced", description: "Containerized reproducible multi-service environments" },
  { name: "Redis", category: "Database & Cloud", level: "Advanced", description: "In-memory caching, distributed locks & pub-sub queues" },
  { name: "OpenCV", category: "AI & ML", level: "Advanced", description: "Computer vision video processing & face detection" },
  { name: "PyTorch", category: "AI & ML", level: "Advanced", description: "Neural network training & deep learning evaluation" },
  { name: "Tailwind CSS", category: "Frontend", level: "Expert", description: "Utility-first luxury responsive design system" },
  { name: "REST & WebSockets", category: "Backend", level: "Expert", description: "Real-time bi-directional messaging & API endpoints" },
  { name: "Git & GitHub", category: "Backend", level: "Expert", description: "Branching strategies, code reviews & CI/CD" }
];

export function TechStackSection() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Backend", "AI & ML", "Frontend", "Database & Cloud"];

  const filteredTech = activeCategory === "All"
    ? techItems
    : techItems.filter((item) => item.category === activeCategory);

  return (
    <section id="tech-stack" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-slate-50/50 dark:bg-slate-950/40">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
            <Cpu className="w-3.5 h-3.5" />
            <span>Ecosystem & Tools</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Technology Ecosystem
          </h2>
          <p className="max-w-2xl mx-auto text-sm text-slate-500 dark:text-slate-400">
            A curated stack of enterprise-proven technologies used to design, build, and deploy high-performance applications.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:border-blue-500/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid of Badges */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {filteredTech.map((tech) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={tech.name}
              className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/5 transition-all flex flex-col justify-between space-y-3"
            >
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  {tech.name}
                </h4>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200/40 dark:border-blue-800/40">
                  {tech.level}
                </span>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                {tech.description}
              </p>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px] font-mono text-slate-400">
                {tech.category}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
