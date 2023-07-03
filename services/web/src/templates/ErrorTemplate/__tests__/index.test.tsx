import { UserProvider } from '@auth0/nextjs-auth0/client';
import { render } from '@testing-library/react';
import ErrorTemplate from '..';

jest.mock('next/router', () => {
  return { useRouter: jest.fn().mockResolvedValueOnce({ asPath: '' }) };
});

describe('ErrorTemplate', () => {
  it('to match snapshot', () => {
    const container = render(
      <UserProvider>
        <ErrorTemplate />
      </UserProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
