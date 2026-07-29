/**
 * Rate limit simples em memória, por IP.
 *
 * Suficiente para o volume de leads deste site: cada instância serverless
 * mantém sua própria janela, o que já barra o abuso trivial. Se um dia o
 * volume justificar, trocar por Upstash/Redis mantendo esta assinatura.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

const hits = new Map<string, number[]>();

export function rateLimit(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);

  if (recent.length >= MAX_REQUESTS) {
    hits.set(ip, recent);
    return { allowed: false as const };
  }

  recent.push(now);
  hits.set(ip, recent);

  // evita crescimento indefinido do Map em instâncias de vida longa
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }

  return { allowed: true as const };
}

export function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "desconhecido";
}
