export const KAKAO_MAP_KEY =
  process.env.NEXT_PUBLIC_KAKAO_MAP_KEY ?? "8870e6e1b24f9c8816053ce94653aa32";

export const SESSION_KEY = "trialspace_session";

export const BUSINESS_TYPES = [
  "카페 / 디저트",
  "한식당",
  "일식 / 회",
  "치킨 / 배달",
  "베이커리",
  "펍 / 바",
  "분식",
  "기타 F&B",
] as const;

export const OPERATING_HOURS = [
  "09:00 - 18:00",
  "10:00 - 22:00",
  "11:00 - 23:00",
  "24시간",
  "주말 집중 운영",
] as const;
