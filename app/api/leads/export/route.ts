import { createHash, timingSafeEqual } from "node:crypto";
import { get } from "@vercel/blob";
import { NextResponse, type NextRequest } from "next/server";
import { LEAD_FILES } from "@/lib/leads-store";

/**
 * Baixa o CSV de um formulário.
 *
 * O store é privado, então o arquivo não tem URL pública: quem entrega é esta
 * rota, protegida por LEADS_EXPORT_TOKEN. Use assim:
 *
 *   /api/leads/export?form=quero-ser-auster&token=SEU_TOKEN
 */

const FORMS = {
  "quero-ser-auster": LEAD_FILES.queroSerAuster,
  "quero-ser-auster-1": LEAD_FILES.queroSerAusterAnterior,
  indicacao: LEAD_FILES.indicacao,
} as const;

/** Compara em tempo constante para o token não vazar por diferença de tempo.
 *  O hash iguala os tamanhos, que timingSafeEqual exige. */
function tokenMatches(provided: string, expected: string) {
  return timingSafeEqual(
    createHash("sha256").update(provided).digest(),
    createHash("sha256").update(expected).digest(),
  );
}

export async function GET(request: NextRequest) {
  const expected = process.env.LEADS_EXPORT_TOKEN;

  if (!expected) {
    console.error("LEADS_EXPORT_TOKEN não configurado.");
    return new NextResponse("Não encontrado", { status: 404 });
  }

  const provided =
    request.nextUrl.searchParams.get("token") ??
    request.headers.get("authorization")?.replace(/^Bearer /, "") ??
    "";

  if (!tokenMatches(provided, expected)) {
    return new NextResponse("Não autorizado", { status: 401 });
  }

  const form = request.nextUrl.searchParams.get("form") ?? "";
  const pathname = FORMS[form as keyof typeof FORMS];

  if (!pathname) {
    return NextResponse.json(
      { error: `Use ?form= com um destes: ${Object.keys(FORMS).join(", ")}.` },
      { status: 400 },
    );
  }

  // useCache: false para não baixar uma versão de até 60s atrás e perder os
  // últimos leads.
  let blob;
  try {
    blob = await get(pathname, { access: "private", useCache: false });
  } catch (error) {
    // Token ausente ou store fora do ar: sem isto viraria um 500 sem pista.
    console.error("Falha ao ler o CSV de leads no Blob:", error);
    return new NextResponse("Não foi possível ler os leads agora.", {
      status: 502,
    });
  }

  if (blob?.statusCode !== 200) {
    return new NextResponse("Nenhum lead gravado ainda.", { status: 404 });
  }

  const today = new Date().toISOString().slice(0, 10);

  return new NextResponse(blob.stream, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${form}-${today}.csv"`,
      "X-Content-Type-Options": "nosniff",
      // Dado sensível: nada fica em disco no navegador nem em cache da CDN.
      "Cache-Control": "private, no-store",
    },
  });
}
