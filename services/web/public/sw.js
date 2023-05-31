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
        { url: '/world//_next/static/chunks/112-d46880be993987b7.js', revision: 'd46880be993987b7' },
        { url: '/world//_next/static/chunks/175-de2b7134c0d9c467.js', revision: 'de2b7134c0d9c467' },
        { url: '/world//_next/static/chunks/446-d776f960553ba7bb.js', revision: 'd776f960553ba7bb' },
        { url: '/world//_next/static/chunks/524-deb68c2933e53ac0.js', revision: 'deb68c2933e53ac0' },
        { url: '/world//_next/static/chunks/framework-19f3649580393c10.js', revision: '19f3649580393c10' },
        { url: '/world//_next/static/chunks/main-558051abd9b3a08f.js', revision: '558051abd9b3a08f' },
        { url: '/world//_next/static/chunks/pages/404-5e3c6c5350dc32dc.js', revision: '5e3c6c5350dc32dc' },
        { url: '/world//_next/static/chunks/pages/500-bd71eae1567eb17b.js', revision: 'bd71eae1567eb17b' },
        { url: '/world//_next/static/chunks/pages/_app-4313be4234cb96fe.js', revision: '4313be4234cb96fe' },
        { url: '/world//_next/static/chunks/pages/_error-d27a98e407d27bc1.js', revision: 'd27a98e407d27bc1' },
        { url: '/world//_next/static/chunks/pages/countries-2a24baefe7693f90.js', revision: '2a24baefe7693f90' },
        {
          url: '/world//_next/static/chunks/pages/countries/%5Bcountry%5D-562354b986ac155e.js',
          revision: '562354b986ac155e',
        },
        {
          url: '/world//_next/static/chunks/pages/countries/%5Bcountry%5D/compare-75e917895a74dd2f.js',
          revision: '75e917895a74dd2f',
        },
        { url: '/world//_next/static/chunks/pages/countries/area-d511d773e3ade6e9.js', revision: 'd511d773e3ade6e9' },
        {
          url: '/world//_next/static/chunks/pages/countries/borders-c4120bf60638b81a.js',
          revision: 'c4120bf60638b81a',
        },
        {
          url: '/world//_next/static/chunks/pages/countries/currencies-fb3fddae8461e9a4.js',
          revision: 'fb3fddae8461e9a4',
        },
        {
          url: '/world//_next/static/chunks/pages/countries/density-9afe793b7fd2c46a.js',
          revision: '9afe793b7fd2c46a',
        },
        {
          url: '/world//_next/static/chunks/pages/countries/languages-21755e660d4cd848.js',
          revision: '21755e660d4cd848',
        },
        {
          url: '/world//_next/static/chunks/pages/countries/organizations-18031d8df3ab70d8.js',
          revision: '18031d8df3ab70d8',
        },
        {
          url: '/world//_next/static/chunks/pages/countries/population-50f7555531e32f7d.js',
          revision: '50f7555531e32f7d',
        },
        {
          url: '/world//_next/static/chunks/pages/countries/timezones-f124250141bcfb71.js',
          revision: 'f124250141bcfb71',
        },
        {
          url: '/world//_next/static/chunks/pages/countries/top-level-domains-3de39c66e90689bf.js',
          revision: '3de39c66e90689bf',
        },
        { url: '/world//_next/static/chunks/pages/currencies-47d5ece95603ac83.js', revision: '47d5ece95603ac83' },
        {
          url: '/world//_next/static/chunks/pages/currencies/%5Bcurrency%5D-36758165b3a7fff7.js',
          revision: '36758165b3a7fff7',
        },
        { url: '/world//_next/static/chunks/pages/index-4e6a1172f5ee3e15.js', revision: '4e6a1172f5ee3e15' },
        { url: '/world//_next/static/chunks/pages/languages-6dfc43361db7b06a.js', revision: '6dfc43361db7b06a' },
        {
          url: '/world//_next/static/chunks/pages/languages/%5Blanguage%5D-7bd51a0270e36fe4.js',
          revision: '7bd51a0270e36fe4',
        },
        { url: '/world//_next/static/chunks/pages/organizations-0e013d46dbe32c44.js', revision: '0e013d46dbe32c44' },
        {
          url: '/world//_next/static/chunks/pages/organizations/%5Borganization%5D-7bd3f248b0704575.js',
          revision: '7bd3f248b0704575',
        },
        { url: '/world//_next/static/chunks/pages/passports-3f0bbf92e317cdb7.js', revision: '3f0bbf92e317cdb7' },
        {
          url: '/world//_next/static/chunks/pages/passports/%5Bpassport%5D-519dacbf1a07b472.js',
          revision: '519dacbf1a07b472',
        },
        { url: '/world//_next/static/chunks/pages/timezones-86a74f1338a8e31b.js', revision: '86a74f1338a8e31b' },
        {
          url: '/world//_next/static/chunks/pages/timezones/%5Btimezone%5D-5d8a781cf60173cf.js',
          revision: '5d8a781cf60173cf',
        },
        { url: '/world//_next/static/chunks/pages/trends-7613c88ae1da6c01.js', revision: '7613c88ae1da6c01' },
        { url: '/world//_next/static/chunks/pages/weather-cba218a8a3b081e5.js', revision: 'cba218a8a3b081e5' },
        {
          url: '/world//_next/static/chunks/polyfills-c67a75d1b6f99dc8.js',
          revision: '837c0df77fd5009c9e46d446188ecfd0',
        },
        { url: '/world//_next/static/chunks/webpack-72f0182628967e4b.js', revision: '72f0182628967e4b' },
        { url: '/world//_next/static/css/62e91d12ad206d49.css', revision: '62e91d12ad206d49' },
        {
          url: '/world//_next/static/pmmkSo0hjLyEYosCcmlmq/_buildManifest.js',
          revision: 'ed85aaf8c9bc4fea8b0344ade10ec073',
        },
        {
          url: '/world//_next/static/pmmkSo0hjLyEYosCcmlmq/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
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
