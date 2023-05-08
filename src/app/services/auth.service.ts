import { Injectable } from '@angular/core';
import { environment } from 'src/environment';
import { encrypt } from '../util/crypto';
import axios from 'axios';
import * as CryptoJS from 'crypto-js';
import { tokenResponses } from '../interfaces/responses.dto';
import { Categoria } from '../interfaces/categorias.model';
import { Veterinarios, VeterinariosResponse } from '../interfaces/veterinarios.model';
@Injectable()
export class AuthService {
  keys: string= environment.key;
  ivs: string= environment.iv
  apiUrl = environment.apiUrl;
  constructor() { }

  async login(userData: object):Promise<tokenResponses> {
    // const loginData = {email, password}
    console.log(userData)
    const encripData = encrypt(userData)
    // const body = { data: encripData };
    console.log(encripData)
    const response = await axios.post(`http://ultravetshop.cl:3003/api/auth`, encripData);
    console.log('este es el response:', response)
    const token = response.data['accessToken'];
    console.log('este es el token:', token)
    try {
      return response.data;
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

// {{URL}}/api/services/staff/2PiNETB6CdlKHXJm9b3g
async servicios(): Promise<Categoria> {
  // const encryptedData = encrypt(userData);
  try {
    const response = await axios.get(`http://ultravetshop.cl:3003/api/services/2PiNETB6CdlKHXJm9b3g`);
    return response.data;
  } catch (error) {
    throw new Error('Error al registrar usuario');
  }
}  

async staff(): Promise<VeterinariosResponse> {
  // const encryptedData = encrypt(userData);
  const response = await axios.get(`http://ultravetshop.cl:3003/api/services/staff/2PiNETB6CdlKHXJm9b3g`);
  try {
      return response.data;
  } catch (error) {
    throw new Error('Error al registrar usuario');
  }
}  

}
