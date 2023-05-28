if (!self.define) {
  let e,
    s = {};
  const n = (n, c) => (
    (n = new URL(n + '.js', c).href),
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
  self.define = (c, t) => {
    const a = e || ('document' in self ? document.currentScript.src : '') || location.href;
    if (s[a]) return;
    let i = {};
    const r = (e) => n(e, a),
      o = { module: { uri: a }, exports: i, require: r };
    s[a] = Promise.all(c.map((e) => o[e] || r(e))).then((e) => (t(...e), i));
  };
}
define(['./workbox-588899ac'], function (e) {
  'use strict';
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: '/world//_next/static/chunks/232-97feb6515f5aa00c.js', revision: '97feb6515f5aa00c' },
        { url: '/world//_next/static/chunks/265-f042687f1777f3e3.js', revision: 'f042687f1777f3e3' },
        { url: '/world//_next/static/chunks/479-7077021c600f2cc7.js', revision: '7077021c600f2cc7' },
        { url: '/world//_next/static/chunks/framework-2c79e2a64abdb08b.js', revision: '2c79e2a64abdb08b' },
        { url: '/world//_next/static/chunks/main-ff814ac547a86341.js', revision: 'ff814ac547a86341' },
        { url: '/world//_next/static/chunks/pages/404-31058f3eb3a4395f.js', revision: '31058f3eb3a4395f' },
        { url: '/world//_next/static/chunks/pages/500-b779885ddf995490.js', revision: 'b779885ddf995490' },
        { url: '/world//_next/static/chunks/pages/_app-58ec14ff488d6ba9.js', revision: '58ec14ff488d6ba9' },
        { url: '/world//_next/static/chunks/pages/_error-5c890c76bd6896f5.js', revision: '5c890c76bd6896f5' },
        { url: '/world//_next/static/chunks/pages/countries-d74c223729a2111e.js', revision: 'd74c223729a2111e' },
        {
          url: '/world//_next/static/chunks/pages/countries/%5Bcountry%5D-61d4faed838f58ab.js',
          revision: '61d4faed838f58ab',
        },
        { url: '/world//_next/static/chunks/pages/countries/area-722719e3e0b231b8.js', revision: '722719e3e0b231b8' },
        {
          url: '/world//_next/static/chunks/pages/countries/borders-b70d0d37a9a463cd.js',
          revision: 'b70d0d37a9a463cd',
        },
        {
          url: '/world//_next/static/chunks/pages/countries/currencies-b822c549775856f8.js',
          revision: 'b822c549775856f8',
        },
        {
          url: '/world//_next/static/chunks/pages/countries/density-fbc0c636b43bb6c3.js',
          revision: 'fbc0c636b43bb6c3',
        },
        {
          url: '/world//_next/static/chunks/pages/countries/languages-0358c34cc9b57cb0.js',
          revision: '0358c34cc9b57cb0',
        },
        {
          url: '/world//_next/static/chunks/pages/countries/organizations-86a0c62eeaee5c02.js',
          revision: '86a0c62eeaee5c02',
        },
        {
          url: '/world//_next/static/chunks/pages/countries/population-fde3c78ff17c62b4.js',
          revision: 'fde3c78ff17c62b4',
        },
        {
          url: '/world//_next/static/chunks/pages/countries/timezones-5f44d71d75d49020.js',
          revision: '5f44d71d75d49020',
        },
        {
          url: '/world//_next/static/chunks/pages/countries/top-level-domains-51c8884a939f5091.js',
          revision: '51c8884a939f5091',
        },
        { url: '/world//_next/static/chunks/pages/currencies-73c1ba63f0510376.js', revision: '73c1ba63f0510376' },
        {
          url: '/world//_next/static/chunks/pages/currencies/%5Bcurrency%5D-d61376380bedead7.js',
          revision: 'd61376380bedead7',
        },
        { url: '/world//_next/static/chunks/pages/index-2c150b90755f6016.js', revision: '2c150b90755f6016' },
        { url: '/world//_next/static/chunks/pages/languages-0788f8f7536b2f53.js', revision: '0788f8f7536b2f53' },
        {
          url: '/world//_next/static/chunks/pages/languages/%5Blanguage%5D-5ec121476b24e8d3.js',
          revision: '5ec121476b24e8d3',
        },
        { url: '/world//_next/static/chunks/pages/organizations-63f004b1c5df893e.js', revision: '63f004b1c5df893e' },
        {
          url: '/world//_next/static/chunks/pages/organizations/%5Borganization%5D-013c625037164d1f.js',
          revision: '013c625037164d1f',
        },
        { url: '/world//_next/static/chunks/pages/timezones-71850706b71e811b.js', revision: '71850706b71e811b' },
        {
          url: '/world//_next/static/chunks/pages/timezones/%5Btimezone%5D-0d27bc50e72928e7.js',
          revision: '0d27bc50e72928e7',
        },
        { url: '/world//_next/static/chunks/pages/trends-395fed76c3a8d1c4.js', revision: '395fed76c3a8d1c4' },
        { url: '/world//_next/static/chunks/pages/weather-7ccabe580211b1ff.js', revision: '7ccabe580211b1ff' },
        {
          url: '/world//_next/static/chunks/polyfills-c67a75d1b6f99dc8.js',
          revision: '837c0df77fd5009c9e46d446188ecfd0',
        },
        { url: '/world//_next/static/chunks/webpack-72f0182628967e4b.js', revision: '72f0182628967e4b' },
        { url: '/world//_next/static/css/02be66eff291562d.css', revision: '02be66eff291562d' },
        {
          url: '/world//_next/static/uIKyouScZZJSafwv1cALU/_buildManifest.js',
          revision: 'aa991721f04e077dd519d74c1012f3a7',
        },
        {
          url: '/world//_next/static/uIKyouScZZJSafwv1cALU/_ssgManifest.js',
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
            cacheWillUpdate: async ({ request: e, response: s, event: n, state: c }) =>
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
