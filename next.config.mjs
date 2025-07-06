/** @type {import('next').NextConfig} */

import withSerwistInit from "@serwist/next";

const revision = crypto.randomUUID();

const withSerwist = withSerwistInit({
  // Note: This is only an example. If you use Pages Router,
  // use something else that works, such as "service-worker/index.ts".
  cacheOnNavigation: true,
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
  additionalPrecacheEntries: [{ url: "/~offline", revision }],
});


const nextConfig = {
    async headers() {
        return [
          {
            source: '/(.*)',
            headers: [
                {
                    key: 'X-Content-Type-Options',
                    value: 'nosniff',
                  },
                  {
                    key: 'X-Frame-Options',
                    value: 'DENY',
                  },
                  {
                    key: 'Referrer-Policy',
                    value: 'strict-origin-when-cross-origin',
                  },
            ],
          },
          {
            source: '/sw.js',
            headers: [
              {
                key: 'Content-Type',
                value: 'application/javascript; charset=utf-8',
              },
              {
                key: 'Cache-Control',
                value: 'no-cache, no-store, must-revalidate',
              },
            //   {
            //     key: 'Content-Security-Policy',
            //     value: "default-src 'self'; script-src 'self'",
            //   },
            ],
          },
        ];
      },
      images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'image.tmdb.org',
            //   port: '',
            //   pathname: '//**',
            },
            {
              protocol: 'https',
              hostname: 'placehold.co',
            },
            {
              protocol: 'https',
              hostname: 'i2.wp.com',
            },
        ],
        // domains: ['placehold.co', "image.tmdb.org"],
        dangerouslyAllowSVG: true,
        
        // unoptimized: true,
      },
      async redirects() {
        return [
          // Wildcard path matching
          {
            source: '/watch/:id/play',
            destination: '/watch/:id',
            permanent: true,
          },
          {
            source: '/search/:query',
            destination: '/search?q=:query&p=1',
            permanent: true,
          },
        ]
      },
    //   experimental: {
    //     missingSuspenseWithCSRBailout: false,
    //   },
};

export default withSerwist(nextConfig);
// export default nextConfig;