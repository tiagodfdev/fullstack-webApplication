import React from 'react';
import { Flex } from '@chakra-ui/react';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';

interface PageProps {
  children: React.ReactNode
}
const Layout = ({ children }:PageProps) => (
  <Flex
    flexDirection="column"
    w="100%"
    align="center"
    justify="start"
    bg="backgroundApp.bg"
    h="100vh"
  >
    <Header />
    <Main>
      {children}
    </Main>
    <Footer />
  </Flex>
);
export default Layout;
