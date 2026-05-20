"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { StartupForm } from "@/components/form/StartupForm";
import { StepIndicator } from "@/components/layout/StepIndicator";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { MapPin } from "lucide-react";
import { createAnalysisSession } from "@/lib/api-client";
import { generateAnalysis } from "@/lib/analysis";
import { readSession, saveInput, saveSession } from "@/lib/session";
import type { District, StartupInput } from "@/lib/types";

export default function SimulatePage() {
  const router = useRouter();
  const [district] = useState<District | null>(() => readSession().district ?? null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (input: StartupInput) => {
    if (submitting) return;
    setSubmitting(true);

    try {
      saveInput(input);
      const stored = readSession();
      if (!stored.district) {
        console.warn(
          "[TrialSpace] No district in session — redirecting to map.",
        );
        router.push("/map");
        return;
      }

      const session = await createAnalysisSession(stored.district, input);
      saveSession(session);
      router.push("/results?analyzing=1");
    } catch (error) {
      console.error("[TrialSpace] Submit failed:", error);
      if (district) {
        saveSession({
          district,
          input,
          analysis: generateAnalysis(district, input),
          analyzedAt: new Date().toISOString(),
        });
      }
      router.push("/results?analyzing=1");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <h1 className="text-2xl font-bold text-white sm:text-3xl">
          창업 정보 입력
        </h1>
        <p className="mt-2 text-sm text-zinc-400">
          업종·메뉴·가격대를 입력하면 AI가 시뮬레이션합니다
        </p>
        <div className="mt-6">
          <StepIndicator current={2} />
        </div>
      </motion.div>

      {!district ? (
        <GlassCard className="text-center">
          <MapPin className="mx-auto mb-4 h-10 w-10 text-zinc-500" />
          <p className="text-zinc-400">먼저 상권을 선택해주세요</p>
          <Button href="/map" className="mt-6">
            상권 선택하러 가기
          </Button>
        </GlassCard>
      ) : (
        <StartupForm
          districtName={district.name}
          onSubmit={handleSubmit}
          submitting={submitting}
        />
      )}
    </motion.div>
  );
}
