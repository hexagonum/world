import { render } from '@testing-library/react';
import { HomePage } from '@weather/pages';

describe('HomePage', () => {
  it('to match snapshot', () => {
    const { container } = render(<HomePage />);
    expect(container).toMatchSnapshot();
  });
});
