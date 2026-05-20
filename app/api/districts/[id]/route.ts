import { MOCK_DISTRICTS } from "@/mock/districts";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const district = MOCK_DISTRICTS.find((item) => item.id === id);

  if (!district) {
    return Response.json({ error: "District not found." }, { status: 404 });
  }

  return Response.json({ district });
}
