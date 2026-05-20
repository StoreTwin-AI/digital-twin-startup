import { generateAnalysis } from "@/lib/analysis";
import type { District, StartupInput, TrialSession } from "@/lib/types";
import { MOCK_DISTRICTS } from "@/mock/districts";

export const runtime = "nodejs";

interface AnalysisRequest {
  district?: unknown;
  districtId?: unknown;
  input?: unknown;
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isDistrict(value: unknown): value is District {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<District>;

  return (
    isString(candidate.id) &&
    isString(candidate.name) &&
    isString(candidate.address) &&
    isString(candidate.description) &&
    typeof candidate.footTraffic === "number" &&
    isString(candidate.avgRent) &&
    typeof candidate.competitorCount === "number" &&
    typeof candidate.lat === "number" &&
    typeof candidate.lng === "number"
  );
}

function isStartupInput(value: unknown): value is StartupInput {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<StartupInput>;

  return (
    isString(candidate.businessType) &&
    isString(candidate.menuName) &&
    typeof candidate.avgPrice === "number" &&
    Number.isFinite(candidate.avgPrice) &&
    isString(candidate.concept) &&
    isString(candidate.operatingHours)
  );
}

function resolveDistrict(body: AnalysisRequest): District | null {
  if (isDistrict(body.district)) return body.district;

  if (isString(body.districtId)) {
    return MOCK_DISTRICTS.find((district) => district.id === body.districtId) ?? null;
  }

  return null;
}

export async function POST(request: Request) {
  let body: AnalysisRequest;

  try {
    body = (await request.json()) as AnalysisRequest;
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const district = resolveDistrict(body);
  const input = body.input;

  if (!district) {
    return Response.json(
      { error: "A valid district or districtId is required." },
      { status: 400 },
    );
  }

  if (!isStartupInput(input)) {
    return Response.json(
      { error: "A valid startup input payload is required." },
      { status: 400 },
    );
  }

  const session: TrialSession = {
    district,
    input,
    analysis: generateAnalysis(district, input),
    analyzedAt: new Date().toISOString(),
  };

  return Response.json({ session });
}
