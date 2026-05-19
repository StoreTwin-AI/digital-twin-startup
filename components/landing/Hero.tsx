"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Map, BarChart3, Brain } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-24 pt-16 sm:px-6 sm:pt-24 lg:pb-32">
      <motion.div className="pointer-events-none absolute inset-0">
        <motion.div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[120px]" />
        <motion.div
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="absolute right-0 top-1/4 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl"
        />
      </motion.div>

      <motion.div className="relative mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-300"
        >
          <Sparkles className="h-4 w-4" />
          AI 디지털 트윈 창업 분석 플랫폼
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          창업 전,{" "}
          <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            AI로 먼저 실험
          </span>
          하세요
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400 sm:text-xl"
        >
          TrialSpace는 실제 상권 데이터를 기반으로 예상 매출, 경쟁 강도,
          소비자 반응을 시뮬레이션합니다. 지도에서 상권을 고르고, 몇 분 안에
          창업 결과를 미리 확인하세요.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button href="/map" size="lg">
            시작하기
            <ArrowRight className="h-5 w-5" />
          </Button>
          <Button href="/results" variant="secondary" size="lg">
            샘플 결과 보기
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 grid gap-4 sm:grid-cols-3"
        >
          {[
            { icon: Map, title: "상권 선택", desc: "카카오맵 기반 클릭 선택" },
            { icon: Brain, title: "정보 입력", desc: "업종·메뉴·가격 시뮬레이션" },
            { icon: BarChart3, title: "AI 분석", desc: "매출·경쟁·소비층 인사이트" },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 + i * 0.1 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm"
            >
              <item.icon className="mx-auto mb-3 h-8 w-8 text-blue-400" />
              <p className="font-medium text-white">{item.title}</p>
              <p className="mt-1 text-sm text-zinc-500">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
