import { GetServerSideProps } from "next";

interface Post {
  slug: string;
  date?: string;
}

export default function Sitemap() {
  return null;
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const baseUrl = "https://www.dotinay.com";

  let posts: Post[] = [];

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (apiUrl) {
      const postsRes = await fetch(`${apiUrl}/posts`);
      const data = await postsRes.json();
      posts = Array.isArray(data) ? data : [data];
    }
  } catch (error) {
    console.error("Failed to generate sitemap posts:", error);
  }

  const staticPages = ["/", "/about", "/cv", "/blog"];

  const staticUrls = staticPages.map(
    (path) => `
      <url>
        <loc>${escapeXml(`${baseUrl}${path === "/" ? "" : path}`)}</loc>
        <changefreq>weekly</changefreq>
        <priority>${path === "/" ? "1.0" : "0.8"}</priority>
      </url>`
  );

  const postUrls = posts
    .filter((post) => post.slug)
    .map(
      (post) => `
      <url>
        <loc>${escapeXml(`${baseUrl}/blog/${post.slug}`)}</loc>
        ${post.date ? `<lastmod>${new Date(post.date).toISOString()}</lastmod>` : ""}
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
      </url>`
    );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticUrls, ...postUrls].join("")}
</urlset>`;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};