import {
  Flex, Button,
} from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import Contact from '../../Entities/Contact';
import MyFormControl from '../../components/MyFormControl';
import { TokenContext } from '../../context/Token';


export default function NewClient() {
  const history = useHistory();

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [birthDate, setBirthDate] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [submitState, setSubmitState] = useState(false);
  const { authenticated } = useContext<any>(TokenContext);

  useEffect(() => {
      if (!authenticated) {
        history.push('/');
        return;
      }
  }, []);

  const onSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    const dateTreatment = moment(birthDate, 'YYYY-MM-DD').format('DD/MM/YYYY');
    const bodySend = new Contact(firstName, lastName, phone, dateTreatment, address, email);
    setSubmitState(true);
    await bodySend.addClient(setSubmitState);
  };
  return (
    <Flex flexDirection="column" w="100%" maxWidth="3xl">
      <form onSubmit={onSubmit}>
        <MyFormControl id="firstName" label="Nome" type="text" placeholder="Nome" setStateTarget={setFirstName} />
        <MyFormControl id="lastName" label="Sobrenome" type="text" placeholder="Sobrenome" setStateTarget={setLastName} />
        <MyFormControl id="phone" label="Telefone" type="text" placeholder="Telefone" setStateTarget={setPhone} />
        <MyFormControl id="birthDate" label="Data de Nasc." type="date" placeholder="Data de nascimento" setStateTarget={setBirthDate} />
        <MyFormControl id="address" label="Endereço" type="text" placeholder="Endereço" setStateTarget={setAddress} />
        <MyFormControl id="email" label="E-mail" type="email" placeholder="E-mail" setStateTarget={setEmail} />
        <Button
          bg="button.bg"
          color="button.color"
          m="0 0.2rem"
          onClick={() => history.push('/')}
        >
          Voltar
        </Button>
        <Button
          bg="button.bg"
          color="button.color"
          m="0 0.2rem"
          isLoading={submitState}
          loadingText="Enviando..."
          type="submit"
        >
          Adicionar
        </Button>
      </form>
    </Flex>
  );
}
