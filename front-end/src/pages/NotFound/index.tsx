import {
    Flex, Heading,
  } from '@chakra-ui/react';
  import React, { useContext, useEffect } from 'react';
  import { useHistory } from 'react-router-dom';
  import { TokenContext } from '../../context/Token';
  
  
  export default function NewClient() {
    const history = useHistory();
    const { authenticated } = useContext<any>(TokenContext);
  
    useEffect(() => {
        if (!authenticated) {
          history.push('/');
          return;
        }
    }, []);
  

    return (
      <Flex flexDirection="column" w="100%" maxWidth="3xl">
          <Heading as='h1' >404 not found</Heading>
      </Flex>
    );
  }
  