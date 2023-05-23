import Footer from '@weather/components/Footer';
import Navbar from '@weather/components/Navbar';
import { ReactNode } from 'react';

export const Layout: React.FC<{ children: ReactNode }> = ({ children = <></> }) => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <main className="grow overflow-hidden">
        <div className="h-full overflow-auto">{children}</div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
