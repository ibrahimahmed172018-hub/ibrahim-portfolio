"use client";

import { useEffect, useState } from "react";
import { ArrowUp, Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export function Footer() {
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format time in Egypt / Mansoura (Africa/Cairo)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Africa/Cairo",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setTimeStr(new Intl.DateTimeFormat("en-US", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-950/60 backdrop-blur-xl py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Column: Brand & Time */}
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-2">
            <div className="w-6 h-6 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
              I
            </div>
            <span className="font-bold text-slate-900 dark:text-white text-base">
              {PORTFOLIO_DATA.personal.name}
            </span>
            <span className="text-xs text-slate-400">• {PORTFOLIO_DATA.personal.location} 🇪🇬</span>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center md:justify-start space-x-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Local Time: <span className="font-mono text-slate-700 dark:text-slate-300 font-semibold">{timeStr || "12:00 PM"}</span> (EET)</span>
          </p>
        </div>

        {/* Middle Column: Links & Copyright */}
        <div className="text-center space-y-2">
          <div className="flex justify-center space-x-6 text-xs text-slate-500 dark:text-slate-400">
            <a href="#about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</a>
            <a href="#projects" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Projects</a>
            <a href="#skills" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Skills</a>
            <a href="#contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</a>
          </div>

          <p className="text-[11px] text-slate-400 dark:text-slate-500">
            © {new Date().getFullYear()} {PORTFOLIO_DATA.personal.name}. Handcrafted with precision. All rights reserved.
          </p>
        </div>

        {/* Right Column: Social Links & Back to Top */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <a
              href={PORTFOLIO_DATA.personal.whatsapp}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 hover:text-emerald-500 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-500" />
            </a>
            <a
              href={PORTFOLIO_DATA.personal.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PORTFOLIO_DATA.personal.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Linkedin className="w-4 h-4 text-blue-600" />
            </a>
            <a
              href={`mailto:${PORTFOLIO_DATA.personal.email}`}
              aria-label="Email"
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all hover:scale-105"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
