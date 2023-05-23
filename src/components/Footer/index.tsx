import Container from '@weather/components/Container';
import { APP_NAME } from '@weather/configs';

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
