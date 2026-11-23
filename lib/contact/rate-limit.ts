import { contactLimits } from "@/lib/contact/schema";

type Bucket = number[];

const buckets = new Map<string, Bucket>();

export type RateLimitResult = { ok: true } | { ok: false; retryAfter: number };

export function rateLimit(key: string, now = Date.now()): RateLimitResult {
  const recent = (buckets.get(key) ?? []).filter((timestamp) => now - timestamp < contactLimits.rateWindowMs);

  if (recent.length >= contactLimits.rateLimit) {
    const retryAfter = Math.max(1, Math.ceil((contactLimits.rateWindowMs - (now - recent[0])) / 1000));
    buckets.set(key, recent);
    return { ok: false, retryAfter };
  }

  recent.push(now);
  buckets.set(key, recent);
  return { ok: true };
}

export function resetRateLimit(): void {
  buckets.clear();
}

export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first.slice(0, 64);
  }
  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp.slice(0, 64);
  return "unknown";
}
