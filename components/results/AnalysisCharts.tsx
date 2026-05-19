"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import type { AnalysisResult } from "@/lib/types";

const COLORS = ["#3b82f6", "#60a5fa", "#93c5fd", "#2563eb", "#1d4ed8"];

const tooltipStyle = {
  contentStyle: {
    background: "rgba(3, 7, 18, 0.95)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "12px",
    fontSize: "12px",
  },
  labelStyle: { color: "#94a3b8" },
};

interface AnalysisChartsProps {
  analysis: AnalysisResult;
}

export function AnalysisCharts({ analysis }: AnalysisChartsProps) {
  return (
    <motion.div className="grid gap-6 lg:grid-cols-2">
      <GlassCard delay={0.1}>
        <h3 className="mb-4 text-sm font-medium text-zinc-400">
          시간대별 유동인구
        </h3>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="h-[240px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={analysis.footTrafficByHour}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis
                dataKey="hour"
                tick={{ fill: "#71717a", fontSize: 11 }}
                tickFormatter={(v) => `${v}시`}
              />
              <YAxis tick={{ fill: "#71717a", fontSize: 11 }} />
              <Tooltip {...tooltipStyle} />
              <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </GlassCard>

      <GlassCard delay={0.15}>
        <h3 className="mb-4 text-sm font-medium text-zinc-400">
          6개월 예상 매출 추이
        </h3>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="h-[240px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={analysis.revenueProjection}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="month" tick={{ fill: "#71717a", fontSize: 11 }} />
              <YAxis
                tick={{ fill: "#71717a", fontSize: 11 }}
                tickFormatter={(v) => `${Math.round(Number(v) / 10000)}만`}
              />
              <Tooltip
                {...tooltipStyle}
                formatter={(value) => [
                  `${Number(value).toLocaleString()}원`,
                  "예상 매출",
                ]}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#3b82f6"
                fill="url(#revenueGrad)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </GlassCard>

      <GlassCard delay={0.2} className="lg:col-span-2">
        <h3 className="mb-4 text-sm font-medium text-zinc-400">
          소비층 비율
        </h3>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mx-auto h-[260px] max-w-md"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={analysis.audienceDistribution}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={3}
              >
                {analysis.audienceDistribution.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                {...tooltipStyle}
                formatter={(v) => [`${v}%`, "비율"]}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
        <motion.div className="mt-4 flex flex-wrap justify-center gap-4">
          {analysis.audienceDistribution.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.05 }}
              className="flex items-center gap-2 text-sm"
            >
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: COLORS[i % COLORS.length] }}
              />
              <span className="text-zinc-400">{item.name}</span>
              <span className="font-medium text-white">{item.value}%</span>
            </motion.div>
          ))}
        </motion.div>
      </GlassCard>
    </motion.div>
  );
}
