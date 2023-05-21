import { render } from '@testing-library/react';
import { InternalServerErrorPage } from '@weather/pages/500';

describe('InternalServerErrorPage', () => {
  it('to match snapshot', () => {
    const { container } = render(<InternalServerErrorPage />);
    expect(container).toMatchSnapshot();
  });
});
