import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

const Footer = () => (
  // eslint-disable-next-line react/jsx-filename-extension
  <Flex
    as="footer"
    bottom="0"
    w="100%"
    align="center"
    justify="center"
    padding="0.4rem 0"
    bg="transparent"
    color="black"
    direction="column"
    mt="3rem"
  >
    <Text color="white">
      Teste técnico: Tiago Freire.
    </Text>
  </Flex>
);

export default Footer;
