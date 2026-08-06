"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Download, X, Check, FileText, ExternalLink, GraduationCap, Code, Sparkles, Building } from "lucide-react";
import { useState } from "react";
import { PORTFOLIO_DATA } from "@/data/portfolio";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
    
    // Trigger real PDF resume download
    const link = document.createElement("a");
    link.href = "/Ebrahim_Abdelghany_Resume.pdf";
    link.download = "Ebrahim_Abdelghany_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Dark overlay backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl z-10 my-8"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 px-6 py-5 bg-slate-50/50 dark:bg-slate-900/50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-blue-500/40 shrink-0 bg-slate-900 shadow-sm">
                  <img
                    src={PORTFOLIO_DATA.personal.avatar}
                    alt={PORTFOLIO_DATA.personal.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Curriculum Vitae — {PORTFOLIO_DATA.personal.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {PORTFOLIO_DATA.personal.fullTitle}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleDownload}
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs transition-all shadow-md shadow-blue-500/20"
                >
                  {downloaded ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                  <span>{downloaded ? "Downloaded!" : "Download PDF"}</span>
                </button>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Content Preview */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
              {/* Header Summary */}
              <div className="p-5 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40">
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                  {PORTFOLIO_DATA.personal.name}
                </h4>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mt-1">
                  {PORTFOLIO_DATA.personal.role} • {PORTFOLIO_DATA.personal.location}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                  {PORTFOLIO_DATA.personal.bio}
                </p>
              </div>

              {/* Education */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  <GraduationCap className="w-4 h-4 text-blue-500" />
                  <span>Education</span>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/30">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                        {PORTFOLIO_DATA.personal.degree}
                      </h5>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {PORTFOLIO_DATA.personal.faculty} — {PORTFOLIO_DATA.personal.university}
                      </p>
                    </div>
                    <span className="text-[11px] px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-medium">
                      Current Degree
                    </span>
                  </div>
                </div>
              </div>

              {/* Key Technical Competencies */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  <Code className="w-4 h-4 text-blue-500" />
                  <span>Core Expertise</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    "Node.js & FastAPI Backends",
                    "AI APIs & LLM Integration",
                    "Computer Vision (OpenCV)",
                    "PostgreSQL & Drizzle ORM",
                    "Docker & Redis Caching",
                    "Next.js 15 & React 19",
                    "Microservices Architecture",
                    "System Design & Scalability",
                    "Asynchronous Task Queues"
                  ].map((skill, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/50 text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center space-x-2"
                    >
                      <Sparkles className="w-3 h-3 text-blue-500 shrink-0" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Featured Projects Highlight */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  <Building className="w-4 h-4 text-blue-500" />
                  <span>Featured Software Projects</span>
                </div>
                <div className="space-y-2.5">
                  {PORTFOLIO_DATA.projects.map((proj) => (
                    <div
                      key={proj.id}
                      className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/30 flex justify-between items-center"
                    >
                      <div>
                        <h6 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                          {proj.title} <span className="font-normal text-slate-400">({proj.category})</span>
                        </h6>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                          {proj.subtitle}
                        </p>
                      </div>
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-slate-200 dark:border-slate-800 p-5 bg-slate-50/50 dark:bg-slate-900/50 flex justify-between items-center text-xs text-slate-500">
              <span>Ready for hire • Full-time / Internship / Contract</span>
              <button
                onClick={handleDownload}
                className="font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1"
              >
                <span>Get Full PDF</span>
                <Download className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
