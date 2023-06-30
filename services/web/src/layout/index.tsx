import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Divider,
  Icon,
  Text,
} from '@chakra-ui/react';
import Navbar from '@world/components/Navbar';
import { APP_NAME, YEAR } from '@world/configs';
import { LINKS } from '@world/content';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { FaGithub } from 'react-icons/fa';

export type LayoutProps = { searchSection?: ReactNode; children?: ReactNode };

export const Layout: React.FC<LayoutProps> = ({
  searchSection = <></>,
  children = <></>,
}) => {
  const router = useRouter();
  const { asPath } = router;

  return (
    <div className="w-screen h-screen">
      <div className="flex h-full">
        <div className="hidden md:block w-full max-w-xs border-r bg-white">
          <div className="flex flex-col h-full">
            <header className="border-b">
              <div className="px-8 py-4">
                <div className="flex items-center justify-between">
                  <Text className="uppercase font-semibold">{APP_NAME}</Text>
                  <Link
                    href="https://github.com/hexagonum/world"
                    target="_blank"
                  >
                    <Button colorScheme="teal">
                      <Icon as={FaGithub} />
                    </Button>
                  </Link>
                </div>
              </div>
            </header>
            <menu className="grow overflow-hidden">
              <div className="h-full overflow-auto">
                <div className="p-8">
                  <Accordion allowMultiple>
                    {LINKS.map(({ id, icon, href, name, subpages = [] }) => {
                      const mainActive = asPath === href;
                      const mainActiveClass = mainActive
                        ? 'bg-teal-600 text-white'
                        : '';
                      return (
                        <AccordionItem key={id} border={'unset'}>
                          <div className="flex items-center w-full">
                            <div className="grow">
                              <Link href={href}>
                                <div
                                  className={`flex items-center gap-2 rounded p-2 ${mainActiveClass}`}
                                >
                                  <div className="rounded bg-white p-2 flex items-center">
                                    {icon}
                                  </div>
                                  {name}
                                </div>
                              </Link>
                            </div>
                            {subpages.length > 0 ? (
                              <AccordionButton className="w-auto">
                                <AccordionIcon />
                              </AccordionButton>
                            ) : (
                              <></>
                            )}
                          </div>
                          {subpages.length > 0 ? (
                            <AccordionPanel className="p-0">
                              {subpages.map(({ id, name, href, icon }) => {
                                const subActive = asPath === href;
                                const subActiveClass = subActive
                                  ? 'bg-teal-600 text-white'
                                  : '';
                                return (
                                  <Link key={id} href={href}>
                                    <div
                                      className={`flex items-center gap-2 rounded p-2 ${subActiveClass}`}
                                    >
                                      <div className="rounded bg-white p-2 flex items-center">
                                        {icon}
                                      </div>
                                      {name}
                                    </div>
                                  </Link>
                                );
                              })}
                              <Divider />
                            </AccordionPanel>
                          ) : (
                            <></>
                          )}
                        </AccordionItem>
                      );
                    })}
                  </Accordion>
                </div>
              </div>
            </menu>
            <footer className="border-t">
              <div className="px-8 py-4">
                <Text>
                  &copy; {YEAR} {APP_NAME}
                </Text>
              </div>
            </footer>
          </div>
        </div>
        <div className="w-full">
          <div className="flex flex-col h-full">
            <Navbar searchSection={searchSection} />
            <main className="grow overflow-hidden">
              <div className="h-full overflow-auto">{children}</div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
