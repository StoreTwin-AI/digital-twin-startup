import type { District } from "@/lib/types";

/** 서울 주요 상권 mock — 지도 클릭 시 가장 가까운 상권으로 매칭 */
export const MOCK_DISTRICTS: District[] = [
  {
    id: "gangnam",
    name: "강남역 상권",
    address: "서울특별시 강남구 강남대로",
    description: "오피스·쇼핑 수요가 높은 핵심 상권. 점심·저녁 피크가 뚜렷합니다.",
    footTraffic: 12400,
    avgRent: "월 380만원 / 33㎡",
    competitorCount: 47,
    lat: 37.4979,
    lng: 127.0276,
  },
  {
    id: "hongdae",
    name: "홍대입구 상권",
    address: "서울특별시 마포구 양화로",
    description: "2030 중심의 문화·야간 소비 상권. 주말 유동이 평일 대비 1.8배입니다.",
    footTraffic: 15800,
    avgRent: "월 290만원 / 33㎡",
    competitorCount: 62,
    lat: 37.5563,
    lng: 126.9236,
  },
  {
    id: "seongsu",
    name: "성수동 상권",
    address: "서울특별시 성동구 연무장길",
    description: "트렌디 F&B·팝업이 밀집한 신흥 상권. SNS 노출 효과가 큽니다.",
    footTraffic: 9200,
    avgRent: "월 320만원 / 33㎡",
    competitorCount: 38,
    lat: 37.5447,
    lng: 127.0557,
  },
  {
    id: "myeongdong",
    name: "명동 상권",
    address: "서울특별시 중구 명동길",
    description: "관광·쇼핑객 유입이 강한 상권. 외국인 비중이 높습니다.",
    footTraffic: 18600,
    avgRent: "월 450만원 / 33㎡",
    competitorCount: 71,
    lat: 37.5636,
    lng: 126.985,
  },
  {
    id: "yeonnam",
    name: "연남동 상권",
    address: "서울특별시 마포구 연남동",
    description: "주거·카페 밀집 상권. 재방문율이 높고 커뮤니티 성향이 강합니다.",
    footTraffic: 7800,
    avgRent: "월 260만원 / 33㎡",
    competitorCount: 29,
    lat: 37.5658,
    lng: 126.924,
  },
  {
    id: "jamsil",
    name: "잠실 롯데월드몰 상권",
    address: "서울특별시 송파구 올림픽로",
    description: "가족·레저 수요가 큰 복합 상권. 주말·공휴일 매출 비중이 높습니다.",
    footTraffic: 11200,
    avgRent: "월 410만원 / 33㎡",
    competitorCount: 44,
    lat: 37.5125,
    lng: 127.1025,
  },
];

export function findNearestDistrict(lat: number, lng: number): District {
  let nearest = MOCK_DISTRICTS[0];
  let minDist = Infinity;

  for (const d of MOCK_DISTRICTS) {
    const dist = Math.hypot(d.lat - lat, d.lng - lng);
    if (dist < minDist) {
      minDist = dist;
      nearest = d;
    }
  }

  return nearest;
}
