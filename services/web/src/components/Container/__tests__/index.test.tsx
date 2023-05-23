import { render } from '@testing-library/react';
import { Container } from '..';

describe('Container', () => {
  it('to match snapshot', () => {
    const { container } = render(<Container />);
    expect(container).toMatchSnapshot();
  });
});
