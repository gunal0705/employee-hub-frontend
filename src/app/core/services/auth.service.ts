import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private secretKey = 'Y0txqhjZ3ZZjsVEn9sWliqdAZg17Ho2y';

  private baseUrl = `${environment.apiBaseUrl}/auth`;

  constructor(private http: HttpClient) { }

  login(data: LoginRequest) {
     const encryptedData = this.encryptData(data);
    return this.http.post(`${this.baseUrl}/login`, encryptedData).pipe(tap((res: any) => {

    }));
  }

  register(data: RegisterRequest) {
    const encryptedData = this.encryptData(data);
    return this.http.post(`${this.baseUrl}/register`, encryptedData,{ responseType: 'text' }).pipe(tap((res: any) => {

    }));
  }

  encryptData(data: any) {
     const key = CryptoJS.enc.Utf8.parse(this.secretKey);
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return { data: encrypted.toString() };
}
googleLogin(idToken: string) {
  return this.http.post(`${this.baseUrl}/google-login`, { token: idToken });
}

  setToken(token: string) {
    localStorage.setItem('auth_token', token);
  }

  getToken() {
    return localStorage.getItem('auth_token');
  }

  // clearToken() {
  //   localStorage.removeItem('auth_token');
  // }

  isLoggedIn() {
    return !!this.getToken();
  }

  isAdmin() {
    const token = this.getToken();
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.roles?.includes('ADMIN');
    } catch (e) {
      return false;
    }
  }
}
