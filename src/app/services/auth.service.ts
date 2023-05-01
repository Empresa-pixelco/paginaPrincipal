import { Injectable } from '@angular/core';
import { environment } from 'src/environment';
import { encrypt } from '../util/crypto';
import axios from 'axios';
import * as CryptoJS from 'crypto-js';
import { tokenResponses } from '../interfaces/responses.dto';
@Injectable()
export class AuthService {
  keys: string= environment.key;
  ivs: string= environment.iv
  apiUrl = environment.apiUrl;
  constructor() { }

  async login(email: string, password: string) {
    const loginData = {email, password}
    const encripData = encrypt(loginData)
    const body = { data: encripData };

    try {
      const response = await axios.post(environment.apiUrl, body, {});
      const token = response.data['accessToken'];
      localStorage.setItem('jwt', token);
      return token;
    } catch (error: any) {
      throw new Error('Error al iniciar sesión', error);
    }
  }

  async register(userData: object): Promise<tokenResponses> {
    const encryptedData = encrypt(userData);
    console.log("🚀 ~ file: auth.service.ts:33 ~ AuthService ~ register ~ encryptedData:", encryptedData)
    const response = await axios.post(`http://ultravetshop.cl:3003/api/auth/register`, encryptedData);
    try {
        return response.data;
    } catch (error) {
      throw new Error('Error al registrar usuario');
    }
  }
  
}
