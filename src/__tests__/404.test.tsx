import { render } from '@testing-library/react';
import { NotFoundPage } from '@world/pages/404';

describe('NotFoundPage', () => {
  it('to match snapshot', () => {
    const { container } = render(<NotFoundPage />);
    expect(container).toMatchSnapshot();
  });
});
