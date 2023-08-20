import { useSession } from 'next-auth/react'
import React, { ReactNode } from 'react';
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  useColorMode,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  FormLabel,
} from '@chakra-ui/react';
import {
  FiHome,
  FiTrendingUp,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiSun,
  FiMoon,
} from 'react-icons/fi';
import { FaCar } from 'react-icons/fa';
import { IoIosConstruct } from 'react-icons/io';
import { TfiAnnouncement } from 'react-icons/tfi';
import { IconType } from 'react-icons';
import { ReactText } from 'react';
import { signOut } from "next-auth/react";

interface LinkItemProps {
    name: string;
    icon: IconType;
}
const LinkItems: Array<LinkItemProps> = [
{ name: 'Home', icon: FiHome },
{ name: 'Car', icon: FaCar },
{ name: 'Work', icon: IoIosConstruct },
{ name: 'Other', icon: TfiAnnouncement },
{ name: 'Dashboard', icon: FiTrendingUp },
];

export default function Layouts({
    children,
  }: {
    children: ReactNode;
  }) {
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
    const formBackground = useColorModeValue("gray.100", "gray.900")
    const formBorderBackground = useColorModeValue("gray.300", "gray.700")

    return (
      <Box minH="100vh" bg={formBackground}>
        <SidebarContent
          bgColor={formBackground}
          bgBorderColor={formBorderBackground}
          onClose={() => onClose}
          display={{ base: 'none', md: 'block' }}
        />
        <Drawer
          autoFocus={false}
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size="full">
          <DrawerContent>
            <SidebarContent onClose={onClose} bgColor={formBackground} bgBorderColor={formBorderBackground} />
          </DrawerContent>
        </Drawer>
        {/* mobilenav */}
        <MobileNav onOpen={onOpen} onClick={toggleColorMode} bgColor={formBackground} bgBorderColor={formBorderBackground} iconChange={colorMode} />
        <Box ml={{ base: 0, md: 60 }} p="4">
          {children}
        </Box>
      </Box>
    );
  }
  
  interface SidebarProps extends BoxProps {
    onClose: () => void;
    bgColor: string;
    bgBorderColor: string;
  }
  
  const logout = () => {
    signOut({ redirect : false});
  }

  const SidebarContent = ({ onClose, bgColor, bgBorderColor, ...rest }: SidebarProps) => {
    return (
      <Box
        transition="3s ease"
        bg={bgColor}
        borderRight="1px"
        borderRightColor={bgBorderColor}
        w={{ base: 'full', md: 60 }}
        pos="fixed"
        h="full"
        {...rest}>
        <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
          <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
            Logo
          </Text>
          <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
        </Flex>
        {LinkItems.map((link) => (
          <NavItem key={link.name} icon={link.icon} >
            {link.name}
          </NavItem>
        ))}
      </Box>
    );
  };
  
  interface NavItemProps extends FlexProps {
    icon: IconType;
    children: ReactText;
  }
  const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
    return (
      <Link href={"" + children} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: 'cyan.400',
            color: 'white',
          }}
          {...rest}>
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: 'white',
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Link>
    );
  };
  
  interface MobileProps extends FlexProps {
    onOpen: () => void;
    onClick: () => void;
    bgColor: string;
    bgBorderColor: string;
    iconChange: string;
  }

  const MobileNav = ({ onOpen, onClick, bgColor, bgBorderColor, iconChange,  ...rest }: MobileProps) => {
    return (
      <Flex
        ml={{ base: 0, md: 60 }}
        px={{ base: 4, md: 4 }}
        height="20"
        alignItems="center"
        bg={bgColor}
        borderBottomWidth="1px"
        borderBottomColor={bgBorderColor}
        justifyContent={{ base: 'space-between', md: 'flex-end' }}
        {...rest}>
        <IconButton
          display={{ base: 'flex', md: 'none' }}
          onClick={onOpen}
          variant="outline"
          aria-label="open menu"
          icon={<FiMenu />}
        />
  
        <Text
          display={{ base: 'flex', md: 'none' }}
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold">
          Logo
        </Text>
  
        <HStack spacing={{ base: '0', md: '6' }}>
          <IconButton
            size="lg"
            variant="ghost"
            aria-label="open menu"
            icon={<FiBell />}
          />
           <IconButton
            size="lg"
            variant="ghost"
            onClick={onClick}
            aria-label="open menu"
            icon={iconChange === 'light' ? <FiSun /> : <FiMoon />}
          />          
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: 'none' }}>
                <HStack>
                  <Avatar
                    size={'sm'}
                    src={
                      'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                    }
                  />
                  <VStack
                    display={{ base: 'none', md: 'flex' }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2">
                    <Text fontSize="sm">Justina Clark</Text>
                    <Text fontSize="xs" color="gray.600">
                      Admin
                    </Text>
                  </VStack>
                  <Box display={{ base: 'none', md: 'flex' }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList
                bg={bgColor}
                borderColor={bgBorderColor}>
                <MenuItem>Profile</MenuItem>
                <MenuItem>Settings</MenuItem>
                <MenuItem>Billing</MenuItem>
                <MenuDivider />
                <MenuItem onClick={logout}>Sign out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </HStack>
      </Flex>
    );
  };