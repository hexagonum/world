import Container from '@world/components/Container';
import { APP_NAME } from '@world/configs';
import Link from 'next/link';

export const Navbar: React.FC = () => {
  return (
    <nav className="border-b shadow">
      <Container>
        <div className="px-8 py-4">
          <div className="flex items-center gap-4 md:gap-8">
            <Link href="/" className="text-xl uppercase">
              {APP_NAME}
            </Link>
            <Link href="/countries">Countries</Link>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
