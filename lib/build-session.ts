import { generateAnalysis } from "@/lib/analysis";
import { readSession } from "@/lib/session";
import { SAMPLE_DISTRICT, SAMPLE_INPUT } from "@/mock/sample-analysis";
import type { TrialSession } from "@/lib/types";

/** 데모/오류 시 사용할 기본 세션 */
export function createFallbackSession(): TrialSession {
  const input = { ...SAMPLE_INPUT };
  const analysis = generateAnalysis(SAMPLE_DISTRICT, input);
  return {
    district: SAMPLE_DISTRICT,
    input,
    analysis,
    analyzedAt: new Date().toISOString(),
  };
}

/** sessionStorage 기반 세션 생성 (분석 없으면 즉시 생성) */
export function buildTrialSessionFromStorage(): TrialSession {
  const stored = readSession();

  if (stored.district && stored.input) {
    const analysis =
      stored.analysis ?? generateAnalysis(stored.district, stored.input);
    return {
      district: stored.district,
      input: stored.input,
      analysis,
      analyzedAt: stored.analyzedAt ?? new Date().toISOString(),
    };
  }

  console.warn(
    "[TrialSpace] Missing district or input in sessionStorage — using fallback mock.",
  );
  return createFallbackSession();
}
