"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Users, Building2, TrendingUp } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import type { District } from "@/lib/types";

interface DistrictCardProps {
  district: District | null;
  onContinue?: () => void;
}

export function DistrictCard({ district, onContinue }: DistrictCardProps) {
  return (
    <AnimatePresence mode="wait">
      {district ? (
        <motion.div
          key={district.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <GlassCard className="h-full">
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-500/15 px-3 py-1 text-xs font-medium text-blue-400"
            >
              <MapPin className="h-3.5 w-3.5" />
              선택된 상권
            </motion.div>

            <h3 className="text-xl font-semibold text-white">{district.name}</h3>
            <p className="mt-1 text-sm text-zinc-400">{district.address}</p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300">
              {district.description}
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-6 grid grid-cols-2 gap-3"
            >
              <Stat
                icon={Users}
                label="일 유동인구"
                value={`${district.footTraffic.toLocaleString()}명`}
              />
              <Stat
                icon={Building2}
                label="평균 임대료"
                value={district.avgRent}
              />
              <Stat
                icon={TrendingUp}
                label="동종 경쟁"
                value={`${district.competitorCount}곳`}
              />
              <Stat icon={MapPin} label="상권 ID" value={district.id} />
            </motion.div>

            {onContinue && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6"
              >
                <Button href="/simulate" onClick={onContinue} className="w-full" size="lg">
                  이 상권으로 분석하기
                </Button>
              </motion.div>
            )}
          </GlassCard>
        </motion.div>
      ) : (
        <motion.div
          key="empty"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <GlassCard className="flex h-full min-h-[280px] flex-col items-center justify-center text-center">
            <MapPin className="mb-4 h-12 w-12 text-zinc-600" />
            <p className="text-zinc-400">지도에서 상권을 클릭해주세요</p>
            <p className="mt-2 text-xs text-zinc-500">
              실제 상권 데이터 기반 mock 상권이 매칭됩니다
            </p>
          </GlassCard>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="rounded-xl border border-white/5 bg-white/[0.03] p-3"
    >
      <Icon className="mb-2 h-4 w-4 text-blue-400" />
      <p className="text-xs text-zinc-500">{label}</p>
      <p className="mt-0.5 text-sm font-medium text-white">{value}</p>
    </motion.div>
  );
}
