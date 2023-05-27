import { render } from '@testing-library/react';
import { CountriesPage } from '@world/pages';

describe('CountriesPage', () => {
  it('to match snapshot', () => {
    const { container } = render(<CountriesPage />);
    expect(container).toMatchSnapshot();
  });
});
