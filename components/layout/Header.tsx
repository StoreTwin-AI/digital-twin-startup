"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "?" },
  { href: "/map", label: "?? ??" },
  { href: "/simulate", label: "?? ??" },
  { href: "/results", label: "AI ??" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#030712]/80 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6"
      >
        <Link href="/" className="flex items-center gap-2">
          <motion.div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-700">
            <Sparkles className="h-4 w-4 text-white" />
          </motion.div>
          <span className="text-lg font-semibold tracking-tight text-white">
            TrialSpace
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm transition-colors",
                pathname === item.href
                  ? "bg-blue-500/15 text-blue-400"
                  : "text-zinc-400 hover:text-white",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </motion.div>
    </header>
  );
}
