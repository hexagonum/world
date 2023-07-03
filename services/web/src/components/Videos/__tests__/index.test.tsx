import { render } from '@testing-library/react';
import { Videos } from '..';

jest.mock('@apollo/client', () => {
  return {
    useQuery: jest.fn().mockResolvedValue({ loading: true }),
    gql: jest.fn(),
  };
});

describe('Videos', () => {
  it('to match snapshot', () => {
    const { container } = render(<Videos />);
    expect(container).toMatchSnapshot();
  });
});
