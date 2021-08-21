/* eslint-disable consistent-return */
/* eslint-disable no-alert */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Icontact, Ilogin } from '../types/index';
import api from '../api';

export default abstract class Api {
    _id:string|undefined;

    constructor(_id?:string) {
      this._id = _id;
    }

    protected deleteClient = async () => {
      const res = await api.delete(`/contact/${this._id}`);
      if (res.status >= 200 && res.status < 299) {
        return true;
      }
      if (res.status >= 300 || false) {
        return false;
      }
    };

    protected newClient = async (body:Icontact,
      setSubmitState:React.Dispatch<React.SetStateAction<boolean>>) => {
      const res = await api.post('/contact',
        body);
      if (res.status >= 200 && res.status < 299) {
        setSubmitState(false);
        return true;
      }
      if (res.status >= 400 || false) {
        setSubmitState(false);
        return false;
      }
    }

    protected updateClient = async (body:Icontact,
      setSubmitState:React.Dispatch<React.SetStateAction<boolean>>) => {
      const res = await api.patch(`/contact/${this._id}`, body);
      if (res.status >= 200 && res.status < 299) {
        setSubmitState(false);
        return true;
      }
      if (res.status >= 300 || false) {
        setSubmitState(false);
        return false;
      }
    };

    protected loginApi = async (body:Ilogin,
      setSubmitState:React.Dispatch<React.SetStateAction<any>>) => {
      const res = await api.post('/auth/login',
        body);
      if (res.status >= 200 && res.status < 299) {
        const result = res.data.token;
        setSubmitState(result);
        return res;
      }
      if (res.status >= 400 || false) {
        setSubmitState(false);
        return false;
      }
    }
    protected addLogin = async (req:Ilogin) => {
      return await api.post('/auth', req)
    }

}
