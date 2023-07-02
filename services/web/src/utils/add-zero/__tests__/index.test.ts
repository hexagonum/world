import { addZero } from '..';

describe('Layout', () => {
  it('to add 0', () => {
    expect(addZero(9)).toEqual('09');
  });

  it('to not add 0', () => {
    expect(addZero(10)).toEqual('10');
  });
});
