import {
  BASE_API,
  BASE_GRAPHQL,
  NEXT_PUBLIC_BASE_API,
  NEXT_PUBLIC_BASE_GRAPHQL,
} from '..';

describe('environments', () => {
  const baseAPI = 'http://localhost:8080/api';
  const baseGraphQL = `${baseAPI}/graphql`;

  it('to match default value', () => {
    expect(BASE_API).toEqual(baseAPI);
    expect(NEXT_PUBLIC_BASE_API).toEqual(baseAPI);
    expect(BASE_GRAPHQL).toEqual(baseGraphQL);
    expect(NEXT_PUBLIC_BASE_GRAPHQL).toEqual(baseGraphQL);
  });
});
