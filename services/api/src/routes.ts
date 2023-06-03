/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import {
  Controller,
  ValidationService,
  FieldErrors,
  ValidateError,
  TsoaRoute,
  HttpStatusCodeLiteral,
  TsoaResponse,
  fetchMiddlewares,
} from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CountriesController } from './modules/countries/countries.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CryptoController } from './modules/crypto/crypto.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CurrenciesController } from './modules/currencies/currencies.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { HealthController } from './modules/health/health.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { LanguagesController } from './modules/languages/languages.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { NewsController } from './modules/news/news.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { OrganizationsController } from './modules/organizations/organizations.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { PassportsController } from './modules/passports/passports.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TimezonesController } from './modules/timezones/timezones.controller';
import type { RequestHandler, Router } from 'express';

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
  Currency: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        updatedAt: { dataType: 'datetime', required: true },
        createdAt: { dataType: 'datetime', required: true },
        symbol: { dataType: 'string', required: true },
        name: { dataType: 'string', required: true },
        code: { dataType: 'string', required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Language: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        updatedAt: { dataType: 'datetime', required: true },
        createdAt: { dataType: 'datetime', required: true },
        name: { dataType: 'string', required: true },
        code: { dataType: 'string', required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Organization: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        updatedAt: { dataType: 'datetime', required: true },
        createdAt: { dataType: 'datetime', required: true },
        name: { dataType: 'string', required: true },
        code: { dataType: 'string', required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  'Pick_Country.CountryGoogleTrends_': {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        commonName: { dataType: 'string', required: true },
        region: { dataType: 'string', required: true },
        subregion: { dataType: 'string', required: true },
        googleTrends: { dataType: 'array', array: { dataType: 'string' }, required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Country: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        updatedAt: { dataType: 'datetime', required: true },
        createdAt: { dataType: 'datetime', required: true },
        timezones: { dataType: 'array', array: { dataType: 'string' }, required: true },
        googleTrends: { dataType: 'array', array: { dataType: 'string' }, required: true },
        googleMaps: { dataType: 'string', required: true },
        density: { dataType: 'double', required: true },
        population: { dataType: 'double', required: true },
        area: { dataType: 'double', required: true },
        flagSVG: { dataType: 'string', required: true },
        flagPNG: { dataType: 'string', required: true },
        flag: { dataType: 'string', required: true },
        subregion: { dataType: 'string', required: true },
        region: { dataType: 'string', required: true },
        borders: { dataType: 'array', array: { dataType: 'string' }, required: true },
        continents: { dataType: 'array', array: { dataType: 'string' }, required: true },
        alternativeSpellings: { dataType: 'array', array: { dataType: 'string' }, required: true },
        capital: { dataType: 'array', array: { dataType: 'string' }, required: true },
        topLevelDomains: { dataType: 'array', array: { dataType: 'string' }, required: true },
        longitude: { dataType: 'double', required: true },
        latitude: { dataType: 'double', required: true },
        startOfWeek: { dataType: 'string', required: true },
        unMember: { dataType: 'boolean', required: true },
        independent: { dataType: 'boolean', required: true },
        status: { dataType: 'string', required: true },
        fifa: { dataType: 'string', required: true },
        cioc: { dataType: 'string', required: true },
        ccn3: { dataType: 'string', required: true },
        cca3: { dataType: 'string', required: true },
        cca2: { dataType: 'string', required: true },
        officialName: { dataType: 'string', required: true },
        commonName: { dataType: 'string', required: true },
        code: { dataType: 'string', required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Coin: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        btcPrice: { dataType: 'string', required: true },
        '24hVolume': { dataType: 'string', required: true },
        coinrankingUrl: { dataType: 'string', required: true },
        lowVolume: { dataType: 'boolean', required: true },
        sparkline: { dataType: 'array', array: { dataType: 'string' }, required: true },
        rank: { dataType: 'double', required: true },
        change: { dataType: 'string', required: true },
        tier: { dataType: 'double', required: true },
        listedAt: { dataType: 'double', required: true },
        price: { dataType: 'string', required: true },
        marketCap: { dataType: 'string', required: true },
        iconUrl: { dataType: 'string', required: true },
        color: { dataType: 'string', required: true },
        name: { dataType: 'string', required: true },
        symbol: { dataType: 'string', required: true },
        uuid: { dataType: 'string', required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  HealthResponse: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: { status: { dataType: 'string', required: true } },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Article: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        content: { dataType: 'string', required: true },
        publishedAt: { dataType: 'string', required: true },
        urlToImage: { dataType: 'string', required: true },
        url: { dataType: 'string', required: true },
        description: { dataType: 'string', required: true },
        title: { dataType: 'string', required: true },
        author: { dataType: 'string', required: true },
        source: {
          dataType: 'nestedObjectLiteral',
          nestedProperties: {
            name: { dataType: 'string', required: true },
            id: { dataType: 'string', required: true },
          },
          required: true,
        },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  NewsCountry: {
    dataType: 'refAlias',
    type: {
      dataType: 'union',
      subSchemas: [
        { dataType: 'enum', enums: ['ae'] },
        { dataType: 'enum', enums: ['ar'] },
        { dataType: 'enum', enums: ['at'] },
        { dataType: 'enum', enums: ['au'] },
        { dataType: 'enum', enums: ['be'] },
        { dataType: 'enum', enums: ['bg'] },
        { dataType: 'enum', enums: ['br'] },
        { dataType: 'enum', enums: ['ca'] },
        { dataType: 'enum', enums: ['ch'] },
        { dataType: 'enum', enums: ['cn'] },
        { dataType: 'enum', enums: ['co'] },
        { dataType: 'enum', enums: ['cu'] },
        { dataType: 'enum', enums: ['cz'] },
        { dataType: 'enum', enums: ['de'] },
        { dataType: 'enum', enums: ['eg'] },
        { dataType: 'enum', enums: ['fr'] },
        { dataType: 'enum', enums: ['gb'] },
        { dataType: 'enum', enums: ['gr'] },
        { dataType: 'enum', enums: ['hk'] },
        { dataType: 'enum', enums: ['hu'] },
        { dataType: 'enum', enums: ['id'] },
        { dataType: 'enum', enums: ['ie'] },
        { dataType: 'enum', enums: ['il'] },
        { dataType: 'enum', enums: ['in'] },
        { dataType: 'enum', enums: ['it'] },
        { dataType: 'enum', enums: ['jp'] },
        { dataType: 'enum', enums: ['kr'] },
        { dataType: 'enum', enums: ['lt'] },
        { dataType: 'enum', enums: ['lv'] },
        { dataType: 'enum', enums: ['ma'] },
        { dataType: 'enum', enums: ['mx'] },
        { dataType: 'enum', enums: ['my'] },
        { dataType: 'enum', enums: ['ng'] },
        { dataType: 'enum', enums: ['nl'] },
        { dataType: 'enum', enums: ['no'] },
        { dataType: 'enum', enums: ['nz'] },
        { dataType: 'enum', enums: ['ph'] },
        { dataType: 'enum', enums: ['pl'] },
        { dataType: 'enum', enums: ['pt'] },
        { dataType: 'enum', enums: ['ro'] },
        { dataType: 'enum', enums: ['rs'] },
        { dataType: 'enum', enums: ['ru'] },
        { dataType: 'enum', enums: ['sa'] },
        { dataType: 'enum', enums: ['se'] },
        { dataType: 'enum', enums: ['sg'] },
        { dataType: 'enum', enums: ['si'] },
        { dataType: 'enum', enums: ['sk'] },
        { dataType: 'enum', enums: ['th'] },
        { dataType: 'enum', enums: ['tr'] },
        { dataType: 'enum', enums: ['tw'] },
        { dataType: 'enum', enums: ['ua'] },
        { dataType: 'enum', enums: ['us'] },
        { dataType: 'enum', enums: ['ve'] },
        { dataType: 'enum', enums: ['za'] },
      ],
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  NewsCategory: {
    dataType: 'refAlias',
    type: {
      dataType: 'union',
      subSchemas: [
        { dataType: 'enum', enums: ['business'] },
        { dataType: 'enum', enums: ['entertainment'] },
        { dataType: 'enum', enums: ['general'] },
        { dataType: 'enum', enums: ['health'] },
        { dataType: 'enum', enums: ['science'] },
        { dataType: 'enum', enums: ['sports'] },
        { dataType: 'enum', enums: ['technology'] },
      ],
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  NewsLanguage: {
    dataType: 'refAlias',
    type: {
      dataType: 'union',
      subSchemas: [
        { dataType: 'enum', enums: ['ar'] },
        { dataType: 'enum', enums: ['de'] },
        { dataType: 'enum', enums: ['en'] },
        { dataType: 'enum', enums: ['es'] },
        { dataType: 'enum', enums: ['fr'] },
        { dataType: 'enum', enums: ['he'] },
        { dataType: 'enum', enums: ['it'] },
        { dataType: 'enum', enums: ['nl'] },
        { dataType: 'enum', enums: ['no'] },
        { dataType: 'enum', enums: ['pt'] },
        { dataType: 'enum', enums: ['ru'] },
        { dataType: 'enum', enums: ['sv'] },
        { dataType: 'enum', enums: ['ud'] },
        { dataType: 'enum', enums: ['zh'] },
      ],
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Source: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        country: { ref: 'NewsCountry', required: true },
        language: { ref: 'NewsLanguage', required: true },
        category: { ref: 'NewsCategory', required: true },
        url: { dataType: 'string', required: true },
        description: { dataType: 'string', required: true },
        name: { dataType: 'string', required: true },
        id: { dataType: 'string', required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Passport: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        mobilityScore: { dataType: 'double', required: true },
        individualRank: { dataType: 'double', required: true },
        globalRank: { dataType: 'double', required: true },
        countryCode: { dataType: 'string', required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  PassportRequirement: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        requirement: { dataType: 'string', required: true },
        countryCode: { dataType: 'string', required: true },
        passportCode: { dataType: 'string', required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Timezone: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        updatedAt: { dataType: 'datetime', required: true },
        createdAt: { dataType: 'datetime', required: true },
        utcOffset: { dataType: 'string', required: true },
        offset: { dataType: 'string', required: true },
        name: { dataType: 'string', required: true },
        code: { dataType: 'string', required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: Router) {
  // ###########################################################################################################
  //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
  //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
  // ###########################################################################################################
  app.get(
    '/countries',
    ...fetchMiddlewares<RequestHandler>(CountriesController),
    ...fetchMiddlewares<RequestHandler>(CountriesController.prototype.getCountries),

    function CountriesController_getCountries(request: any, response: any, next: any) {
      const args = {};

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new CountriesController();

        const promise = controller.getCountries.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/countries/google/trends',
    ...fetchMiddlewares<RequestHandler>(CountriesController),
    ...fetchMiddlewares<RequestHandler>(CountriesController.prototype.getTrends),

    function CountriesController_getTrends(request: any, response: any, next: any) {
      const args = {};

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new CountriesController();

        const promise = controller.getTrends.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/countries/:code',
    ...fetchMiddlewares<RequestHandler>(CountriesController),
    ...fetchMiddlewares<RequestHandler>(CountriesController.prototype.getCountry),

    function CountriesController_getCountry(request: any, response: any, next: any) {
      const args = {
        code: { in: 'path', name: 'code', required: true, dataType: 'string' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new CountriesController();

        const promise = controller.getCountry.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/crypto/coins',
    ...fetchMiddlewares<RequestHandler>(CryptoController),
    ...fetchMiddlewares<RequestHandler>(CryptoController.prototype.getCoins),

    function CryptoController_getCoins(request: any, response: any, next: any) {
      const args = {};

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new CryptoController();

        const promise = controller.getCoins.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/crypto/coins/:id',
    ...fetchMiddlewares<RequestHandler>(CryptoController),
    ...fetchMiddlewares<RequestHandler>(CryptoController.prototype.getCoin),

    function CryptoController_getCoin(request: any, response: any, next: any) {
      const args = {
        id: { in: 'path', name: 'id', required: true, dataType: 'string' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new CryptoController();

        const promise = controller.getCoin.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/currencies',
    ...fetchMiddlewares<RequestHandler>(CurrenciesController),
    ...fetchMiddlewares<RequestHandler>(CurrenciesController.prototype.getCurrencies),

    function CurrenciesController_getCurrencies(request: any, response: any, next: any) {
      const args = {};

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new CurrenciesController();

        const promise = controller.getCurrencies.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/currencies/:code',
    ...fetchMiddlewares<RequestHandler>(CurrenciesController),
    ...fetchMiddlewares<RequestHandler>(CurrenciesController.prototype.getCurrency),

    function CurrenciesController_getCurrency(request: any, response: any, next: any) {
      const args = {
        code: { in: 'path', name: 'code', required: true, dataType: 'string' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new CurrenciesController();

        const promise = controller.getCurrency.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/health',
    ...fetchMiddlewares<RequestHandler>(HealthController),
    ...fetchMiddlewares<RequestHandler>(HealthController.prototype.getHealth),

    function HealthController_getHealth(request: any, response: any, next: any) {
      const args = {};

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new HealthController();

        const promise = controller.getHealth.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/languages',
    ...fetchMiddlewares<RequestHandler>(LanguagesController),
    ...fetchMiddlewares<RequestHandler>(LanguagesController.prototype.getLanguages),

    function LanguagesController_getLanguages(request: any, response: any, next: any) {
      const args = {};

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new LanguagesController();

        const promise = controller.getLanguages.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/languages/:code',
    ...fetchMiddlewares<RequestHandler>(LanguagesController),
    ...fetchMiddlewares<RequestHandler>(LanguagesController.prototype.getLanguage),

    function LanguagesController_getLanguage(request: any, response: any, next: any) {
      const args = {
        code: { in: 'path', name: 'code', required: true, dataType: 'string' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new LanguagesController();

        const promise = controller.getLanguage.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/news/headlines',
    ...fetchMiddlewares<RequestHandler>(NewsController),
    ...fetchMiddlewares<RequestHandler>(NewsController.prototype.getHeadlines),

    function NewsController_getHeadlines(request: any, response: any, next: any) {
      const args = {
        country: { in: 'query', name: 'country', ref: 'NewsCountry' },
        category: { default: 'general', in: 'query', name: 'category', ref: 'NewsCategory' },
        sources: { default: '', in: 'query', name: 'sources', dataType: 'string' },
        q: { default: '', in: 'query', name: 'q', dataType: 'string' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new NewsController();

        const promise = controller.getHeadlines.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/news/sources',
    ...fetchMiddlewares<RequestHandler>(NewsController),
    ...fetchMiddlewares<RequestHandler>(NewsController.prototype.getSources),

    function NewsController_getSources(request: any, response: any, next: any) {
      const args = {
        category: { in: 'query', name: 'category', ref: 'NewsCategory' },
        language: { in: 'query', name: 'language', ref: 'NewsLanguage' },
        country: { in: 'query', name: 'country', ref: 'NewsCountry' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new NewsController();

        const promise = controller.getSources.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/organizations',
    ...fetchMiddlewares<RequestHandler>(OrganizationsController),
    ...fetchMiddlewares<RequestHandler>(OrganizationsController.prototype.getOrganizations),

    function OrganizationsController_getOrganizations(request: any, response: any, next: any) {
      const args = {};

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new OrganizationsController();

        const promise = controller.getOrganizations.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/organizations/:code',
    ...fetchMiddlewares<RequestHandler>(OrganizationsController),
    ...fetchMiddlewares<RequestHandler>(OrganizationsController.prototype.getOrganization),

    function OrganizationsController_getOrganization(request: any, response: any, next: any) {
      const args = {
        code: { in: 'path', name: 'code', required: true, dataType: 'string' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new OrganizationsController();

        const promise = controller.getOrganization.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/passports',
    ...fetchMiddlewares<RequestHandler>(PassportsController),
    ...fetchMiddlewares<RequestHandler>(PassportsController.prototype.getPassports),

    function PassportsController_getPassports(request: any, response: any, next: any) {
      const args = {};

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new PassportsController();

        const promise = controller.getPassports.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/passports/:code',
    ...fetchMiddlewares<RequestHandler>(PassportsController),
    ...fetchMiddlewares<RequestHandler>(PassportsController.prototype.getPassport),

    function PassportsController_getPassport(request: any, response: any, next: any) {
      const args = {
        code: { in: 'path', name: 'code', required: true, dataType: 'string' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new PassportsController();

        const promise = controller.getPassport.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/timezones',
    ...fetchMiddlewares<RequestHandler>(TimezonesController),
    ...fetchMiddlewares<RequestHandler>(TimezonesController.prototype.getTimezones),

    function TimezonesController_getTimezones(request: any, response: any, next: any) {
      const args = {};

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new TimezonesController();

        const promise = controller.getTimezones.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/timezones/:code',
    ...fetchMiddlewares<RequestHandler>(TimezonesController),
    ...fetchMiddlewares<RequestHandler>(TimezonesController.prototype.getTimezone),

    function TimezonesController_getTimezone(request: any, response: any, next: any) {
      const args = {
        code: { in: 'path', name: 'code', required: true, dataType: 'string' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new TimezonesController();

        const promise = controller.getTimezone.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function isController(object: any): object is Controller {
    return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
  }

  function promiseHandler(controllerObj: any, promise: any, response: any, successStatus: any, next: any) {
    return Promise.resolve(promise)
      .then((data: any) => {
        let statusCode = successStatus;
        let headers;
        if (isController(controllerObj)) {
          headers = controllerObj.getHeaders();
          statusCode = controllerObj.getStatus() || statusCode;
        }

        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

        returnHandler(response, statusCode, data, headers);
      })
      .catch((error: any) => next(error));
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function returnHandler(response: any, statusCode?: number, data?: any, headers: any = {}) {
    if (response.headersSent) {
      return;
    }
    Object.keys(headers).forEach((name: string) => {
      response.set(name, headers[name]);
    });
    if (data && typeof data.pipe === 'function' && data.readable && typeof data._read === 'function') {
      response.status(statusCode || 200);
      data.pipe(response);
    } else if (data !== null && data !== undefined) {
      response.status(statusCode || 200).json(data);
    } else {
      response.status(statusCode || 204).end();
    }
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function responder(response: any): TsoaResponse<HttpStatusCodeLiteral, unknown> {
    return function (status, data, headers) {
      returnHandler(response, status, data, headers);
    };
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function getValidatedArgs(args: any, request: any, response: any): any[] {
    const fieldErrors: FieldErrors = {};
    const values = Object.keys(args).map((key) => {
      const name = args[key].name;
      switch (args[key].in) {
        case 'request':
          return request;
        case 'query':
          return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors, undefined, {
            noImplicitAdditionalProperties: 'throw-on-extras',
          });
        case 'queries':
          return validationService.ValidateParam(args[key], request.query, name, fieldErrors, undefined, {
            noImplicitAdditionalProperties: 'throw-on-extras',
          });
        case 'path':
          return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors, undefined, {
            noImplicitAdditionalProperties: 'throw-on-extras',
          });
        case 'header':
          return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors, undefined, {
            noImplicitAdditionalProperties: 'throw-on-extras',
          });
        case 'body':
          return validationService.ValidateParam(args[key], request.body, name, fieldErrors, undefined, {
            noImplicitAdditionalProperties: 'throw-on-extras',
          });
        case 'body-prop':
          return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.', {
            noImplicitAdditionalProperties: 'throw-on-extras',
          });
        case 'formData':
          if (args[key].dataType === 'file') {
            return validationService.ValidateParam(args[key], request.file, name, fieldErrors, undefined, {
              noImplicitAdditionalProperties: 'throw-on-extras',
            });
          } else if (args[key].dataType === 'array' && args[key].array.dataType === 'file') {
            return validationService.ValidateParam(args[key], request.files, name, fieldErrors, undefined, {
              noImplicitAdditionalProperties: 'throw-on-extras',
            });
          } else {
            return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, undefined, {
              noImplicitAdditionalProperties: 'throw-on-extras',
            });
          }
        case 'res':
          return responder(response);
      }
    });

    if (Object.keys(fieldErrors).length > 0) {
      throw new ValidateError(fieldErrors, '');
    }
    return values;
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
