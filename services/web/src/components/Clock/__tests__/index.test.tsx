import { render } from '@testing-library/react';
import { Clock } from '..';

describe('Clock', () => {
  it('to match snapshot', () => {
    const { container } = render(<Clock />);
    expect(container).toMatchSnapshot();
  });
});
