
export const runtime = 'edge';

export function GET() {


    const urls = [
          `${process.env.NEXT_PUBLIC_SITE_URL}`,
          `${process.env.NEXT_PUBLIC_SITE_URL}/blogs`,
          `${process.env.NEXT_PUBLIC_SITE_URL}/discover`,
          `${process.env.NEXT_PUBLIC_SITE_URL}/movies`,
          `${process.env.NEXT_PUBLIC_SITE_URL}/shows`,
          `${process.env.NEXT_PUBLIC_SITE_URL}/adults`,
        ];

const sitemap = `<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
      ${urls
        .map((url) => {
          return `
                <url>
                    <loc>${url}</loc>
                </url>
              `;
        })
        .join('')}
    </urlset>
  `;

  return new Response(sitemap, {
    status: 200,
    headers: { 'Content-Type': 'text/xml' },
  });
}