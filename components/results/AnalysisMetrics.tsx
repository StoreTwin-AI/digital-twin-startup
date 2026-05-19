"use client";

import { motion } from "framer-motion";
import { Target, TrendingUp, Swords, Users, Lightbulb } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { formatCurrency, competitionLabel } from "@/lib/utils";
import type { AnalysisResult } from "@/lib/types";

interface AnalysisMetricsProps {
  analysis: AnalysisResult;
}

export function AnalysisMetrics({ analysis }: AnalysisMetricsProps) {
  const metrics = [
    {
      icon: Target,
      label: "예상 성공 확률",
      value: `${analysis.successProbability}%`,
      sub: analysis.successProbability >= 70 ? "긍정적" : "주의 필요",
      color: "text-emerald-400",
    },
    {
      icon: TrendingUp,
      label: "예상 월 매출",
      value: formatCurrency(analysis.monthlyRevenue),
      sub: "6개월 평균 기준",
      color: "text-blue-400",
    },
    {
      icon: Swords,
      label: "경쟁 강도",
      value: competitionLabel(analysis.competitionLevel),
      sub: `점수 ${analysis.competitionScore}/100`,
      color:
        analysis.competitionLevel === "high"
          ? "text-amber-400"
          : "text-emerald-400",
    },
    {
      icon: Users,
      label: "주요 소비층",
      value: analysis.targetAudience[1]?.age ?? "25~29세",
      sub: `비중 ${analysis.targetAudience[1]?.percentage ?? 0}%`,
      color: "text-violet-400",
    },
  ];

  return (
    <motion.div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((m, i) => (
        <GlassCard key={m.label} delay={i * 0.08} hover>
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 + i * 0.1 }}
          >
            <m.icon className={`mb-3 h-5 w-5 ${m.color}`} />
            <p className="text-xs text-zinc-500">{m.label}</p>
            <p className="mt-1 text-2xl font-bold text-white">{m.value}</p>
            <p className="mt-1 text-xs text-zinc-400">{m.sub}</p>
          </motion.div>
        </GlassCard>
      ))}
    </motion.div>
  );
}

interface InsightsProps {
  insights: string[];
  strategies: string[];
}

export function AnalysisInsights({ insights, strategies }: InsightsProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="grid gap-6 lg:grid-cols-2"
    >
      <GlassCard>
        <motion.div className="mb-4 flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-amber-400" />
          <h3 className="font-semibold text-white">AI 인사이트</h3>
        </motion.div>
        <ul className="space-y-3">
          {insights.map((text, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.08 }}
              className="flex gap-3 text-sm leading-relaxed text-zinc-300"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
              {text}
            </motion.li>
          ))}
        </ul>
      </GlassCard>

      <GlassCard delay={0.1}>
        <motion.div
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400"
        >
          추천 전략
        </motion.div>
        <ul className="space-y-3">
          {strategies.map((text, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45 + i * 0.08 }}
              className="rounded-xl border border-white/5 bg-white/[0.02] p-3 text-sm text-zinc-300"
            >
              <span className="mr-2 font-mono text-xs text-blue-500">
                {String(i + 1).padStart(2, "0")}
              </span>
              {text}
            </motion.li>
          ))}
        </ul>
      </GlassCard>
    </motion.div>
  );
}
