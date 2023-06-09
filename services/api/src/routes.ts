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
import { CitiesController } from './modules/cities/cities.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CountriesController } from './modules/countries/countries.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CryptoController } from './modules/crypto/crypto.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CurrenciesController } from './modules/currencies/currencies.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { FootballController } from './modules/football/football.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { GoogleController } from './modules/google/google.controller';
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
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { WeatherController } from './modules/weather/weather.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { YouTubeController } from './modules/youtube/youtube.controller';
import type { RequestHandler, Router } from 'express';

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
  City: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        timezone: { dataType: 'double', required: true },
        longitude: { dataType: 'double', required: true },
        latitude: { dataType: 'double', required: true },
        cityLevel: { dataType: 'string', required: true },
        cityCode: { dataType: 'string', required: true },
        city: { dataType: 'string', required: true },
        stateLevel: { dataType: 'string', required: true },
        stateCode: { dataType: 'string', required: true },
        state: { dataType: 'string', required: true },
        subregion: { dataType: 'string', required: true },
        region: { dataType: 'string', required: true },
        countryCode: { dataType: 'string', required: true },
        id: { dataType: 'double', required: true },
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
  ForexHistory: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        to: { dataType: 'double', required: true },
        from: { dataType: 'double', required: true },
        date: { dataType: 'string', required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Area: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        parentArea: { dataType: 'string', required: true },
        parentAreaId: { dataType: 'double', required: true },
        flag: { dataType: 'string', required: true },
        countryCode: { dataType: 'string', required: true },
        name: { dataType: 'string', required: true },
        id: { dataType: 'double', required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Competition: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        lastUpdated: { dataType: 'string', required: true },
        numberOfAvailableSeasons: { dataType: 'double', required: true },
        plan: { dataType: 'string', required: true },
        emblem: { dataType: 'string', required: true },
        type: { dataType: 'string', required: true },
        code: { dataType: 'string', required: true },
        name: { dataType: 'string', required: true },
        id: { dataType: 'double', required: true },
        area: { ref: 'Area', required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Team: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        crest: { dataType: 'string', required: true },
        tla: { dataType: 'string', required: true },
        shortName: { dataType: 'string', required: true },
        name: { dataType: 'string', required: true },
        id: { dataType: 'double', required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Position: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        goalDifference: { dataType: 'double', required: true },
        goalsAgainst: { dataType: 'double', required: true },
        goalsFor: { dataType: 'double', required: true },
        points: { dataType: 'double', required: true },
        lost: { dataType: 'double', required: true },
        draw: { dataType: 'double', required: true },
        won: { dataType: 'double', required: true },
        form: { dataType: 'string', required: true },
        playedGames: { dataType: 'double', required: true },
        position: { dataType: 'double', required: true },
        team: { ref: 'Team', required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Standing: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        table: { dataType: 'array', array: { dataType: 'refAlias', ref: 'Position' }, required: true },
        type: {
          dataType: 'union',
          subSchemas: [
            { dataType: 'enum', enums: ['TOTAL'] },
            { dataType: 'enum', enums: ['HOME'] },
            { dataType: 'enum', enums: ['AWAY'] },
          ],
          required: true,
        },
        stage: { dataType: 'enum', enums: ['REGULAR_SEASON'], required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Match: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        lastUpdated: { dataType: 'string', required: true },
        group: { dataType: 'string', required: true },
        stage: { dataType: 'string', required: true },
        matchday: { dataType: 'double', required: true },
        status: { dataType: 'string', required: true },
        utcDate: { dataType: 'string', required: true },
        id: { dataType: 'double', required: true },
        score: {
          dataType: 'nestedObjectLiteral',
          nestedProperties: {
            halfTime: {
              dataType: 'nestedObjectLiteral',
              nestedProperties: {
                away: { dataType: 'double', required: true },
                home: { dataType: 'double', required: true },
              },
              required: true,
            },
            fullTime: {
              dataType: 'nestedObjectLiteral',
              nestedProperties: {
                away: { dataType: 'double', required: true },
                home: { dataType: 'double', required: true },
              },
              required: true,
            },
            duration: { dataType: 'enum', enums: ['REGULAR'], required: true },
            winner: {
              dataType: 'union',
              subSchemas: [
                { dataType: 'enum', enums: ['AWAY_TEAM'] },
                { dataType: 'enum', enums: ['HOME_TEAM'] },
              ],
              required: true,
            },
          },
          required: true,
        },
        awayTeam: { ref: 'Team', required: true },
        homeTeam: { ref: 'Team', required: true },
        competition: { ref: 'Competition', required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  GoogleTrend: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        queries: { dataType: 'array', array: { dataType: 'string' }, required: true },
        countryCode: { dataType: 'string', required: true },
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
  YouTubeCategory: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        channelId: { dataType: 'string', required: true },
        title: { dataType: 'string', required: true },
        id: { dataType: 'string', required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Thumbnail: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        height: { dataType: 'double', required: true },
        width: { dataType: 'double', required: true },
        url: { dataType: 'string', required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Thumbnails: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        maxres: { ref: 'Thumbnail', required: true },
        standard: { ref: 'Thumbnail', required: true },
        high: { ref: 'Thumbnail', required: true },
        medium: { ref: 'Thumbnail', required: true },
        default: { ref: 'Thumbnail', required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  YouTubeVideo: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        thumbnails: { ref: 'Thumbnails', required: true },
        channelTitle: { dataType: 'string', required: true },
        channelId: { dataType: 'string', required: true },
        description: { dataType: 'string', required: true },
        title: { dataType: 'string', required: true },
        id: { dataType: 'string', required: true },
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
    '/cities',
    ...fetchMiddlewares<RequestHandler>(CitiesController),
    ...fetchMiddlewares<RequestHandler>(CitiesController.prototype.getCities),

    function CitiesController_getCities(request: any, response: any, next: any) {
      const args = {
        countryCode: { default: '', in: 'query', name: 'countryCode', dataType: 'string' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new CitiesController();

        const promise = controller.getCities.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/countries',
    ...fetchMiddlewares<RequestHandler>(CountriesController),
    ...fetchMiddlewares<RequestHandler>(CountriesController.prototype.getCountries),

    function CountriesController_getCountries(request: any, response: any, next: any) {
      const args = {
        codes: { default: '', in: 'query', name: 'codes', dataType: 'string' },
        timezone: { default: '', in: 'query', name: 'timezone', dataType: 'string' },
      };

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
    '/currencies/rates',
    ...fetchMiddlewares<RequestHandler>(CurrenciesController),
    ...fetchMiddlewares<RequestHandler>(CurrenciesController.prototype.getRates),

    function CurrenciesController_getRates(request: any, response: any, next: any) {
      const args = {
        amount: { default: 1, in: 'query', name: 'amount', dataType: 'double' },
        base: { default: 'EUR', in: 'query', name: 'base', dataType: 'string' },
        to: { default: '', in: 'query', name: 'to', dataType: 'string' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new CurrenciesController();

        const promise = controller.getRates.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/currencies/history',
    ...fetchMiddlewares<RequestHandler>(CurrenciesController),
    ...fetchMiddlewares<RequestHandler>(CurrenciesController.prototype.getHistory),

    function CurrenciesController_getHistory(request: any, response: any, next: any) {
      const args = {
        amount: { default: 1, in: 'query', name: 'amount', dataType: 'double' },
        days: { default: 7, in: 'query', name: 'days', dataType: 'double' },
        from: { default: 'EUR', in: 'query', name: 'from', dataType: 'string' },
        to: { default: 'USD', in: 'query', name: 'to', dataType: 'string' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new CurrenciesController();

        const promise = controller.getHistory.apply(controller, validatedArgs as any);
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
    '/football/areas',
    ...fetchMiddlewares<RequestHandler>(FootballController),
    ...fetchMiddlewares<RequestHandler>(FootballController.prototype.getAreas),

    function FootballController_getAreas(request: any, response: any, next: any) {
      const args = {};

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new FootballController();

        const promise = controller.getAreas.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/football/areas/:areaId',
    ...fetchMiddlewares<RequestHandler>(FootballController),
    ...fetchMiddlewares<RequestHandler>(FootballController.prototype.getArea),

    function FootballController_getArea(request: any, response: any, next: any) {
      const args = {
        areaId: { in: 'path', name: 'areaId', required: true, dataType: 'string' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new FootballController();

        const promise = controller.getArea.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/football/areas/:areaId/competitions',
    ...fetchMiddlewares<RequestHandler>(FootballController),
    ...fetchMiddlewares<RequestHandler>(FootballController.prototype.getCompetitions),

    function FootballController_getCompetitions(request: any, response: any, next: any) {
      const args = {
        areaId: { in: 'path', name: 'areaId', required: true, dataType: 'string' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new FootballController();

        const promise = controller.getCompetitions.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/football/areas/:areaId/competitions/:competitionId',
    ...fetchMiddlewares<RequestHandler>(FootballController),
    ...fetchMiddlewares<RequestHandler>(FootballController.prototype.getCompetition),

    function FootballController_getCompetition(request: any, response: any, next: any) {
      const args = {
        areaId: { in: 'path', name: 'areaId', required: true, dataType: 'string' },
        competitionId: { in: 'path', name: 'competitionId', required: true, dataType: 'string' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new FootballController();

        const promise = controller.getCompetition.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/football/areas/:areaId/competitions/:competitionId/standings',
    ...fetchMiddlewares<RequestHandler>(FootballController),
    ...fetchMiddlewares<RequestHandler>(FootballController.prototype.getStandings),

    function FootballController_getStandings(request: any, response: any, next: any) {
      const args = {
        areaId: { in: 'path', name: 'areaId', required: true, dataType: 'string' },
        competitionId: { in: 'path', name: 'competitionId', required: true, dataType: 'string' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new FootballController();

        const promise = controller.getStandings.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/football/areas/:areaId/competitions/:competitionId/standings/:teamId',
    ...fetchMiddlewares<RequestHandler>(FootballController),
    ...fetchMiddlewares<RequestHandler>(FootballController.prototype.getTeam),

    function FootballController_getTeam(request: any, response: any, next: any) {
      const args = {
        areaId: { in: 'path', name: 'areaId', required: true, dataType: 'string' },
        competitionId: { in: 'path', name: 'competitionId', required: true, dataType: 'string' },
        teamId: { in: 'path', name: 'teamId', required: true, dataType: 'string' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new FootballController();

        const promise = controller.getTeam.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/football/areas/:areaId/competitions/:competitionId/standings/:teamId/matches',
    ...fetchMiddlewares<RequestHandler>(FootballController),
    ...fetchMiddlewares<RequestHandler>(FootballController.prototype.getMatches),

    function FootballController_getMatches(request: any, response: any, next: any) {
      const args = {
        areaId: { in: 'path', name: 'areaId', required: true, dataType: 'string' },
        competitionId: { in: 'path', name: 'competitionId', required: true, dataType: 'string' },
        teamId: { in: 'path', name: 'teamId', required: true, dataType: 'string' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new FootballController();

        const promise = controller.getMatches.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/google/trends',
    ...fetchMiddlewares<RequestHandler>(GoogleController),
    ...fetchMiddlewares<RequestHandler>(GoogleController.prototype.getTrends),

    function GoogleController_getTrends(request: any, response: any, next: any) {
      const args = {
        countryCode: { default: '', in: 'query', name: 'countryCode', dataType: 'string' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new GoogleController();

        const promise = controller.getTrends.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/google/ranks',
    ...fetchMiddlewares<RequestHandler>(GoogleController),
    ...fetchMiddlewares<RequestHandler>(GoogleController.prototype.getRanks),

    function GoogleController_getRanks(request: any, response: any, next: any) {
      const args = {
        limit: { default: 10, in: 'query', name: 'limit', dataType: 'double' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new GoogleController();

        const promise = controller.getRanks.apply(controller, validatedArgs as any);
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
        pageSize: { default: 10, in: 'query', name: 'pageSize', dataType: 'double' },
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
      const args = {
        limit: { default: 0, in: 'query', name: 'limit', dataType: 'double' },
      };

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
  app.get(
    '/Weather',
    ...fetchMiddlewares<RequestHandler>(WeatherController),
    ...fetchMiddlewares<RequestHandler>(WeatherController.prototype.getVideoCategories),

    function WeatherController_getVideoCategories(request: any, response: any, next: any) {
      const args = {
        latitude: { default: 0, in: 'query', name: 'latitude', dataType: 'double' },
        longitude: { default: 0, in: 'query', name: 'longitude', dataType: 'double' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new WeatherController();

        const promise = controller.getVideoCategories.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/youtube/categories',
    ...fetchMiddlewares<RequestHandler>(YouTubeController),
    ...fetchMiddlewares<RequestHandler>(YouTubeController.prototype.getVideoCategories),

    function YouTubeController_getVideoCategories(request: any, response: any, next: any) {
      const args = {
        countryCode: { default: 'US', in: 'query', name: 'countryCode', dataType: 'string' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new YouTubeController();

        const promise = controller.getVideoCategories.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/youtube/videos',
    ...fetchMiddlewares<RequestHandler>(YouTubeController),
    ...fetchMiddlewares<RequestHandler>(YouTubeController.prototype.getVideos),

    function YouTubeController_getVideos(request: any, response: any, next: any) {
      const args = {
        countryCode: { default: '', in: 'query', name: 'countryCode', dataType: 'string' },
        categoryId: { default: '', in: 'query', name: 'categoryId', dataType: 'string' },
        maxResults: { default: 50, in: 'query', name: 'maxResults', dataType: 'double' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new YouTubeController();

        const promise = controller.getVideos.apply(controller, validatedArgs as any);
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
