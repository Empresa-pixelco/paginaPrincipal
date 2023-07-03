import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { encrypt } from '../util/crypto';
import axios from 'axios';
import * as CryptoJS from 'crypto-js';
import { tokenResponses } from '../interfaces/responses.dto';
import { Categoria } from '../interfaces/categorias.model';
import { Veterinarios} from '../interfaces/veterinarios.model';
import { Calendario } from '../interfaces/calendario.model';
import { StorageService } from '.././services/storage.service';

@Injectable()
export class AuthService {
  keys= environment.key;
  ivs= environment.iv
  apiUrl = environment.apiUrl;
  isAuthenticated: boolean = false;
  isAuthenticatedVet: boolean = false;
  constructor(private dataStorageService: StorageService) { }



  checkAuthentication(): boolean {
    const token = localStorage.getItem('access_t');
    this.isAuthenticated = !!token; // Verifica si el token existe
    return this.isAuthenticated;
  }
  
  checkAuthenticationVet(): boolean {
    const token = localStorage.getItem('access_toke');
    console.log(token)
    this.isAuthenticatedVet = !!token; // Verifica si el token existe
    return this.isAuthenticatedVet;
  }

  async login(userData: object):Promise<tokenResponses> {
    // const loginData = {email, password}
    console.log(userData)
    const encripData = encrypt(userData)
    // const body = { data: encripData };
    console.log(encripData)
    try {
      const response = await axios.post(`${this.apiUrl}/auth`, encripData);
      console.log('este es el response:', response)
      console.log(response.data)
      return response.data;
    } catch (error: any) {
      throw new Error('Error al iniciar sesión');
    }
  }

  async register(userData: object): Promise<tokenResponses> {
    const token = localStorage.getItem('access_t');
    console.log(token)
    const encryptedData = encrypt(userData);
    console.log("🚀 ~ file: auth.service.ts:33 ~ AuthService ~ register ~ encryptedData:", encryptedData)
    try {
      const response = await axios.post(`${this.apiUrl}/auth/register`, encryptedData);
      return response.data;
      } catch (error) {
      throw new Error('Error al registrar usuario');
    }
  }  

// {{URL}}/api/services/staff/2PiNETB6CdlKHXJm9b3g
async servicios(): Promise<Categoria> {
  // const encryptedData = encrypt(userData);
  const response = await axios.get(`${this.apiUrl}/services/2PiNETB6CdlKHXJm9b3g`, {
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  });

  try {
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener los servicios');
  }
}  
  // const encryptedData = encrypt(userData);

async staff(codigoCategoria: string): Promise<Veterinarios[]> {
  // const encryptedData = encrypt(userData);
  const response = await axios.get(`${this.apiUrl}/services/${codigoCategoria}/sucursal/2PiNETB6CdlKHXJm9b3g/vet`);
  try {
      return response.data;
  } catch (error) { 
    throw new Error('Error al registrar usuario');
  }
}  

async staffAll(): Promise<any> {
  // const encryptedData = encrypt(userData);
  const response = await axios.get(`${this.apiUrl}/services/staff/2PiNETB6CdlKHXJm9b3g`,{
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
    });

  console.log(response)
  try {
      return response.data;
  } catch (error) { 
    throw new Error('Error al registrar usuario');
  }
}  

async calendary(codigoVeterinario: string, mes: any): Promise<Calendario> {
  // const encryptedData = encrypt(userData);
  const response = await axios.get(`${this.apiUrl}/services/turnos/2PiNETB6CdlKHXJm9b3g/${codigoVeterinario}/2023/${mes}`);
  try {
      return response.data;
  } catch (error) { 
    throw new Error('Error al registrar usuario');
  }
}
async citas(codigoVeterinario: string): Promise<any> {
  const token = localStorage.getItem('access_toke'); // Obtener el token de almacenamiento local
  console.log(codigoVeterinario)
  console.log(token)

  const response = await axios.get(`${this.apiUrl}/date/${codigoVeterinario}`,{
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  console.log(response.data)
  try {
      return response.data;
  } catch (error) { 
    throw new Error('Error al registrar usuario');
  }
}    


async turnosMes(userData: any): Promise<any> {
  const encryptedData = encrypt(userData);
  const token = localStorage.getItem('access_toke'); 
  console.log(encryptedData)
  const response = await axios.post(`${this.apiUrl}/turno`, encryptedData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  console.log(response.data.message) 
  try {
      return response;
  } catch (error) { 
    throw new Error('Error al registrar usuario');
  }
}

async obtenerTurnos(idVet: any, mes: any): Promise<any> {
  const encryptedData = encrypt(idVet);
  console.log(encryptedData)
  const response = await axios.get(`${this.apiUrl}/services/turnos/2PiNETB6CdlKHXJm9b3g/${idVet}/2023/${mes}`, encryptedData)
  
  console.log(response.data) 
  try {
      return response;
  } catch (error) { 
    throw new Error('Error al registrar usuario');
  }
}

async eliminarTurnos(datavet: any, idturno: string): Promise<any> {
  console.log(idturno)
  const token = localStorage.getItem('access_toke'); 
  const encryptedData = encrypt(datavet);
  const response = await axios.delete(`${this.apiUrl}/turno/${idturno}`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: encryptedData
  });
  
  console.log(response) 
  try {
      return response;
  } catch (error) { 
    throw new Error('Error al registrar usuario');
  }
}


async crearCita(dataCita: any, idturno: string): Promise<any> {
  console.log(idturno)
  const token = localStorage.getItem('access_t'); 
  const encryptedData = encrypt(dataCita);
  console.log(encryptedData)
  const response = await axios.post(`${this.apiUrl}/date/${idturno}`,encryptedData, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    
  });
  
  console.log(response) 
  try {
      return response;
  } catch (error) { 
    throw new Error('Error al registrar usuario');
  }
}

async TurnoPorDia(dataDia: any, idturno: string): Promise<any> {
  console.log(idturno)
  const token = localStorage.getItem('access_toke'); 
  const encryptedData = encrypt(dataDia);
  console.log(encryptedData)
  const response = await axios.patch(`${this.apiUrl}/turno/${idturno}`,encryptedData, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    
  });
  
  console.log(response) 
  try {
      return response;
  } catch (error) { 
    throw new Error('Error al registrar usuario');
  }
}

async borrarCita(idCita: string): Promise<any> {
  console.log(idCita);
  const token = localStorage.getItem('access_toke');
  console.log(token);

  try {
    const response = await axios.post(`${this.apiUrl}/date/cancel/${idCita}`, null, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log(response);
    return response;
  } catch (error) {
    throw new Error('Error al cancelar la cita');
  }
}

}