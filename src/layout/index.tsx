import Footer from '@world/components/Footer';
import Navbar from '@world/components/Navbar';
import { ReactNode } from 'react';

export type LayoutProps = { children?: ReactNode };

export const Layout: React.FC<LayoutProps> = ({ children = <></> }) => {
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
