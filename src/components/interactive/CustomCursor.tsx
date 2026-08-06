"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverText, setHoverText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useSpring(-100, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(-100, { stiffness: 500, damping: 28 });

  const dotX = useSpring(-100, { stiffness: 1000, damping: 40 });
  const dotY = useSpring(-100, { stiffness: 1000, damping: 40 });

  useEffect(() => {
    // Only run on desktop screens with fine pointers
    if (window.matchMedia("(pointer: coarse)").matches) return;

    document.body.classList.add("custom-cursor-active");
    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isClickable = !!(
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.getAttribute("role") === "button" ||
        target.dataset.cursor
      );

      setIsHovered(isClickable);

      const customText = target.dataset.cursor || target.closest("[data-cursor]")?.getAttribute("data-cursor");
      setHoverText(customText || "");
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [cursorX, cursorY, dotX, dotY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Ring */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 1.8 : 1,
          opacity: isVisible ? 0.75 : 0,
        }}
        transition={{ duration: 0.2 }}
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full border border-blue-500/60 dark:border-blue-400/60 bg-blue-500/10 dark:bg-blue-400/10 backdrop-blur-[1px] hidden lg:block"
        css-size={isHovered ? "w-12 h-12" : "w-8 h-8"}
      >
        <div className={`w-full h-full rounded-full transition-all duration-300 ${isHovered ? "w-12 h-12" : "w-8 h-8"}`}>
          {hoverText && (
            <span className="absolute inset-0 flex items-center justify-center text-[9px] font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase">
              {hoverText}
            </span>
          )}
        </div>
      </motion.div>

      {/* Inner Glowing Core Dot */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 0.5 : 1,
        }}
        className="pointer-events-none fixed top-0 left-0 z-[9999] w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-blue-400 shadow-[0_0_10px_#2563eb] hidden lg:block"
      />
    </>
  );
}
