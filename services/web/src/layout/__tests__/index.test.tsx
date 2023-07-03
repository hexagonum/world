import { UserProvider } from '@auth0/nextjs-auth0/client';
import { render } from '@testing-library/react';
import { Layout } from '..';

jest.mock('next/router', () => {
  return { useRouter: jest.fn().mockResolvedValue({ asPath: '' }) };
});

describe('Layout', () => {
  it('to match snapshot', () => {
    const container = render(
      <UserProvider>
        <Layout />
      </UserProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
