import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth';
  private isBrowser: boolean;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  login(userName: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { userName, password }, { responseType: 'text' });
  }

  saveToken(token: string) {
    if (this.isBrowser) {
      localStorage.setItem('token', token);
    }
  }

  logout() {
  localStorage.removeItem('token');  //elimina el token
}


  isLoggedIn(): boolean {
    if (this.isBrowser) {
      return !!localStorage.getItem('token');
    }
    return false; //en el servidor no hay sesión
  }
}
