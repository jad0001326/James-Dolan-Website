import { handleContact } from "@/lib/contact/handle";

export const runtime = "nodejs";

export function POST(request: Request): Promise<Response> {
  return handleContact(request);
}
