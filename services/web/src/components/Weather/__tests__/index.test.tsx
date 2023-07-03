import { render } from '@testing-library/react';
import { Weather } from '..';

describe('Weather', () => {
  it('to match snapshot', () => {
    const { container } = render(
      <Weather city="" latitude={0} longitude={0} timezone={0} />
    );
    expect(container).toMatchSnapshot();
  });
});
