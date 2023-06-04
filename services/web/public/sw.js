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
  self.define = (a, t) => {
    const c = e || ('document' in self ? document.currentScript.src : '') || location.href;
    if (s[c]) return;
    let i = {};
    const r = (e) => n(e, c),
      o = { module: { uri: c }, exports: i, require: r };
    s[c] = Promise.all(a.map((e) => o[e] || r(e))).then((e) => (t(...e), i));
  };
}
define(['./workbox-1051b61c'], function (e) {
  'use strict';
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: '/world//_next/static/YMGcZzfoqpKbxkDUwCyxi/_buildManifest.js',
          revision: 'a43a69dab119605ec3ffbff596e15157',
        },
        {
          url: '/world//_next/static/YMGcZzfoqpKbxkDUwCyxi/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        { url: '/world//_next/static/chunks/438-8c2a18be20943c6e.js', revision: '8c2a18be20943c6e' },
        { url: '/world//_next/static/chunks/896-edb0f369b587ea75.js', revision: 'edb0f369b587ea75' },
        { url: '/world//_next/static/chunks/979-301151d297081b68.js', revision: '301151d297081b68' },
        { url: '/world//_next/static/chunks/framework-19f3649580393c10.js', revision: '19f3649580393c10' },
        { url: '/world//_next/static/chunks/main-558051abd9b3a08f.js', revision: '558051abd9b3a08f' },
        { url: '/world//_next/static/chunks/pages/404-58d95707ab7badbe.js', revision: '58d95707ab7badbe' },
        { url: '/world//_next/static/chunks/pages/500-902665299875bf56.js', revision: '902665299875bf56' },
        { url: '/world//_next/static/chunks/pages/_app-fd0d01d48a6b9b4c.js', revision: 'fd0d01d48a6b9b4c' },
        { url: '/world//_next/static/chunks/pages/_error-adc65c75b737d004.js', revision: 'adc65c75b737d004' },
        { url: '/world//_next/static/chunks/pages/countries-0781949d45a811aa.js', revision: '0781949d45a811aa' },
        {
          url: '/world//_next/static/chunks/pages/countries/%5Bcountry%5D-4de516697ebbf0ca.js',
          revision: '4de516697ebbf0ca',
        },
        {
          url: '/world//_next/static/chunks/pages/countries/%5Bcountry%5D/compare-8061ae08afad7d39.js',
          revision: '8061ae08afad7d39',
        },
        { url: '/world//_next/static/chunks/pages/countries/area-0385549d0cf5609e.js', revision: '0385549d0cf5609e' },
        {
          url: '/world//_next/static/chunks/pages/countries/borders-db361f4f21806d7b.js',
          revision: 'db361f4f21806d7b',
        },
        {
          url: '/world//_next/static/chunks/pages/countries/currencies-54e02e283b65a86f.js',
          revision: '54e02e283b65a86f',
        },
        {
          url: '/world//_next/static/chunks/pages/countries/density-f0de43161e69d0d8.js',
          revision: 'f0de43161e69d0d8',
        },
        {
          url: '/world//_next/static/chunks/pages/countries/languages-7b61c89dedbff9c5.js',
          revision: '7b61c89dedbff9c5',
        },
        {
          url: '/world//_next/static/chunks/pages/countries/organizations-db27cb99f2d87766.js',
          revision: 'db27cb99f2d87766',
        },
        {
          url: '/world//_next/static/chunks/pages/countries/population-0765e739345f9acc.js',
          revision: '0765e739345f9acc',
        },
        {
          url: '/world//_next/static/chunks/pages/countries/timezones-9b7cea22566a4b30.js',
          revision: '9b7cea22566a4b30',
        },
        {
          url: '/world//_next/static/chunks/pages/countries/top-level-domains-78c7eae950b13e32.js',
          revision: '78c7eae950b13e32',
        },
        { url: '/world//_next/static/chunks/pages/crypto/coins-5eac74c0e5949543.js', revision: '5eac74c0e5949543' },
        {
          url: '/world//_next/static/chunks/pages/crypto/coins/%5Bcoin%5D-ff4d150f4e7ca266.js',
          revision: 'ff4d150f4e7ca266',
        },
        { url: '/world//_next/static/chunks/pages/currencies-2bc16337957c341a.js', revision: '2bc16337957c341a' },
        {
          url: '/world//_next/static/chunks/pages/currencies/%5Bcurrency%5D-701bc3e61f45c468.js',
          revision: '701bc3e61f45c468',
        },
        { url: '/world//_next/static/chunks/pages/index-20c77b38aed2b397.js', revision: '20c77b38aed2b397' },
        { url: '/world//_next/static/chunks/pages/languages-21a745ec19f6eadb.js', revision: '21a745ec19f6eadb' },
        {
          url: '/world//_next/static/chunks/pages/languages/%5Blanguage%5D-c13b54ecb8bdd1ba.js',
          revision: 'c13b54ecb8bdd1ba',
        },
        { url: '/world//_next/static/chunks/pages/news-a15d31fd007bff79.js', revision: 'a15d31fd007bff79' },
        { url: '/world//_next/static/chunks/pages/organizations-e2b2d357ebb985d3.js', revision: 'e2b2d357ebb985d3' },
        {
          url: '/world//_next/static/chunks/pages/organizations/%5Borganization%5D-4fa99cae3c5a2ad4.js',
          revision: '4fa99cae3c5a2ad4',
        },
        { url: '/world//_next/static/chunks/pages/passports-db2999efe44e48e7.js', revision: 'db2999efe44e48e7' },
        {
          url: '/world//_next/static/chunks/pages/passports/%5Bpassport%5D-54181f694ae49ba9.js',
          revision: '54181f694ae49ba9',
        },
        { url: '/world//_next/static/chunks/pages/timezones-03585b10c8ec0a67.js', revision: '03585b10c8ec0a67' },
        {
          url: '/world//_next/static/chunks/pages/timezones/%5Btimezone%5D-5f98805f103fa971.js',
          revision: '5f98805f103fa971',
        },
        { url: '/world//_next/static/chunks/pages/trends-914ed382b644de97.js', revision: '914ed382b644de97' },
        { url: '/world//_next/static/chunks/pages/weather-f6516f3ca9484cab.js', revision: 'f6516f3ca9484cab' },
        {
          url: '/world//_next/static/chunks/polyfills-c67a75d1b6f99dc8.js',
          revision: '837c0df77fd5009c9e46d446188ecfd0',
        },
        { url: '/world//_next/static/chunks/webpack-72f0182628967e4b.js', revision: '72f0182628967e4b' },
        { url: '/world//_next/static/css/b6a52f841db78191.css', revision: 'b6a52f841db78191' },
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
