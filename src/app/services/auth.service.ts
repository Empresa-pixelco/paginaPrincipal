import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { encrypt } from '../util/crypto';
import axios from 'axios';
import * as CryptoJS from 'crypto-js';
import { tokenResponses } from '../interfaces/responses.dto';
import { Categoria } from '../interfaces/categorias.model';
import { Veterinarios} from '../interfaces/veterinarios.model';
import { Calendario } from '../interfaces/calendario.model';
@Injectable()
export class AuthService {
  keys= environment.key;
  ivs= environment.iv
  apiUrl = environment.apiUrl;
  constructor() { }

  async login(userData: object):Promise<tokenResponses> {
    // const loginData = {email, password}
    console.log(userData)
    const encripData = encrypt(userData)
    // const body = { data: encripData };
    console.log(encripData)
    const response = await axios.post(`${this.apiUrl}/api/auth`, encripData);
    console.log('este es el response:', response)
    const token = response.data['accessToken'];
    console.log('este es el token:', token)
    try {
      return response.data;
    } catch (error: any) {
      throw new Error('Error al iniciar sesión');
    }
  }

  async register(userData: object): Promise<tokenResponses> {
    const encryptedData = encrypt(userData);
    console.log("🚀 ~ file: auth.service.ts:33 ~ AuthService ~ register ~ encryptedData:", encryptedData)
    const response = await axios.post(`${this.apiUrl}/api/auth/register`, encryptedData);
    try {
        return response.data;
    } catch (error) {
      throw new Error('Error al registrar usuario');
    }
  }  

// {{URL}}/api/services/staff/2PiNETB6CdlKHXJm9b3g
async servicios(): Promise<Categoria> {
  // const encryptedData = encrypt(userData);
  const response = await axios.get(`${this.apiUrl}/api/services/2PiNETB6CdlKHXJm9b3g`, {
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  });

  try {
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener los servicios');
    console.log(error)
  }
}  
  // const encryptedData = encrypt(userData);

async staff(codigoCategoria: string): Promise<Veterinarios[]> {
  // const encryptedData = encrypt(userData);
  const response = await axios.get(`${this.apiUrl}/api/services/${codigoCategoria}/sucursal/2PiNETB6CdlKHXJm9b3g/vet`);
  try {
      return response.data;
  } catch (error) { 
    throw new Error('Error al registrar usuario');
  }
}  

async calendary(codigoVeterinario: string): Promise<Calendario> {
  // const encryptedData = encrypt(userData);
  const response = await axios.get(`${this.apiUrl}/api/services/turnos/2PiNETB6CdlKHXJm9b3g/${codigoVeterinario}/2023/JUNIO`);
  try {
      return response.data;
  } catch (error) { 
    throw new Error('Error al registrar usuario');
  }
}  
}