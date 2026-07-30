import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/*
 * Crawlers que alimentam respostas com IA (ChatGPT, Perplexity, Claude,
 * Gemini/AI Overviews, Copilot). Bloquear qualquer um deles tira o site da
 * lista de fontes que aquela plataforma pode citar.
 *
 * A regra `*` abaixo já os liberaria, mas o robots.txt resolve por grupo mais
 * específico e sem herança: declarar cada bot deixa a intenção explícita e
 * evita que um `Disallow` futuro no `*` os derrube junto. Por isso cada grupo
 * repete o `/api/`.
 */
const AI_SEARCH_BOTS = [
  "GPTBot", // OpenAI — indexação usada pelo ChatGPT
  "OAI-SearchBot", // OpenAI — ChatGPT Search
  "ChatGPT-User", // OpenAI — busca disparada pelo usuário no chat
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot", // Anthropic
  "Claude-SearchBot",
  "Claude-User",
  "anthropic-ai",
  "Google-Extended", // Gemini e AI Overviews
  "Bingbot", // Copilot roda em cima do índice do Bing
  "DuckAssistBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      { userAgent: AI_SEARCH_BOTS, allow: "/", disallow: "/api/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
