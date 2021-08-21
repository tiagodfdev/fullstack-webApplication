/* eslint-disable no-underscore-dangle */

import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Button, Flex } from '@chakra-ui/react';
import moment from 'moment';
import MyFormControl from '../../components/MyFormControl';
import { Icontact } from '../../types';
import Contact from '../../Entities/Contact';
import api from '../../api';
import { TokenContext } from '../../context/Token';

export default function ClientDetails() {
  const history = useHistory();

  const { id } = useParams<{id:string}>();
  const [data, setData] = useState<Contact>();
  const [isDisableEditStatus, setisDisableEditStatus] = useState(true);
  const [buttonLabel, setButtonLabel] = useState('Editar');
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
    (async () => {
      const response = await api.get(`/contact/${id}`);
      const contacts:Icontact = response.data;
      const client = new Contact(
              contacts!.firstName,
              contacts!.lastName,
              contacts!.phone,
              moment(contacts!.birthDate, 'YYYY-MM-DD HH:MM:SS').format('DD/MM/YYYY'),
              contacts!.address,
              contacts!.email,
              contacts!.id,
      );
      setData(client);
    })();
  }, [id]);

  const onSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    const bodySend = new Contact(firstName, lastName, phone, birthDate, address, email, id);
    setSubmitState(true);
    await bodySend.updClient(setSubmitState);
    history.push('/');
  };

  function editAndSubmitClick(e:React.FormEvent) {
    e.preventDefault();
    if (isDisableEditStatus) {
      setFirstName(data!.firstName);
      setLastName(data!.lastName);
      setPhone(data!.phone);
      setBirthDate(data!.birthDate);
      setAddress(data!.address);
      setEmail(data!.email);
      setisDisableEditStatus(false);
      setButtonLabel('Modificar');
      return;
    }
    if (!isDisableEditStatus) {
      onSubmit(e);
      setisDisableEditStatus(true);
      setButtonLabel('Editar');
    }
  }

  const deleteClick = async () => {
    await data!.rmClient();
    history.push('/');
  };

  return (
    <Flex
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      w="100%"
      p="0.2rem"
      m="0"
      maxWidth="3xl"
    >
      <form style={{ width: '100%' }} id="editForm">
        <MyFormControl id="firstName" label="Nome" type="text" placeholder={data?.firstName} isDisableEditStatus={isDisableEditStatus} setStateTarget={setFirstName} />
        <MyFormControl id="lastName" label="Sobrenome" type="text" placeholder={data?.lastName} isDisableEditStatus={isDisableEditStatus} setStateTarget={setLastName} />
        <MyFormControl id="phone" label="Telefone" type="text" placeholder={data?.phone} isDisableEditStatus={isDisableEditStatus} setStateTarget={setPhone} />
        <MyFormControl id="birthDate" label="Data de Nasc." type="text" placeholder={data?.birthDate} isDisableEditStatus={isDisableEditStatus} setStateTarget={setBirthDate} />
        <MyFormControl id="address" label="Endereço" type="text" placeholder={data?.address} isDisableEditStatus={isDisableEditStatus} setStateTarget={setAddress} />
        <MyFormControl id="email" label="E-mail" type="email" placeholder={data?.email} isDisableEditStatus={isDisableEditStatus} setStateTarget={setEmail} />
      </form>
      <Flex
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
      >
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
          onClick={editAndSubmitClick}
          isLoading={submitState}
        >
          {buttonLabel}
        </Button>
        <Button
          bg="button.bg"
          color="button.color"
          m="0 0.2rem"
          onClick={deleteClick}
        >
          Deletar
        </Button>
      </Flex>
    </Flex>
  );
}
