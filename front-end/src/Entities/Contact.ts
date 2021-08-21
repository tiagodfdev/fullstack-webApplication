/* eslint-disable no-new-object */
/* eslint-disable import/no-cycle */
import React from 'react';
import Api from './Api';

export default class Contact extends Api {
  firstName:string;

  lastName:string;

  phone:string;

  birthDate:string;

  address:string;

  email:string

  id?:string | undefined

  constructor(firstName:string, lastName:string, phone:string,
    birthDate:string, address:string, email:string, id?:string) {
    super(id);
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.birthDate = birthDate;
    this.address = address;
    this.email = email;
  }

  rmClient() {
    return this.deleteClient();
  }

  addClient(setSubmitState:React.Dispatch<React.SetStateAction<boolean>>) {
    const finalObj = {
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone,
      birthDate: this.birthDate,
      address: this.address,
      email: this.email,
    };
    return this.newClient(finalObj, setSubmitState);
  }

  updClient(setSubmitState:React.Dispatch<React.SetStateAction<boolean>>) {
    const dataSender = {
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone,
      birthDate: this.birthDate,
      address: this.address,
      email: this.email,
    };
    return this.updateClient(dataSender, setSubmitState);
  }
}
