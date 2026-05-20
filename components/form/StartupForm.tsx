"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Store } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { BUSINESS_TYPES, OPERATING_HOURS } from "@/lib/constants";
import type { StartupInput } from "@/lib/types";

interface StartupFormProps {
  districtName?: string;
  onSubmit: (input: StartupInput) => void | Promise<void>;
  submitting?: boolean;
}

export function StartupForm({
  districtName,
  onSubmit,
  submitting = false,
}: StartupFormProps) {
  const [businessType, setBusinessType] = useState<string>(BUSINESS_TYPES[0]);
  const [operatingHours, setOperatingHours] = useState<string>(OPERATING_HOURS[1]);
  const [menuName, setMenuName] = useState("");
  const [avgPrice, setAvgPrice] = useState(8500);
  const [concept, setConcept] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!menuName.trim()) return;
    onSubmit({
      businessType,
      menuName: menuName.trim(),
      avgPrice,
      concept: concept.trim(),
      operatingHours,
    });
  };

  return (
    <GlassCard>
      <div className="mb-6 flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20">
          <Store className="h-5 w-5 text-blue-400" />
        </div>
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-xl font-semibold text-white">창업 정보 입력</h2>
          <p className="mt-1 text-sm text-zinc-400">
            {districtName
              ? `${districtName} 기준 시뮬레이션`
              : "상권을 먼저 선택해주세요"}
          </p>
        </motion.div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Field label="업종 선택">
          <select
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
            className="input-field"
          >
            {BUSINESS_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>

        <Field label="메뉴명">
          <input
            type="text"
            value={menuName}
            onChange={(e) => setMenuName(e.target.value)}
            placeholder="예: 시그니처 흑임자 라떼"
            className="input-field"
            required
          />
        </Field>

        <Field label={`평균 가격대: ${avgPrice.toLocaleString()}원`}>
          <input
            type="range"
            min={3000}
            max={35000}
            step={500}
            value={avgPrice}
            onChange={(e) => setAvgPrice(Number(e.target.value))}
            className="w-full accent-blue-500"
          />
          <motion.div
            key={avgPrice}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="mt-2 flex justify-between text-xs text-zinc-500"
          >
            <span>3,000원</span>
            <span className="font-medium text-blue-400">
              {avgPrice.toLocaleString()}원
            </span>
            <span>35,000원</span>
          </motion.div>
        </Field>

        <Field label="매장 컨셉">
          <textarea
            value={concept}
            onChange={(e) => setConcept(e.target.value)}
            placeholder="예: 미니멀 인더스트리얼, 2030 타깃 디저트 카페"
            rows={3}
            className="input-field resize-none"
          />
        </Field>

        <Field label="예상 운영 시간">
          <select
            value={operatingHours}
            onChange={(e) => setOperatingHours(e.target.value)}
            className="input-field"
          >
            {OPERATING_HOURS.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
        </Field>

        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={!menuName.trim() || submitting}
        >
          {submitting ? "AI 분석 요청 중..." : "AI 분석 시작"}
          <ChevronRight className="h-4 w-4" />
        </Button>
      </form>
    </GlassCard>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <label className="mb-2 block text-sm font-medium text-zinc-300">
        {label}
      </label>
      {children}
    </motion.div>
  );
}
