export const typeDefs = `#graphql
  extend type Query {
    news(country: String): News
  }

  type News {
    headlines(pageSize: Int): [Article]
    sources: [Source]
  }

  type Article {
    author: String
    title: String
    description: String
    url: String
    urlToImage: String
    publishedAt: String
    content: String
    source: Source
  }

  type Source {
    id: String
    name: String
    description: String
    url: String
    category: String
    language: String
    country: String
  }
`;
