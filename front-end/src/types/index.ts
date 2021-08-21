import React from 'react';

export interface IClient {
    name:string;
    cpf:string;
    contact:{email:string, phone:string}
    _id?:string;
}
export interface IForm {
    id:string;
    label:string;
    type:string;
    placeholder:string|undefined;
    isDisableEditStatus?:boolean;
    setStateTarget:React.Dispatch<React.SetStateAction<string>>;
}
export interface Icontact {
    firstName:string;
    lastName:string;
    phone:string;
    birthDate:string;
    address:string;
    email:string
    id?:string
}
export interface Ilogin {
    login:string;
    password:string;
}
