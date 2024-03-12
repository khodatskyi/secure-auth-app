import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'https://user-assessment-api.vercel.app/';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post<any>(this.url + 'api/login', body);
  }

  fetchUserAssessments() {
    
  }





  // Работа с токеном

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Метод для получения токена из LocalStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Метод для удаления токена из LocalStorage
  removeToken(): void {
    localStorage.removeItem('token');
  }
}
