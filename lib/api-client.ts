import type { District, StartupInput, TrialSession } from "@/lib/types";

async function requestJson<T>(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(input, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  const data = (await response.json()) as T & { error?: string };

  if (!response.ok) {
    throw new Error(data.error ?? "API request failed.");
  }

  return data;
}

export async function fetchNearestDistrict(
  lat: number,
  lng: number,
): Promise<District> {
  const params = new URLSearchParams({
    lat: String(lat),
    lng: String(lng),
  });
  const data = await requestJson<{ district: District }>(
    `/api/districts?${params.toString()}`,
  );

  return data.district;
}

export async function createAnalysisSession(
  district: District,
  input: StartupInput,
): Promise<TrialSession> {
  const data = await requestJson<{ session: TrialSession }>("/api/analysis", {
    method: "POST",
    body: JSON.stringify({ districtId: district.id, input }),
  });

  return data.session;
}
