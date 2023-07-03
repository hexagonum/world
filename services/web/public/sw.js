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
    const c =
      e ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
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
          url: '/_next/static/QUhrtbJu8vVWb6pt2h2su/_buildManifest.js',
          revision: 'af9d080c0642efb690842864540894c4',
        },
        {
          url: '/_next/static/QUhrtbJu8vVWb6pt2h2su/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        {
          url: '/_next/static/chunks/4c744e84-17865a7e18af4c43.js',
          revision: '17865a7e18af4c43',
        },
        {
          url: '/_next/static/chunks/577-6fdca8527ed758a7.js',
          revision: '6fdca8527ed758a7',
        },
        {
          url: '/_next/static/chunks/595-76aec218d02c20fc.js',
          revision: '76aec218d02c20fc',
        },
        {
          url: '/_next/static/chunks/773-de53f5aff1f448d3.js',
          revision: 'de53f5aff1f448d3',
        },
        {
          url: '/_next/static/chunks/777-e1447d7771fb3e26.js',
          revision: 'e1447d7771fb3e26',
        },
        {
          url: '/_next/static/chunks/884-a3a1e6a6ea4407b3.js',
          revision: 'a3a1e6a6ea4407b3',
        },
        {
          url: '/_next/static/chunks/framework-82e56b5bc7f38c7c.js',
          revision: '82e56b5bc7f38c7c',
        },
        {
          url: '/_next/static/chunks/main-e05128bdcf3b452e.js',
          revision: 'e05128bdcf3b452e',
        },
        {
          url: '/_next/static/chunks/pages/404-f0543c1d8109ea61.js',
          revision: 'f0543c1d8109ea61',
        },
        {
          url: '/_next/static/chunks/pages/500-7cf41d57516d9bdd.js',
          revision: '7cf41d57516d9bdd',
        },
        {
          url: '/_next/static/chunks/pages/_app-27b11e500cfde692.js',
          revision: '27b11e500cfde692',
        },
        {
          url: '/_next/static/chunks/pages/_error-4b09d7d788f30fce.js',
          revision: '4b09d7d788f30fce',
        },
        {
          url: '/_next/static/chunks/pages/countries-975149d911159a3d.js',
          revision: '975149d911159a3d',
        },
        {
          url: '/_next/static/chunks/pages/countries/%5Bcountry%5D-30c3f445bea67a86.js',
          revision: '30c3f445bea67a86',
        },
        {
          url: '/_next/static/chunks/pages/countries/%5Bcountry%5D/compare-64f1d5fa22d93e9f.js',
          revision: '64f1d5fa22d93e9f',
        },
        {
          url: '/_next/static/chunks/pages/countries/area-72b2f2862c1b864e.js',
          revision: '72b2f2862c1b864e',
        },
        {
          url: '/_next/static/chunks/pages/countries/borders-0e93c250b1b1d2c6.js',
          revision: '0e93c250b1b1d2c6',
        },
        {
          url: '/_next/static/chunks/pages/countries/currencies-889c777ce0241371.js',
          revision: '889c777ce0241371',
        },
        {
          url: '/_next/static/chunks/pages/countries/density-0de364390bfa4a59.js',
          revision: '0de364390bfa4a59',
        },
        {
          url: '/_next/static/chunks/pages/countries/languages-6fed4190f34016b2.js',
          revision: '6fed4190f34016b2',
        },
        {
          url: '/_next/static/chunks/pages/countries/organizations-fc6504a424c763e6.js',
          revision: 'fc6504a424c763e6',
        },
        {
          url: '/_next/static/chunks/pages/countries/population-8f520b18639241b9.js',
          revision: '8f520b18639241b9',
        },
        {
          url: '/_next/static/chunks/pages/countries/timezones-aa38247197e9968b.js',
          revision: 'aa38247197e9968b',
        },
        {
          url: '/_next/static/chunks/pages/countries/top-level-domains-800fa84cd6035454.js',
          revision: '800fa84cd6035454',
        },
        {
          url: '/_next/static/chunks/pages/crypto/coins-4bd21bf2bb0008b5.js',
          revision: '4bd21bf2bb0008b5',
        },
        {
          url: '/_next/static/chunks/pages/crypto/coins/%5Bcoin%5D-555debecf4811da0.js',
          revision: '555debecf4811da0',
        },
        {
          url: '/_next/static/chunks/pages/currencies-f8b507f380f829fb.js',
          revision: 'f8b507f380f829fb',
        },
        {
          url: '/_next/static/chunks/pages/currencies/%5Bcurrency%5D-5c256f84636f51de.js',
          revision: '5c256f84636f51de',
        },
        {
          url: '/_next/static/chunks/pages/football-5a34b2b9b0dcfff0.js',
          revision: '5a34b2b9b0dcfff0',
        },
        {
          url: '/_next/static/chunks/pages/football/%5BareaId%5D-58701e9df2bf217f.js',
          revision: '58701e9df2bf217f',
        },
        {
          url: '/_next/static/chunks/pages/football/%5BareaId%5D/%5BcompetitionId%5D-170e4ced03d04731.js',
          revision: '170e4ced03d04731',
        },
        {
          url: '/_next/static/chunks/pages/football/%5BareaId%5D/%5BcompetitionId%5D/%5BteamId%5D-3457c40f5326fbf0.js',
          revision: '3457c40f5326fbf0',
        },
        {
          url: '/_next/static/chunks/pages/google-5fd6c1d9c895d56e.js',
          revision: '5fd6c1d9c895d56e',
        },
        {
          url: '/_next/static/chunks/pages/google/trends-3690f6bda2b2f2e4.js',
          revision: '3690f6bda2b2f2e4',
        },
        {
          url: '/_next/static/chunks/pages/google/youtube-d4524b6c72066e0c.js',
          revision: 'd4524b6c72066e0c',
        },
        {
          url: '/_next/static/chunks/pages/index-5771c2f04e1e35b6.js',
          revision: '5771c2f04e1e35b6',
        },
        {
          url: '/_next/static/chunks/pages/languages-a99ab0ca9a4eb6f9.js',
          revision: 'a99ab0ca9a4eb6f9',
        },
        {
          url: '/_next/static/chunks/pages/languages/%5Blanguage%5D-31c8c3072666c864.js',
          revision: '31c8c3072666c864',
        },
        {
          url: '/_next/static/chunks/pages/organizations-771f644a7ea08c35.js',
          revision: '771f644a7ea08c35',
        },
        {
          url: '/_next/static/chunks/pages/organizations/%5Borganization%5D-3e7479b51679f550.js',
          revision: '3e7479b51679f550',
        },
        {
          url: '/_next/static/chunks/pages/passports-285e759b680ecb7e.js',
          revision: '285e759b680ecb7e',
        },
        {
          url: '/_next/static/chunks/pages/passports/%5Bpassport%5D-e38a35412fcca561.js',
          revision: 'e38a35412fcca561',
        },
        {
          url: '/_next/static/chunks/pages/profile-266633789f05fd77.js',
          revision: '266633789f05fd77',
        },
        {
          url: '/_next/static/chunks/pages/timezones-c15531645a1f457a.js',
          revision: 'c15531645a1f457a',
        },
        {
          url: '/_next/static/chunks/pages/timezones/%5Btimezone%5D-841cd5b1f1769236.js',
          revision: '841cd5b1f1769236',
        },
        {
          url: '/_next/static/chunks/pages/weather-6b68ed082fbbf828.js',
          revision: '6b68ed082fbbf828',
        },
        {
          url: '/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js',
          revision: '79330112775102f91e1010318bae2bd3',
        },
        {
          url: '/_next/static/chunks/webpack-62c02dad1a6a4cb4.js',
          revision: '62c02dad1a6a4cb4',
        },
        {
          url: '/_next/static/css/7a04e1ef414b0ff9.css',
          revision: '7a04e1ef414b0ff9',
        },
        { url: '/favicon.ico', revision: 'b7e5d143f696329db9b04f047c8ba284' },
        { url: '/manifest.json', revision: 'da0164d5cdfa9dd960ff4b15e98bf1bd' },
        { url: '/next.svg', revision: '8e061864f388b47f33a1c3780831193e' },
        { url: '/robots.txt', revision: '0e8552b6f127b4ca6999997cf372679a' },
        { url: '/vercel.svg', revision: '61c6b19abff40ea7acd577be818f3976' },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: s,
              event: n,
              state: a,
            }) =>
              s && 'opaqueredirect' === s.type
                ? new Response(s.body, {
                    status: 200,
                    statusText: 'OK',
                    headers: s.headers,
                  })
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
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
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
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
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
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      'GET'
    );
});
