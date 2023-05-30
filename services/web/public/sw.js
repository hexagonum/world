if (!self.define) {
  let e,
    s = {};
  const a = (a, n) => (
    (a = new URL(a + '.js', n).href),
    s[a] ||
      new Promise((s) => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = a), (e.onload = s), document.head.appendChild(e);
        } else (e = a), importScripts(a), s();
      }).then(() => {
        let e = s[a];
        if (!e) throw new Error(`Module ${a} didn’t register its module`);
        return e;
      })
  );
  self.define = (n, t) => {
    const c = e || ('document' in self ? document.currentScript.src : '') || location.href;
    if (s[c]) return;
    let i = {};
    const r = (e) => a(e, c),
      o = { module: { uri: c }, exports: i, require: r };
    s[c] = Promise.all(n.map((e) => o[e] || r(e))).then((e) => (t(...e), i));
  };
}
define(['./workbox-1051b61c'], function (e) {
  'use strict';
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: '/world//_next/static/chunks/112-1c05dcfd3e4b34dd.js', revision: '1c05dcfd3e4b34dd' },
        { url: '/world//_next/static/chunks/175-17a00bb2c204c3a0.js', revision: '17a00bb2c204c3a0' },
        { url: '/world//_next/static/chunks/446-c32ecde51d2cca33.js', revision: 'c32ecde51d2cca33' },
        { url: '/world//_next/static/chunks/524-deb68c2933e53ac0.js', revision: 'deb68c2933e53ac0' },
        { url: '/world//_next/static/chunks/framework-19f3649580393c10.js', revision: '19f3649580393c10' },
        { url: '/world//_next/static/chunks/main-3a2833a834eb6d51.js', revision: '3a2833a834eb6d51' },
        { url: '/world//_next/static/chunks/pages/404-17209594865451c9.js', revision: '17209594865451c9' },
        { url: '/world//_next/static/chunks/pages/500-3707b151b9bc87f2.js', revision: '3707b151b9bc87f2' },
        { url: '/world//_next/static/chunks/pages/_app-69e09ab2cf42b477.js', revision: '69e09ab2cf42b477' },
        { url: '/world//_next/static/chunks/pages/_error-02e9af4a8cd584a3.js', revision: '02e9af4a8cd584a3' },
        { url: '/world//_next/static/chunks/pages/countries-2a24baefe7693f90.js', revision: '2a24baefe7693f90' },
        {
          url: '/world//_next/static/chunks/pages/countries/%5Bcountry%5D-8c51a2c929a4c9f2.js',
          revision: '8c51a2c929a4c9f2',
        },
        {
          url: '/world//_next/static/chunks/pages/countries/%5Bcountry%5D/compare-f99d6c84aae75831.js',
          revision: 'f99d6c84aae75831',
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
        { url: '/world//_next/static/chunks/pages/currencies-55a99c8ab4a25888.js', revision: '55a99c8ab4a25888' },
        {
          url: '/world//_next/static/chunks/pages/currencies/%5Bcurrency%5D-2bb8e0ac36b5e3d2.js',
          revision: '2bb8e0ac36b5e3d2',
        },
        { url: '/world//_next/static/chunks/pages/index-4e6a1172f5ee3e15.js', revision: '4e6a1172f5ee3e15' },
        { url: '/world//_next/static/chunks/pages/languages-f9ea2448de8d0027.js', revision: 'f9ea2448de8d0027' },
        {
          url: '/world//_next/static/chunks/pages/languages/%5Blanguage%5D-40a10b48a7652689.js',
          revision: '40a10b48a7652689',
        },
        { url: '/world//_next/static/chunks/pages/organizations-1b801806c3ffa7f2.js', revision: '1b801806c3ffa7f2' },
        {
          url: '/world//_next/static/chunks/pages/organizations/%5Borganization%5D-ae7f6160e6041b80.js',
          revision: 'ae7f6160e6041b80',
        },
        { url: '/world//_next/static/chunks/pages/passports-10072aa4196260fc.js', revision: '10072aa4196260fc' },
        {
          url: '/world//_next/static/chunks/pages/passports/%5Bpassport%5D-1fa03223a61b35b1.js',
          revision: '1fa03223a61b35b1',
        },
        { url: '/world//_next/static/chunks/pages/timezones-0334bcb89b032d83.js', revision: '0334bcb89b032d83' },
        {
          url: '/world//_next/static/chunks/pages/timezones/%5Btimezone%5D-5dbac51e87cf3a8c.js',
          revision: '5dbac51e87cf3a8c',
        },
        { url: '/world//_next/static/chunks/pages/trends-911a9d3a480b68e3.js', revision: '911a9d3a480b68e3' },
        { url: '/world//_next/static/chunks/pages/weather-6b5d7ad30b35f88e.js', revision: '6b5d7ad30b35f88e' },
        {
          url: '/world//_next/static/chunks/polyfills-c67a75d1b6f99dc8.js',
          revision: '837c0df77fd5009c9e46d446188ecfd0',
        },
        { url: '/world//_next/static/chunks/webpack-72f0182628967e4b.js', revision: '72f0182628967e4b' },
        { url: '/world//_next/static/css/62e91d12ad206d49.css', revision: '62e91d12ad206d49' },
        {
          url: '/world//_next/static/dbYo_BOXDqoFRh1unlnV2/_buildManifest.js',
          revision: '53b85c9faa4ed6ba1855a5bc8029e4cc',
        },
        {
          url: '/world//_next/static/dbYo_BOXDqoFRh1unlnV2/_ssgManifest.js',
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
            cacheWillUpdate: async ({ request: e, response: s, event: a, state: n }) =>
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
