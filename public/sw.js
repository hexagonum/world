if (!self.define) {
  let e,
    s = {};
  const n = (n, a) => (
    (n = new URL(n + '.js', a).href),
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
  self.define = (a, c) => {
    const t = e || ('document' in self ? document.currentScript.src : '') || location.href;
    if (s[t]) return;
    let i = {};
    const r = (e) => n(e, t),
      o = { module: { uri: t }, exports: i, require: r };
    s[t] = Promise.all(a.map((e) => o[e] || r(e))).then((e) => (c(...e), i));
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
          url: '/world//_next/static/1zGnBdRQGmuA4cBPiQ286/_buildManifest.js',
          revision: 'f4077b09d7c9036fccbc734f71395fa3',
        },
        {
          url: '/world//_next/static/1zGnBdRQGmuA4cBPiQ286/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        { url: '/world//_next/static/chunks/232-7f464077a5a2cbbd.js', revision: '7f464077a5a2cbbd' },
        { url: '/world//_next/static/chunks/265-9ee59103b8c89211.js', revision: '9ee59103b8c89211' },
        { url: '/world//_next/static/chunks/664-60e06c839f82ba03.js', revision: '60e06c839f82ba03' },
        { url: '/world//_next/static/chunks/framework-2c79e2a64abdb08b.js', revision: '2c79e2a64abdb08b' },
        { url: '/world//_next/static/chunks/main-ff814ac547a86341.js', revision: 'ff814ac547a86341' },
        { url: '/world//_next/static/chunks/pages/404-3d663e21c5252aa3.js', revision: '3d663e21c5252aa3' },
        { url: '/world//_next/static/chunks/pages/500-018321599982762d.js', revision: '018321599982762d' },
        { url: '/world//_next/static/chunks/pages/_app-53603b156d234cdd.js', revision: '53603b156d234cdd' },
        { url: '/world//_next/static/chunks/pages/_error-06339d89ea5e2c65.js', revision: '06339d89ea5e2c65' },
        { url: '/world//_next/static/chunks/pages/countries-80dfee75fe68bd54.js', revision: '80dfee75fe68bd54' },
        {
          url: '/world//_next/static/chunks/pages/countries/%5Bcountry%5D-585c57df9c81cc5a.js',
          revision: '585c57df9c81cc5a',
        },
        { url: '/world//_next/static/chunks/pages/countries/area-926b73c3369c3c3b.js', revision: '926b73c3369c3c3b' },
        {
          url: '/world//_next/static/chunks/pages/countries/borders-bf9d9644f68f0bbd.js',
          revision: 'bf9d9644f68f0bbd',
        },
        {
          url: '/world//_next/static/chunks/pages/countries/currencies-1c7848b525d29dc6.js',
          revision: '1c7848b525d29dc6',
        },
        {
          url: '/world//_next/static/chunks/pages/countries/density-7738d13aef86bf76.js',
          revision: '7738d13aef86bf76',
        },
        {
          url: '/world//_next/static/chunks/pages/countries/languages-f3c0d357968aa658.js',
          revision: 'f3c0d357968aa658',
        },
        {
          url: '/world//_next/static/chunks/pages/countries/population-f04b7467a8ec1555.js',
          revision: 'f04b7467a8ec1555',
        },
        {
          url: '/world//_next/static/chunks/pages/countries/timezones-4185dc681737cfe4.js',
          revision: '4185dc681737cfe4',
        },
        {
          url: '/world//_next/static/chunks/pages/countries/top-level-domains-5f570dfd41a2749b.js',
          revision: '5f570dfd41a2749b',
        },
        { url: '/world//_next/static/chunks/pages/currencies-eff90b431fc3a177.js', revision: 'eff90b431fc3a177' },
        {
          url: '/world//_next/static/chunks/pages/currencies/%5Bcurrency%5D-89143ee4aaeb08d9.js',
          revision: '89143ee4aaeb08d9',
        },
        { url: '/world//_next/static/chunks/pages/index-ca433426ff6e5298.js', revision: 'ca433426ff6e5298' },
        { url: '/world//_next/static/chunks/pages/languages-c1e59301cc9db21b.js', revision: 'c1e59301cc9db21b' },
        {
          url: '/world//_next/static/chunks/pages/languages/%5Blanguage%5D-e6d4ccafab2b2eea.js',
          revision: 'e6d4ccafab2b2eea',
        },
        { url: '/world//_next/static/chunks/pages/timezones-ba2fa938ecef2647.js', revision: 'ba2fa938ecef2647' },
        {
          url: '/world//_next/static/chunks/pages/timezones/%5Btimezone%5D-8596925624631871.js',
          revision: '8596925624631871',
        },
        { url: '/world//_next/static/chunks/pages/trends-10db43bf97a5aac8.js', revision: '10db43bf97a5aac8' },
        { url: '/world//_next/static/chunks/pages/weather-e1aa331b4fa8492d.js', revision: 'e1aa331b4fa8492d' },
        {
          url: '/world//_next/static/chunks/polyfills-c67a75d1b6f99dc8.js',
          revision: '837c0df77fd5009c9e46d446188ecfd0',
        },
        { url: '/world//_next/static/chunks/webpack-1683c4100fe76514.js', revision: '1683c4100fe76514' },
        { url: '/world//_next/static/css/08e559a91452e72e.css', revision: '08e559a91452e72e' },
        { url: '/world/favicon.ico', revision: 'b7e5d143f696329db9b04f047c8ba284' },
        { url: '/world/manifest.json', revision: 'da0164d5cdfa9dd960ff4b15e98bf1bd' },
        { url: '/world/next.svg', revision: '8e061864f388b47f33a1c3780831193e' },
        { url: '/world/robots.txt', revision: '0e8552b6f127b4ca6999997cf372679a' },
        { url: '/world/vercel.svg', revision: '61c6b19abff40ea7acd577be818f3976' },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/world',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({ request: e, response: s, event: n, state: a }) =>
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
