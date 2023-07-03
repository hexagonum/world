import { render } from '@testing-library/react';
import { Articles } from '..';

describe('Articles', () => {
  it('to match snapshot', () => {
    const { container } = render(<Articles />);
    expect(container).toMatchSnapshot();
  });
});
