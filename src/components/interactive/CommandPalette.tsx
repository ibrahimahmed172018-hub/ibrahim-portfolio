"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import {
  Briefcase,
  Code2,
  FileText,
  FolderGit2,
  GraduationCap,
  Home,
  Mail,
  Moon,
  Search,
  Sparkles,
  Sun,
  User,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PORTFOLIO_DATA } from "@/data/portfolio";

interface CommandPaletteProps {
  onOpenResume: () => void;
}

export function CommandPalette({ onOpenResume }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, []);

  const navigateTo = (id: string) => {
    setOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleTheme = () => {
    setOpen(false);
    const isDark = document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", !isDark);
    localStorage.setItem("theme", !isDark ? "dark" : "light");
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-md"
            />

            {/* Command Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 shadow-2xl shadow-blue-500/10 backdrop-blur-xl"
            >
              <Command className="w-full">
                <div className="flex items-center border-b border-slate-200 dark:border-slate-800 px-4">
                  <Search className="mr-3 h-5 w-5 shrink-0 text-slate-400" />
                  <Command.Input
                    placeholder="Type a command or search section, project, stack..."
                    className="flex h-14 w-full bg-transparent text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none"
                  />
                  <button
                    onClick={() => setOpen(false)}
                    className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <Command.List className="max-h-96 overflow-y-auto p-2 scrollbar-none">
                  <Command.Empty className="py-8 text-center text-sm text-slate-500">
                    No results found for your query.
                  </Command.Empty>

                  <Command.Group heading="Navigation" className="px-2 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    <Command.Item
                      onSelect={() => navigateTo("hero")}
                      className="flex cursor-pointer items-center rounded-xl px-3 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800/80 transition-colors"
                    >
                      <Home className="mr-3 h-4 w-4 text-blue-600 dark:text-blue-400" />
                      Hero & Overview
                    </Command.Item>
                    <Command.Item
                      onSelect={() => navigateTo("about")}
                      className="flex cursor-pointer items-center rounded-xl px-3 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800/80 transition-colors"
                    >
                      <User className="mr-3 h-4 w-4 text-blue-600 dark:text-blue-400" />
                      About & Bio
                    </Command.Item>
                    <Command.Item
                      onSelect={() => navigateTo("skills")}
                      className="flex cursor-pointer items-center rounded-xl px-3 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800/80 transition-colors"
                    >
                      <Code2 className="mr-3 h-4 w-4 text-blue-600 dark:text-blue-400" />
                      Engineering Skills Matrix
                    </Command.Item>
                    <Command.Item
                      onSelect={() => navigateTo("projects")}
                      className="flex cursor-pointer items-center rounded-xl px-3 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800/80 transition-colors"
                    >
                      <FolderGit2 className="mr-3 h-4 w-4 text-blue-600 dark:text-blue-400" />
                      Featured Projects Showcase
                    </Command.Item>
                    <Command.Item
                      onSelect={() => navigateTo("learning")}
                      className="flex cursor-pointer items-center rounded-xl px-3 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800/80 transition-colors"
                    >
                      <GraduationCap className="mr-3 h-4 w-4 text-blue-600 dark:text-blue-400" />
                      Current Learning Timeline
                    </Command.Item>
                    <Command.Item
                      onSelect={() => navigateTo("why-me")}
                      className="flex cursor-pointer items-center rounded-xl px-3 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800/80 transition-colors"
                    >
                      <Sparkles className="mr-3 h-4 w-4 text-blue-600 dark:text-blue-400" />
                      Why Work With Me
                    </Command.Item>
                    <Command.Item
                      onSelect={() => navigateTo("contact")}
                      className="flex cursor-pointer items-center rounded-xl px-3 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800/80 transition-colors"
                    >
                      <Mail className="mr-3 h-4 w-4 text-blue-600 dark:text-blue-400" />
                      Contact & Inquiries
                    </Command.Item>
                  </Command.Group>

                  <Command.Separator className="my-1.5 h-px bg-slate-200 dark:bg-slate-800" />

                  <Command.Group heading="Featured Projects" className="px-2 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    {PORTFOLIO_DATA.projects.map((project) => (
                      <Command.Item
                        key={project.id}
                        onSelect={() => navigateTo("projects")}
                        className="flex cursor-pointer items-center rounded-xl px-3 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800/80 transition-colors"
                      >
                        <Briefcase className="mr-3 h-4 w-4 text-emerald-500" />
                        <div>
                          <p className="font-medium">{project.title}</p>
                          <p className="text-xs text-slate-400">{project.subtitle}</p>
                        </div>
                      </Command.Item>
                    ))}
                  </Command.Group>

                  <Command.Separator className="my-1.5 h-px bg-slate-200 dark:bg-slate-800" />

                  <Command.Group heading="Quick Actions" className="px-2 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    <Command.Item
                      onSelect={() => {
                        setOpen(false);
                        onOpenResume();
                      }}
                      className="flex cursor-pointer items-center rounded-xl px-3 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800/80 transition-colors"
                    >
                      <FileText className="mr-3 h-4 w-4 text-amber-500" />
                      View & Download Interactive Resume
                    </Command.Item>

                  </Command.Group>
                </Command.List>

                <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800 px-4 py-2.5 text-xs text-slate-400 bg-slate-50/50 dark:bg-slate-900/50">
                  <span>Press <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">ESC</kbd> to exit</span>
                  <span>Use arrow keys to navigate</span>
                </div>
              </Command>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
