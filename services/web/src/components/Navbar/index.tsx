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
  Input,
  useDisclosure,
} from '@chakra-ui/react';
import Container from '@world/components/Container';
import { APP_NAME } from '@world/configs';
import Link from 'next/link';

export const Navbar: React.FC = () => {
  const year = new Date().getFullYear();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const links = [
    { id: 'countries', href: '/countries', name: 'Countries' },
    { id: 'currencies', href: '/currencies', name: 'Currencies' },
    { id: 'languages', href: '/languages', name: 'Languages' },
    { id: 'organizations', href: '/organizations', name: 'Organizations' },
    { id: 'passports', href: '/passports', name: 'Passports' },
    { id: 'timezones', href: '/timezones', name: 'Timezones' },
    { id: 'trends', href: '/trends', name: 'Trends' },
    { id: 'weather', href: '/weather', name: 'Weather' },
  ];

  return (
    <>
      <nav className="border-b shadow">
        <Container>
          <div className="px-8 py-4">
            <div className="flex items-center justify-between gap-4 lg:gap-8">
              <div className="flex items-center gap-4 lg:gap-8">
                <Link href="/" className="text-xl uppercase">
                  {APP_NAME}
                </Link>
                <div className="hidden lg:block">
                  <div className="flex items-center gap-2 lg:gap-4">
                    {links.map(({ id, href, name }) => {
                      return (
                        <Link key={id} href={href}>
                          {name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="block lg:hidden">
                <Button colorScheme="teal" onClick={onOpen}>
                  <HamburgerIcon />
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
            <div className="flex flex-col gap-2 lg:gap-4">
              {links.map(({ id, href, name }) => {
                return (
                  <div key={id}>
                    <Link href={href}>{name}</Link>
                  </div>
                );
              })}
            </div>
          </DrawerBody>
          <DrawerFooter>
            &copy; {year} {APP_NAME}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Navbar;
