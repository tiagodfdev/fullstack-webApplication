/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState, useContext } from 'react';
import {
  Input, Button, Flex, UnorderedList, ListItem, Text,
} from '@chakra-ui/react';
import { Link, useHistory } from 'react-router-dom';
import jsUcfirst from '../../utils/firstUpperCase';
import { Icontact } from '../../types';
import api from '../../api';
import { TokenContext } from '../../context/Token';

export default function Main() {
  const history = useHistory();
  const [data, setData] = useState<Icontact[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Icontact[]>([]);
  const { handleLogout, authenticated } = useContext<any>(TokenContext);
  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  
  useEffect(() => {
    (async () => {
      const dataResponse = await api.get('/contact');
      if (dataResponse.status === 401 || !authenticated) {
        history.push('/');
        return;
      }
      history.push('/')
      setData(dataResponse.data);
    })();
  }, []);

  useEffect(() => {
    const results = data.filter((objData) => objData.firstName.toLowerCase().includes(searchTerm));
    setSearchResults(results);
  }, [searchTerm, data]);

  return (
    <Flex
      flexDirection="column"
      align="center"
      justify="center"
      w="100%"
      maxWidth="3xl"
    >
      <Flex
        flexDirection="column"
        align="center"
        justify="center"
      >
        <Link to="/new-client">
          <Button
            bg="button.bg"
            color="button.color"
          >
            + Cliente
          </Button>
        </Link>
      </Flex>
      <Flex
        p="0.2rem"
        mt="0.2rem"
        flexDirection="column"
        align="center"
        justify="center"
        bg="backgroundApp.bgList"
        w="100%"
        borderRadius="0.3rem"
      >
        <Input
          type="text"
          variant="outline"
          placeholder="Filtre por nome..."
          bg="white"
          value={searchTerm}
          onChange={handleChange}
        />
        <Flex
          w="100%"
          alignItems="center"
          justifyContent="center"
        >
          <UnorderedList
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            w="100%"
            p="0.2rem"
            m="0"
          >
            {searchResults.map((client) => (
              <ListItem
                display="flex"
                justifyContent="space-between"
                key={client.id}
                listStyleType="none"
                m="0.1rem"
                w="100%"
                color="#434343"
                backgroundColor="#e8e8e8"
                borderRadius="0.3rem"
                p="0 0.5rem"
                fontSize="x-large"
                fontFamily="Gelion Regular"
                fontWeight="400"
              >
                <Text>
                  {jsUcfirst(client.firstName)}
                </Text>
                <Link to={`/client/${client.id}`}>
                  <Text
                    fontSize="large"
                    fontWeight="extrabold"
                    textAlign="center"
                    letterSpacing="widest"
                  >
                    ...
                  </Text>
                </Link>
              </ListItem>
            ))}
          </UnorderedList>
        </Flex>
      </Flex>
      <Button
        bg="button.bg"
        color="button.color"
        m="0 0.2rem"
        mt="0.2rem"
        type="submit"
        onClick={() => {
          handleLogout();
          history.push('/login');
        }}
      >
        Logout
      </Button>
    </Flex>
  );
}
