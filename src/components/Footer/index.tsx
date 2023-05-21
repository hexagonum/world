export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t shadow">
      <div className="container mx-auto px-8 py-4">
        <p className="uppercase">&copy; {year} Weather</p>
      </div>
    </footer>
  );
};

export default Footer;
