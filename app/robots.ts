import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      // AI crawlers — explicitly allowed so the site can be read, quoted and
      // cited by ChatGPT, Gemini, Perplexity, Claude and Google AI Overviews.
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "GoogleOther", allow: "/" },
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Perplexity-User", allow: "/" },
      { userAgent: "Gemini-Deep-Research", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
      { userAgent: "meta-externalagent", allow: "/" },
    ],
    sitemap: "https://timesquaremedia.in/sitemap.xml",
    host: "https://timesquaremedia.in",
  };
}
