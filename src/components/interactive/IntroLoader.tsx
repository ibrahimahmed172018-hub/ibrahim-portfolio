"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export function IntroLoader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if intro has already been shown in current session
    const hasSeenIntro = sessionStorage.getItem("hasSeenIntro");
    if (hasSeenIntro) {
      setLoading(false);
      return;
    }

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setLoading(false);
            sessionStorage.setItem("hasSeenIntro", "true");
          }, 300);
          return 100;
        }
        return prev + 10;
      });
    }, 40);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white select-none"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center space-y-6"
          >
            {/* Logo Badge */}
            <div className="relative flex items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-blue-400 text-white font-extrabold text-2xl flex items-center justify-center shadow-2xl shadow-blue-500/50">
                I
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-3 rounded-3xl border border-blue-500/30 border-t-blue-400 pointer-events-none"
              />
            </div>

            {/* Title */}
            <div className="text-center space-y-1">
              <h2 className="text-2xl font-bold tracking-tight">
                {PORTFOLIO_DATA.personal.name}
              </h2>
              <p className="text-xs text-blue-400 font-medium tracking-wider uppercase">
                {PORTFOLIO_DATA.personal.role}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-48 h-1 rounded-full bg-slate-800 overflow-hidden relative mt-4">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-600 to-blue-400"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>

            {/* Percentage */}
            <span className="font-mono text-xs text-slate-500">
              {progress}%
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
