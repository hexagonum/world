import Container from '@weather/components/Container';
import { APP_NAME } from '@weather/configs';
import Link from 'next/link';

export const Navbar: React.FC = () => {
  return (
    <nav className="border-b shadow">
      <Container>
        <div className="px-8 py-4">
          <Link href="/">
            <h1 className="uppercase font-medium">{APP_NAME}</h1>
          </Link>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
