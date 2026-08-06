"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, FileText, ChevronRight, Github, Linkedin, Mail } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: { name: string; href: string }[];
  onOpenResume: () => void;
}

export function MobileMenu({ isOpen, onClose, navLinks, onOpenResume }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed inset-y-0 right-0 w-full max-w-xs bg-white dark:bg-slate-950 border-l border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between shadow-2xl z-10"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-900">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                    I
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {PORTFOLIO_DATA.personal.name}
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Links */}
              <nav className="py-6 space-y-1">
                {navLinks.map((link, idx) => (
                  <motion.a
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    href={link.href}
                    onClick={onClose}
                    className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-900 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </motion.a>
                ))}
              </nav>
            </div>

            {/* Bottom Actions */}
            <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-slate-900">
              <button
                onClick={() => {
                  onClose();
                  onOpenResume();
                }}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-blue-600 text-white font-semibold text-xs shadow-lg shadow-blue-500/20"
              >
                <FileText className="w-4 h-4" />
                <span>View Resume</span>
              </button>

              <div className="flex items-center justify-around pt-2 text-slate-400">
                <a href={PORTFOLIO_DATA.personal.github} target="_blank" rel="noreferrer" className="p-2 hover:text-blue-600">
                  <Github className="w-5 h-5" />
                </a>
                <a href={PORTFOLIO_DATA.personal.linkedin} target="_blank" rel="noreferrer" className="p-2 hover:text-blue-600">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href={`mailto:${PORTFOLIO_DATA.personal.email}`} className="p-2 hover:text-blue-600">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
