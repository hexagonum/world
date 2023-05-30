import { render } from '@testing-library/react';
import { ErrorTemplate } from '..';

describe('ErrorTemplate', () => {
  it('to match snapshot', () => {
    const { container } = render(<ErrorTemplate />);
    expect(container).toMatchSnapshot();
  });
});
