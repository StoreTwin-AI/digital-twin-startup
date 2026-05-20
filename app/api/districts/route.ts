import { findNearestDistrict, MOCK_DISTRICTS } from "@/mock/districts";

export const runtime = "nodejs";

function parseCoordinate(value: string | null): number | null {
  if (value === null) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

export function GET(request: Request) {
  const url = new URL(request.url);
  const lat = parseCoordinate(url.searchParams.get("lat"));
  const lng = parseCoordinate(url.searchParams.get("lng"));

  if (lat !== null || lng !== null) {
    if (lat === null || lng === null) {
      return Response.json(
        { error: "Both lat and lng query parameters are required." },
        { status: 400 },
      );
    }

    return Response.json({ district: findNearestDistrict(lat, lng) });
  }

  return Response.json({ districts: MOCK_DISTRICTS });
}
