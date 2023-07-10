import { BASE_API, JWT_SECRET, NODE_ENV, PORT, SALT_OR_ROUNDS } from '..';

describe('environments', () => {
  it('get env', () => {
    expect(NODE_ENV).toEqual('test');
    expect(PORT).toEqual('8080');
    expect(JWT_SECRET).toEqual('jwt-secret');
    expect(SALT_OR_ROUNDS).toEqual('10');
    expect(BASE_API).toEqual('http://localhost:8080/api');
  });
});
