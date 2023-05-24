if (!self.define) {
  let e,
    s = {};
  const n = (n, t) => (
    (n = new URL(n + '.js', t).href),
    s[n] ||
      new Promise((s) => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = n), (e.onload = s), document.head.appendChild(e);
        } else (e = n), importScripts(n), s();
      }).then(() => {
        let e = s[n];
        if (!e) throw new Error(`Module ${n} didn’t register its module`);
        return e;
      })
  );
  self.define = (t, c) => {
    const i = e || ('document' in self ? document.currentScript.src : '') || location.href;
    if (s[i]) return;
    let a = {};
    const r = (e) => n(e, i),
      o = { module: { uri: i }, exports: a, require: r };
    s[i] = Promise.all(t.map((e) => o[e] || r(e))).then((e) => (c(...e), a));
  };
}
define(['./workbox-588899ac'], function (e) {
  'use strict';
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: '/countries//_next/static/chunks/232-decef86745e95ee8.js', revision: 'decef86745e95ee8' },
        { url: '/countries//_next/static/chunks/265-2731b2b812ce5e10.js', revision: '2731b2b812ce5e10' },
        { url: '/countries//_next/static/chunks/664-60e06c839f82ba03.js', revision: '60e06c839f82ba03' },
        { url: '/countries//_next/static/chunks/framework-2c79e2a64abdb08b.js', revision: '2c79e2a64abdb08b' },
        { url: '/countries//_next/static/chunks/main-db4494a0c5f7239b.js', revision: 'db4494a0c5f7239b' },
        { url: '/countries//_next/static/chunks/pages/404-3d663e21c5252aa3.js', revision: '3d663e21c5252aa3' },
        { url: '/countries//_next/static/chunks/pages/500-018321599982762d.js', revision: '018321599982762d' },
        { url: '/countries//_next/static/chunks/pages/_app-53603b156d234cdd.js', revision: '53603b156d234cdd' },
        { url: '/countries//_next/static/chunks/pages/_error-06339d89ea5e2c65.js', revision: '06339d89ea5e2c65' },
        { url: '/countries//_next/static/chunks/pages/countries-b0edbb867667fb7f.js', revision: 'b0edbb867667fb7f' },
        {
          url: '/countries//_next/static/chunks/pages/countries/%5Bcountry%5D-47cdf011992f1b24.js',
          revision: '47cdf011992f1b24',
        },
        {
          url: '/countries//_next/static/chunks/pages/countries/area-926b73c3369c3c3b.js',
          revision: '926b73c3369c3c3b',
        },
        {
          url: '/countries//_next/static/chunks/pages/countries/borders-40c0209abaf88257.js',
          revision: '40c0209abaf88257',
        },
        {
          url: '/countries//_next/static/chunks/pages/countries/currencies-1c7848b525d29dc6.js',
          revision: '1c7848b525d29dc6',
        },
        {
          url: '/countries//_next/static/chunks/pages/countries/density-7738d13aef86bf76.js',
          revision: '7738d13aef86bf76',
        },
        {
          url: '/countries//_next/static/chunks/pages/countries/languages-fe8f3670ecc12783.js',
          revision: 'fe8f3670ecc12783',
        },
        {
          url: '/countries//_next/static/chunks/pages/countries/population-f04b7467a8ec1555.js',
          revision: 'f04b7467a8ec1555',
        },
        {
          url: '/countries//_next/static/chunks/pages/countries/top-level-domains-5f570dfd41a2749b.js',
          revision: '5f570dfd41a2749b',
        },
        { url: '/countries//_next/static/chunks/pages/index-e9b530606fe6edcb.js', revision: 'e9b530606fe6edcb' },
        { url: '/countries//_next/static/chunks/pages/trends-d139574cf62091c3.js', revision: 'd139574cf62091c3' },
        { url: '/countries//_next/static/chunks/pages/weather-6151c8229adb379d.js', revision: '6151c8229adb379d' },
        {
          url: '/countries//_next/static/chunks/polyfills-c67a75d1b6f99dc8.js',
          revision: '837c0df77fd5009c9e46d446188ecfd0',
        },
        { url: '/countries//_next/static/chunks/webpack-1d2b38a40f3fb383.js', revision: '1d2b38a40f3fb383' },
        { url: '/countries//_next/static/css/2863dcedb1ec1ed0.css', revision: '2863dcedb1ec1ed0' },
        {
          url: '/countries//_next/static/qWZV50mBaPlGT5P6sk3uQ/_buildManifest.js',
          revision: 'f897acb746a6fe0762c31748f52c50c4',
        },
        {
          url: '/countries//_next/static/qWZV50mBaPlGT5P6sk3uQ/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        { url: '/countries/favicon.ico', revision: 'b7e5d143f696329db9b04f047c8ba284' },
        { url: '/countries/manifest.json', revision: '5afb4273d9879978e7d83436c7197ab8' },
        { url: '/countries/next.svg', revision: '8e061864f388b47f33a1c3780831193e' },
        { url: '/countries/vercel.svg', revision: '61c6b19abff40ea7acd577be818f3976' },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/countries',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({ request: e, response: s, event: n, state: t }) =>
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
