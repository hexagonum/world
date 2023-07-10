import { ONE_DAY } from '..';

describe('constants', () => {
  it('to match', () => {
    expect(ONE_DAY).toEqual(86400000);
  });
});
