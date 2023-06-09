import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Icon,
  useDisclosure,
} from '@chakra-ui/react';
import Container from '@world/components/Container';
import { APP_NAME, YEAR } from '@world/configs';
import { LINKS } from '@world/content';
import Link from 'next/link';
import { ReactNode } from 'react';
import { FaUser } from 'react-icons/fa';

type NavbarProps = {
  searchSection: ReactNode;
};

export const Navbar: React.FC<NavbarProps> = ({ searchSection = <></> }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <nav className="border-b">
        <Container>
          <div className="px-8 py-4">
            <div className="flex items-center gap-4 md:gap-8">
              <div className="grow">
                <div className="flex items-center gap-4">
                  <div className="block md:hidden">
                    <Link href="/" className="uppercase font-semibold">
                      {APP_NAME}
                    </Link>
                  </div>
                  {searchSection}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="block md:hidden">
                  <Button colorScheme="teal" onClick={onOpen}>
                    <HamburgerIcon />
                  </Button>
                </div>
                <Button colorScheme="teal">
                  <Icon as={FaUser} />
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </nav>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader className="border-b">{APP_NAME}</DrawerHeader>
          <DrawerBody>
            <div className="py-4">
              <Accordion>
                {LINKS.map(({ id = '', icon = <></>, href = '', name = '', subpages = [] }) => {
                  return (
                    <AccordionItem key={id}>
                      <div className="flex items-center w-full">
                        <div className="grow">
                          <Link href={href}>
                            <div className="flex items-center gap-2 p-2">
                              {icon}
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
                            return (
                              <Link key={id} href={href}>
                                <div className={`flex items-center gap-2 rounded p-2`}>
                                  <div className="rounded bg-white p-2 flex items-center">{icon}</div>
                                  {name}
                                </div>
                              </Link>
                            );
                          })}
                        </AccordionPanel>
                      ) : (
                        <></>
                      )}
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </div>
          </DrawerBody>
          <DrawerFooter className="border-t">
            <div className="w-full">
              &copy; {YEAR} {APP_NAME}
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Navbar;
