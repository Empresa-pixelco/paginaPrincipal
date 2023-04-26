import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

@Injectable()
export class AuthService {

  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  // Acceder a la URL del backend

  // Utilizar la URL del backend en una llamada HTTP
  // http.get(apiUrl + '/login').subscribe(data => {
  //   // Procesar la respuesta del backend
  // });
  login(email: string, password: string): Observable<any> {
    // Encripta los datos de inicio de sesión con AES
    const encryptedData = this.encryptData({ email, password });

    // Realiza una llamada POST al endpoint de autenticación
    return this.http.post<any>(`${this.apiUrl}/api/auth`, encryptedData);
  }

  encryptData(data: any): any {
    // Implementa la encriptación AES utilizando la misma clave y vector que en el frontend
    // y retorna los datos encriptados
    // Tu implementación de encriptación AES aquí
  }
  // register(userData: any): Observable<any> {
  //   const encryptedData = this.encryptData(userData);
  //   return this.http.post<any>(this.registerUrl, encryptedData);
  // }
  
}
