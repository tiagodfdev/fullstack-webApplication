/* eslint-disable @typescript-eslint/no-use-before-define */
import {
  Flex, Button,
} from '@chakra-ui/react';
import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import MyFormControl from '../../components/MyFormControl';
import Login from '../../Entities/Login';
import { TokenContext } from '../../context/Token';

export default function LoginPage() {
  const history = useHistory();
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  // const [isAuth, setIsAuth] = useState<boolean>(false);
  const { handleLogin } = useContext<any>(TokenContext);

  const onSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    const bodySend = new Login(login, password);
    const isAutenticated = await handleLogin(bodySend.login, bodySend.password);
    if (isAutenticated) {
      history.push('/');
    }
  };
  const addUser = async ()=>{
    const bodySend = new Login(login, password);
    const response = await bodySend.addUser()
    if (!response){
      console.log('usuario ou senha vazio')
    }
    alert(`Usuário ${login} criado com sucesso`)
  }
  return (
    <Flex flexDirection="column" w="100%" maxWidth="3xl">

      <form onSubmit={onSubmit}>
        <MyFormControl id="login" label="Login" type="text" placeholder="Login" setStateTarget={setLogin} />
        <MyFormControl id="password" label="Senha" type="password" placeholder="Senha" setStateTarget={setPassword} />
        <Flex 
          flexDirection='row'
          alignItems= 'center'
          justifyContent= 'center'>
        <Button
          bg="button.bg"
          color="button.color"
          m="0 0.2rem"
          type="submit"
        >
          Login
        </Button>
        <Button
          w="20"
          bg="button.bg"
          color="button.color"
          m="0 0.2rem"
          onClick={addUser}
        >
          Add User
        </Button>
        </Flex>
      </form>
    </Flex>
  );
}
