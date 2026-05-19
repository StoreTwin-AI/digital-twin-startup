"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, label: "?? ??" },
  { id: 2, label: "?? ??" },
  { id: 3, label: "AI ??" },
];

interface StepIndicatorProps {
  current: number;
}

export function StepIndicator({ current }: StepIndicatorProps) {
  return (
    <motion.div className="flex items-center justify-center gap-2 sm:gap-4">
      {steps.map((step, i) => {
        const done = current > step.id;
        const active = current === step.id;
        return (
          <motion.div
            key={step.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-2"
          >
            <motion.div
              animate={{
                scale: active ? 1.05 : 1,
                backgroundColor: done
                  ? "rgba(37, 99, 235, 0.3)"
                  : active
                    ? "rgba(37, 99, 235, 0.2)"
                    : "rgba(255,255,255,0.05)",
              }}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full border text-xs font-medium",
                done || active
                  ? "border-blue-500/50 text-blue-400"
                  : "border-white/10 text-zinc-500",
              )}
            >
              {done ? <Check className="h-4 w-4" /> : step.id}
            </motion.div>
            <span
              className={cn(
                "hidden text-sm sm:inline",
                active ? "text-white" : "text-zinc-500",
              )}
            >
              {step.label}
            </span>
            {i < steps.length - 1 && (
              <motion.div
                className={cn(
                  "mx-1 h-px w-8 sm:w-12",
                  done ? "bg-blue-500/50" : "bg-white/10",
                )}
              />
            )}
          </motion.div>
        );
      })}
    </motion.div>
  );
}
