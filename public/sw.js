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
  self.define = (t, a) => {
    const i = e || ('document' in self ? document.currentScript.src : '') || location.href;
    if (s[i]) return;
    let c = {};
    const r = (e) => n(e, i),
      o = { module: { uri: i }, exports: c, require: r };
    s[i] = Promise.all(t.map((e) => o[e] || r(e))).then((e) => (a(...e), c));
  };
}
define(['./workbox-588899ac'], function (e) {
  'use strict';
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: '/countries//_next/static/chunks/265-4ca3083ddbf8ac9e.js', revision: '4ca3083ddbf8ac9e' },
        { url: '/countries//_next/static/chunks/664-60e06c839f82ba03.js', revision: '60e06c839f82ba03' },
        { url: '/countries//_next/static/chunks/69-d5dd4a2cd27d4428.js', revision: 'd5dd4a2cd27d4428' },
        { url: '/countries//_next/static/chunks/framework-2c79e2a64abdb08b.js', revision: '2c79e2a64abdb08b' },
        { url: '/countries//_next/static/chunks/main-aa399e0e06303280.js', revision: 'aa399e0e06303280' },
        {
          url: '/countries//_next/static/chunks/pages/%5Bcountry%5D-df7f5013f82baa3a.js',
          revision: 'df7f5013f82baa3a',
        },
        { url: '/countries//_next/static/chunks/pages/404-3d663e21c5252aa3.js', revision: '3d663e21c5252aa3' },
        { url: '/countries//_next/static/chunks/pages/500-018321599982762d.js', revision: '018321599982762d' },
        { url: '/countries//_next/static/chunks/pages/_app-c2280a70e0531bcb.js', revision: 'c2280a70e0531bcb' },
        { url: '/countries//_next/static/chunks/pages/_error-06339d89ea5e2c65.js', revision: '06339d89ea5e2c65' },
        { url: '/countries//_next/static/chunks/pages/index-a1856cf572bef1be.js', revision: 'a1856cf572bef1be' },
        { url: '/countries//_next/static/chunks/pages/languages-643b6630219e0ddf.js', revision: '643b6630219e0ddf' },
        { url: '/countries//_next/static/chunks/pages/trends-302b1b4a42a21cd3.js', revision: '302b1b4a42a21cd3' },
        { url: '/countries//_next/static/chunks/pages/weather-10579f1ddb415ded.js', revision: '10579f1ddb415ded' },
        {
          url: '/countries//_next/static/chunks/polyfills-c67a75d1b6f99dc8.js',
          revision: '837c0df77fd5009c9e46d446188ecfd0',
        },
        { url: '/countries//_next/static/chunks/webpack-1d2b38a40f3fb383.js', revision: '1d2b38a40f3fb383' },
        { url: '/countries//_next/static/css/3d16fb45a1b0fc67.css', revision: '3d16fb45a1b0fc67' },
        {
          url: '/countries//_next/static/hJvv0Plb-ZIfZlSmkJt6Q/_buildManifest.js',
          revision: '4ca98ea3914b2d9a6041499c61509c65',
        },
        {
          url: '/countries//_next/static/hJvv0Plb-ZIfZlSmkJt6Q/_ssgManifest.js',
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
