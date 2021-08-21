import React from 'react';
import { Flex, Heading } from '@chakra-ui/react';

const Header = () => (
  <Flex
    as="header"
    bottom="0"
    w="100%"
    align="center"
    justify="center"
    padding="0.4rem 0"
    bg="transparent"
    color="black"
    direction="column"
    mt="1rem"
  >
    <Flex>

      <Heading
        color="white"
        fontSize="6xl"
      >
        HOME
      </Heading>

    </Flex>
  </Flex>
);

export default Header;
