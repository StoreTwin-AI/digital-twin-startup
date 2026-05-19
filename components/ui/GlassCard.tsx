"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
}

export function GlassCard({
  children,
  className,
  hover = false,
  delay = 0,
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
      className={cn(
        "rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-xl backdrop-blur-xl",
        hover && "transition-colors hover:border-blue-500/30 hover:bg-white/[0.06]",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}
