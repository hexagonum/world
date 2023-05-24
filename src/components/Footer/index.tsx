import Container from '@world/components/Container';
import { APP_NAME } from '@world/configs';

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t">
      <Container>
        <div className="px-8 py-4">
          <p>
            &copy; {year} {APP_NAME}
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
