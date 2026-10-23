import { renderLlmsTxt, textResponse } from "../llms";

export const dynamic = "force-dynamic";

export async function GET() {
  return textResponse(await renderLlmsTxt());
}
