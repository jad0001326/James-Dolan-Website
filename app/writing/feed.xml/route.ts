import { getWritingPosts } from "@/lib/content/writing";
import { site } from "@/lib/site";
import { escapeXml } from "@/lib/utils";

export function GET(): Response {
  const items = getWritingPosts()
    .map((post) => {
      const link = `${site.url}/writing/${post.slug}`;
      return `<item>
        <title>${escapeXml(post.title)}</title>
        <link>${link}</link>
        <guid>${link}</guid>
        <pubDate>${new Date(`${post.publishedAt}T00:00:00Z`).toUTCString()}</pubDate>
        <description>${escapeXml(post.summary)}</description>
      </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(`${site.name} · Writing`)}</title>
    <link>${site.url}/writing</link>
    <description>${escapeXml("Notes on SOAR playbooks and security automation.")}</description>
    <language>en-gb</language>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "content-type": "application/rss+xml; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
