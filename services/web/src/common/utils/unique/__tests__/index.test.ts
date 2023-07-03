import { unique } from '..';

describe('unique', () => {
  it('unique number', () => {
    expect(unique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
  });

  it('unique string', () => {
    expect(unique(['1', '2', '2', '3', '3', '3'])).toEqual(['1', '2', '3']);
  });
});
