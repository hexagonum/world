if (!self.define) {
  let e,
    s = {};
  const t = (t, a) => (
    (t = new URL(t + '.js', a).href),
    s[t] ||
      new Promise((s) => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = t), (e.onload = s), document.head.appendChild(e);
        } else (e = t), importScripts(t), s();
      }).then(() => {
        let e = s[t];
        if (!e) throw new Error(`Module ${t} didn’t register its module`);
        return e;
      })
  );
  self.define = (a, n) => {
    const c = e || ('document' in self ? document.currentScript.src : '') || location.href;
    if (s[c]) return;
    let i = {};
    const r = (e) => t(e, c),
      o = { module: { uri: c }, exports: i, require: r };
    s[c] = Promise.all(a.map((e) => o[e] || r(e))).then((e) => (n(...e), i));
  };
}
define(['./workbox-588899ac'], function (e) {
  'use strict';
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: '/weather//_next/static/IV_Vg3UwfSk6wSxWsuxAp/_buildManifest.js',
          revision: '1320e8f5d21a49f965250c90bb23bdcd',
        },
        {
          url: '/weather//_next/static/IV_Vg3UwfSk6wSxWsuxAp/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        { url: '/weather//_next/static/chunks/137-0470a22e49ae070d.js', revision: '0470a22e49ae070d' },
        { url: '/weather//_next/static/chunks/445-b42922c0716c3c81.js', revision: 'b42922c0716c3c81' },
        { url: '/weather//_next/static/chunks/630-72504c1bd1d24ca9.js', revision: '72504c1bd1d24ca9' },
        { url: '/weather//_next/static/chunks/framework-2c79e2a64abdb08b.js', revision: '2c79e2a64abdb08b' },
        { url: '/weather//_next/static/chunks/main-289bfe213331ba7b.js', revision: '289bfe213331ba7b' },
        { url: '/weather//_next/static/chunks/pages/%5Bcountry%5D-9e5fd229931c1294.js', revision: '9e5fd229931c1294' },
        { url: '/weather//_next/static/chunks/pages/404-3d663e21c5252aa3.js', revision: '3d663e21c5252aa3' },
        { url: '/weather//_next/static/chunks/pages/500-018321599982762d.js', revision: '018321599982762d' },
        { url: '/weather//_next/static/chunks/pages/_app-282f4c0001e5e7bd.js', revision: '282f4c0001e5e7bd' },
        { url: '/weather//_next/static/chunks/pages/_error-06339d89ea5e2c65.js', revision: '06339d89ea5e2c65' },
        { url: '/weather//_next/static/chunks/pages/index-15c7a6c6b4e18bfe.js', revision: '15c7a6c6b4e18bfe' },
        { url: '/weather//_next/static/chunks/pages/trends-839232edba3dcd17.js', revision: '839232edba3dcd17' },
        { url: '/weather//_next/static/chunks/pages/weather-fd39da6d99f33cc1.js', revision: 'fd39da6d99f33cc1' },
        {
          url: '/weather//_next/static/chunks/polyfills-c67a75d1b6f99dc8.js',
          revision: '837c0df77fd5009c9e46d446188ecfd0',
        },
        { url: '/weather//_next/static/chunks/webpack-8c8ee85048b1b5db.js', revision: '8c8ee85048b1b5db' },
        { url: '/weather//_next/static/css/b7ae6a0e965f79d3.css', revision: 'b7ae6a0e965f79d3' },
        { url: '/weather/favicon.ico', revision: 'b7e5d143f696329db9b04f047c8ba284' },
        { url: '/weather/manifest.json', revision: '5afb4273d9879978e7d83436c7197ab8' },
        { url: '/weather/next.svg', revision: '8e061864f388b47f33a1c3780831193e' },
        { url: '/weather/vercel.svg', revision: '61c6b19abff40ea7acd577be818f3976' },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/weather',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({ request: e, response: s, event: t, state: a }) =>
              s && 'opaqueredirect' === s.type
                ? new Response(s.body, { status: 200, statusText: 'OK', headers: s.headers })
                : s,
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [new e.RangeRequestsPlugin(), new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [new e.RangeRequestsPlugin(), new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith('/api/auth/') && !!s.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 })],
      }),
      'GET'
    );
});
