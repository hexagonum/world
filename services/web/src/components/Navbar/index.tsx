import { HamburgerIcon } from '@chakra-ui/icons';
import {
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
          <DrawerHeader>{APP_NAME}</DrawerHeader>
          <DrawerBody>
            <div className="flex flex-col gap-2 md:gap-4">
              {LINKS.map(({ id, href, name }) => {
                return (
                  <div key={id}>
                    <Link href={href}>{name}</Link>
                  </div>
                );
              })}
            </div>
          </DrawerBody>
          <DrawerFooter>
            &copy; {YEAR} {APP_NAME}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Navbar;
