export function GET() {
  const sitemapIndices = [];
  // tmdb has a limit of 500 pages
  for (let i = 0; i < 2; i++) {
    sitemapIndices.push(
      `
                  <sitemap>
                    <loc>${process.env.NEXT_PUBLIC_SITE_URL}/sitemap/${i}.xml</loc>
                  </sitemap>
      `,
    );
  }
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
            <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
              ${sitemapIndices.join('')}
            </sitemapindex>
            `;

  return new Response(sitemap, {
    status: 200,
    headers: { 'Content-Type': 'text/xml' },
  });
}
