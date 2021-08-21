/* eslint-disable no-new-object */
/* eslint-disable import/no-cycle */
import React from 'react';
import Api from './Api';

export default class Login extends Api {
  login:string;

  password:string;

  id?:string | undefined

  constructor(login:string, password:string, id?:string) {
    super(id);
    this.login = login;
    this.password = password;
  }

  isLogged(setSubmitState:React.Dispatch<React.SetStateAction<any>>) {
    const dataSender = {
      login: this.login,
      password: this.password,
    };
    return this.loginApi(dataSender, setSubmitState);
  }
  addUser = async () => {
    if(!this.login || !this.password){
      return false
    }
    const dataSender = {login:this.login, password:this.password}
    return await this.addLogin(dataSender)
  }
}
