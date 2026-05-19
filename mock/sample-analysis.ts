import { generateAnalysis } from "@/lib/analysis";
import { MOCK_DISTRICTS } from "./districts";

/** 샘플 결과 페이지용 기본 입력 */
export const SAMPLE_INPUT = {
  businessType: "카페 / 디저트",
  menuName: "시그니처 흑임자 라떼",
  avgPrice: 8500,
  concept: "미니멀 인더스트리얼, 2030 타깃 디저트 카페",
  operatingHours: "10:00 - 22:00",
} as const;

export const SAMPLE_DISTRICT = MOCK_DISTRICTS[2];

export const SAMPLE_ANALYSIS = generateAnalysis(SAMPLE_DISTRICT, SAMPLE_INPUT);
