import React from 'react';
import { Flex } from '@chakra-ui/react';

interface PageProps {
  children: React.ReactNode
}

const Main = ({ children }:PageProps) => (
  <Flex
    flexDirection="column"
    as="main"
    mb="1rem"
    w="90%"
    justify="center"
    align="center"
    bg="transparent"
  >
    {children}
  </Flex>
);
export default Main;
