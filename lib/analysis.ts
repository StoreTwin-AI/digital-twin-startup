import type { AnalysisResult, CompetitionLevel, District, StartupInput } from "./types";

function hashString(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function levelFromScore(score: number): CompetitionLevel {
  if (score < 40) return "low";
  if (score < 70) return "medium";
  return "high";
}

export function generateAnalysis(
  district: District,
  input: StartupInput,
): AnalysisResult {
  const seed = hashString(
    `${district.id}-${input.businessType}-${input.menuName}-${input.avgPrice}`,
  );
  const rand = (n: number) => ((seed * (n + 1) * 9301 + 49297) % 233280) / 233280;

  const isCafe = input.businessType.includes("카페") || input.businessType.includes("베이커리");
  const isNight = input.operatingHours.includes("22") || input.operatingHours.includes("23") || input.operatingHours === "24시간";

  const baseRevenue = district.footTraffic * (input.avgPrice / 100) * (isCafe ? 0.42 : 0.35);
  const monthlyRevenue = Math.round(baseRevenue * (0.85 + rand(1) * 0.35));

  const competitionScore = Math.min(
    95,
    Math.round(
      district.competitorCount * 1.1 +
        (isCafe ? 12 : 0) +
        rand(2) * 15,
    ),
  );

  const successProbability = Math.min(
    92,
    Math.max(
      38,
      Math.round(
        55 +
          (district.footTraffic > 10000 ? 8 : -5) +
          (input.avgPrice < 12000 ? 6 : -4) +
          (competitionScore > 70 ? -12 : 8) +
          rand(3) * 10,
      ),
    ),
  );

  const audienceBase = isCafe
    ? [
        { age: "20~24세", percentage: 22 },
        { age: "25~29세", percentage: 28 },
        { age: "30~34세", percentage: 18 },
        { age: "35~39세", percentage: 12 },
        { age: "40세 이상", percentage: 20 },
      ]
    : isNight
      ? [
          { age: "20~24세", percentage: 18 },
          { age: "25~29세", percentage: 32 },
          { age: "30~34세", percentage: 22 },
          { age: "35~39세", percentage: 15 },
          { age: "40세 이상", percentage: 13 },
        ]
      : [
          { age: "20~24세", percentage: 15 },
          { age: "25~29세", percentage: 22 },
          { age: "30~34세", percentage: 25 },
          { age: "35~39세", percentage: 20 },
          { age: "40세 이상", percentage: 18 },
        ];

  const footTrafficByHour = [
    { hour: "08", count: Math.round(district.footTraffic * 0.04) },
    { hour: "10", count: Math.round(district.footTraffic * 0.07) },
    { hour: "12", count: Math.round(district.footTraffic * 0.14) },
    { hour: "14", count: Math.round(district.footTraffic * 0.09) },
    { hour: "16", count: Math.round(district.footTraffic * 0.08) },
    { hour: "18", count: Math.round(district.footTraffic * 0.16) },
    { hour: "20", count: Math.round(district.footTraffic * (isNight ? 0.18 : 0.12)) },
    { hour: "22", count: Math.round(district.footTraffic * (isNight ? 0.14 : 0.06)) },
  ];

  const revenueProjection = ["1월", "2월", "3월", "4월", "5월", "6월"].map(
    (month, i) => ({
      month,
      revenue: Math.round(monthlyRevenue * (0.72 + i * 0.06 + rand(4 + i) * 0.08)),
    }),
  );

  const audienceDistribution = [
    { name: "직장인", value: isCafe ? 28 : 35 },
    { name: "학생", value: district.name.includes("홍대") ? 32 : 18 },
    { name: "가족", value: district.name.includes("잠실") ? 30 : 15 },
    { name: "관광객", value: district.name.includes("명동") ? 28 : 8 },
    { name: "거주민", value: district.name.includes("연남") ? 35 : 22 },
  ];

  const youngPct =
    audienceBase[0].percentage + audienceBase[1].percentage;

  const insights: string[] = [
    `${district.name} 일평균 유동인구는 약 ${district.footTraffic.toLocaleString()}명으로, ${
      district.footTraffic > 12000 ? "상위권 상권" : "성장 잠재력이 있는 상권"
    }입니다.`,
    `20~30대 소비층 비율이 ${youngPct}%로 ${
      isCafe ? "디저트·브런치 카페와 적합합니다." : "트렌디한 메뉴 구성이 유리합니다."
    }`,
    `동일 업종 경쟁점 ${district.competitorCount}곳 기준, ${
      competitionScore > 65
        ? "차별화된 시그니처 메뉴가 필수입니다."
        : "틈새 포지셔닝으로 빠른 점유가 가능합니다."
    }`,
    `"${input.menuName}" (${input.avgPrice.toLocaleString()}원)은 ${
      input.avgPrice > 15000
        ? "프리미엄 포지셔닝에 맞는 가격대입니다."
        : "대중 접근성이 높아 회전율 전략에 적합합니다."
    }`,
    input.concept
      ? `컨셉 "${input.concept}"은 ${
          district.name.includes("성수") || district.name.includes("연남")
            ? "SNS 바이럴과 궁합이 좋습니다."
            : "안정적 단골 확보에 유리합니다."
        }`
      : "명확한 컨셉 메시지를 추가하면 브랜드 인지도가 12%p 상승할 수 있습니다.",
  ];

  const strategies = [
    competitionScore > 65
      ? "피크 시간(12~14시, 18~20시) 한정 시그니처 세트로 차별화"
      : "오픈 초기 2주 런칭 프로모션으로 인지도 확보",
    isCafe
      ? "인스타그램 최적화 디저트·시즌 한정 메뉴로 2030 유입 강화"
      : "배달·포장 채널 병행으로 비피크 매출 보완",
    district.footTraffic > 12000
      ? "점심 B2B 단체 주문·오피스 쿠폰 제휴 검토"
      : "지역 커뮤니티·단골 멤버십으로 재방문율 제고",
    `운영 시간 ${input.operatingHours}에 맞춰 인력·재고 피크를 ${isNight ? "20~22시" : "12~14시"}에 집중 배치`,
    "첫 3개월 A/B 테스트: 메뉴판 가격·좌석 배치·테이크아웃 비중 최적화",
  ];

  return {
    successProbability,
    monthlyRevenue,
    competitionLevel: levelFromScore(competitionScore),
    competitionScore,
    targetAudience: audienceBase,
    strategies,
    insights,
    footTrafficByHour,
    revenueProjection,
    audienceDistribution,
  };
}
