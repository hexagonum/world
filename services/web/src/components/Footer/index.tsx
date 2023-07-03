import Container from '@world/components/Container';
import { APP_NAME, YEAR } from '@world/common/constants';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t">
      <Container>
        <div className="px-8 py-4">
          <p>
            &copy; {YEAR} {APP_NAME}
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
