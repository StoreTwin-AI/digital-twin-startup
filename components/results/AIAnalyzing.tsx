"use client";

import { motion } from "framer-motion";
import { Brain, Sparkles } from "lucide-react";

const messages = [
  "상권 유동인구 패턴 분석 중...",
  "경쟁 업체 밀도 계산 중...",
  "소비층 프로필 매칭 중...",
  "매출 시뮬레이션 실행 중...",
  "AI 인사이트 생성 중...",
];

export function AIAnalyzing({ step }: { step: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex min-h-[60vh] flex-col items-center justify-center px-4"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="relative mb-8"
      >
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex h-24 w-24 items-center justify-center rounded-3xl border border-blue-500/30 bg-blue-500/10 backdrop-blur-xl"
        >
          <Brain className="h-12 w-12 text-blue-400" />
        </motion.div>
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute -right-2 -top-2"
        >
          <Sparkles className="h-6 w-6 text-blue-300" />
        </motion.div>
      </motion.div>

      <motion.h2
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="text-xl font-semibold text-white sm:text-2xl"
      >
        AI가 상권을 분석하고 있습니다
      </motion.h2>

      <motion.p
        key={step}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 text-sm text-blue-400"
      >
        {messages[step % messages.length]}
      </motion.p>

      <motion.div className="mt-8 flex gap-1.5">
        {messages.map((_, i) => (
          <motion.div
            key={i}
            animate={{
              scale: i === step % messages.length ? 1.2 : 1,
              backgroundColor:
                i <= step % messages.length
                  ? "rgba(59, 130, 246, 0.8)"
                  : "rgba(255,255,255,0.1)",
            }}
            className="h-1.5 w-8 rounded-full"
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
