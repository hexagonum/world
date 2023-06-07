export const typeDefs = `#graphql
  extend type Query {
    football: Football
  }

  type Football {
    areas: [FootballArea]
    area(id: String!): FootballArea
  }

  type FootballArea {
    id: Int
    name: String
    countryCode: String
    flag: String
    parentAreaId: Int
    parentArea: String
    competitions: [FootballCompetition]
  }

  type FootballCompetition {
    areaId: Int
    id: Int
    name: String
    code: String
    type: String
    emblem: String
    plan: String
    numberOfAvailableSeasons: Int
    lastUpdated: String
    standings: [FootballTeam]
  }

  type FootballTeam {
    areaId: Int
    competitionId: Int
    id: Int
    name: String
    shortName: String
    tld: String
    crest: String
    position: Int
    playedGames: Int
    form: String
    won: Int
    draw: Int
    lost: Int
    points: Int
    goalsFor: Int
    goalsAgainst: Int
    goalDifference: Int
    matches: [FootballMatch]
  }

  type FootballMatch {
    homeTeam: FootballTeam
    awayTeam: FootballTeam
    score: FootballScore
    utcDate: String
    status: String
    matchday: String
    stage: String
    group: String
    lastUpdated: String
  }

  type FootballScore {
    fullTime: FootballScoreTime
    halfTime: FootballScoreTime
  }

  type FootballScoreTime {
    home: Int
    away: Int
  }
`;
