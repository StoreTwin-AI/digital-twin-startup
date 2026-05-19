"use client";

import { useCallback, useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, RotateCcw } from "lucide-react";
import { StepIndicator } from "@/components/layout/StepIndicator";
import { AIAnalyzing } from "@/components/results/AIAnalyzing";
import {
  AnalysisMetrics,
  AnalysisInsights,
} from "@/components/results/AnalysisMetrics";
import { AnalysisCharts } from "@/components/results/AnalysisCharts";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  buildTrialSessionFromStorage,
  createFallbackSession,
} from "@/lib/build-session";
import { saveSession } from "@/lib/session";
import type { TrialSession } from "@/lib/types";

const ANALYSIS_DELAY_MS = 2800;

type PageStatus = "analyzing" | "ready";

function ResultsContent() {
  const searchParams = useSearchParams();
  const wantsAnalyzing = searchParams.get("analyzing") === "1";

  const [session, setSession] = useState<TrialSession | null>(null);
  const [status, setStatus] = useState<PageStatus>(
    wantsAnalyzing ? "analyzing" : "ready",
  );
  const [step, setStep] = useState(0);

  const finishWithSession = useCallback((next: TrialSession) => {
    saveSession(next);
    setSession(next);
    setStatus("ready");
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", "/results");
    }
  }, []);

  const loadOrFallback = useCallback((): TrialSession => {
    try {
      return buildTrialSessionFromStorage();
    } catch (error) {
      console.error("[TrialSpace] buildTrialSessionFromStorage failed:", error);
      return createFallbackSession();
    }
  }, []);

  // analyzing=1 : AI ?? ? ?? ?? (router.replace ?? ? ? ? ?? ?? ??)
  useEffect(() => {
    if (!wantsAnalyzing) return;

    setStatus("analyzing");
    setSession(null);

    const interval = setInterval(() => {
      setStep((s) => s + 1);
    }, 600);

    let cancelled = false;
    const timer = window.setTimeout(() => {
      if (cancelled) return;
      try {
        finishWithSession(loadOrFallback());
      } catch (error) {
        console.error("[TrialSpace] Analysis timeout handler failed:", error);
        finishWithSession(createFallbackSession());
      }
    }, ANALYSIS_DELAY_MS);

    return () => {
      cancelled = true;
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [wantsAnalyzing, finishWithSession, loadOrFallback]);

  // ?? ?? / ?? ??: ?? ?? ??
  useEffect(() => {
    if (wantsAnalyzing) return;

    let cancelled = false;

    try {
      const loaded = loadOrFallback();
      if (!cancelled) {
        saveSession(loaded);
        setSession(loaded);
        setStatus("ready");
      }
    } catch (error) {
      console.error("[TrialSpace] Initial session load failed:", error);
      if (!cancelled) {
        const fallback = createFallbackSession();
        saveSession(fallback);
        setSession(fallback);
        setStatus("ready");
      }
    }

    return () => {
      cancelled = true;
    };
  }, [wantsAnalyzing, loadOrFallback]);

  if (status === "analyzing") {
    return <AIAnalyzing step={step} />;
  }

  if (!session) {
    return (
      <motion.div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-zinc-400">?? ???? ???? ?...</p>
      </motion.div>
    );
  }

  const { district, input, analysis } = session;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="results"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12"
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <motion.div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <motion.div>
              <motion.div
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
                className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs text-blue-300"
              >
                <Brain className="h-3.5 w-3.5" />
                AI ?? ??
              </motion.div>
              <h1 className="text-2xl font-bold text-white sm:text-3xl">
                {district.name} ?? ????? ??
              </h1>
              <p className="mt-2 text-sm text-zinc-400">
                {input.businessType} ? {input.menuName} ?{" "}
                {input.avgPrice.toLocaleString()}?
              </p>
            </motion.div>
            <motion.div className="flex gap-2">
              <Button href="/map" variant="secondary" size="sm">
                <RotateCcw className="h-4 w-4" />
                ?? ??
              </Button>
            </motion.div>
          </motion.div>
          <motion.div className="mt-6">
            <StepIndicator current={3} />
          </motion.div>
        </motion.div>

        <GlassCard className="mb-8 border-blue-500/20 bg-gradient-to-r from-blue-500/10 to-transparent">
          <p className="text-sm leading-relaxed text-zinc-300">
            <span className="font-semibold text-blue-400">AI ??: </span>
            {analysis.insights[0]} {analysis.insights[1]}
          </p>
        </GlassCard>

        <motion.div className="space-y-8">
          <AnalysisMetrics analysis={analysis} />
          <AnalysisInsights
            insights={analysis.insights}
            strategies={analysis.strategies}
          />
          <AnalysisCharts analysis={analysis} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button href="/map" size="lg">
            ? ???? ????
          </Button>
          <Button href="/" variant="ghost" size="lg">
            ???
          </Button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <motion.div className="flex min-h-[50vh] items-center justify-center text-zinc-400">
          ?? ?...
        </motion.div>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}
