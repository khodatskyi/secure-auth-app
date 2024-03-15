import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInterface } from './table/types/user.interface';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'https://user-assessment-api.vercel.app/';

  constructor(private http: HttpClient, private sessionStorageService: SessionStorageService) {}

  // Если есть сохраненный токен, то он будет добавлен в заголовки
  createHeadersWithToken(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'X-Token': !!token ? token : '',
    });
  }

  // Отправляем введенные логин и пароль на сервер
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.url + 'api/login', { email, password });
  }


  // Запрос для получения данных
  fetchAdmin(): Observable<UserInterface[]> {
    const headers = this.createHeadersWithToken();
    const url = `${this.url}api/users`;
    return this.http.get<UserInterface[]>(url, { headers: headers });
  }

  //Работа с ролью
  setRole(role: string): void {
    this.sessionStorageService.setItem('userRole', role);
  }

  getRole(): string {
    return this.sessionStorageService.getItem('userRole');
  }

  clearSession(): void {
    this.sessionStorageService.clear();
  }

  // Работа с токеном

  // Метод для сохранения токена в sessionStorage
  saveToken(token: string): void {
    // localStorage.setItem('token', token);
    this.sessionStorageService.setItem('token', token);
  }

  // Возвращает true, если токен существует
  isAuthenticated(): boolean {
    return !!this.getToken(); 
  }

  // Метод для получения токена из sessionStorage
  getToken(): string | null {
    // return localStorage.getItem('token');
    return this.sessionStorageService.getItem('token');
  }

  // Метод для удаления токена из sessionStorage
  removeToken(): void {
    this.sessionStorageService.removeItem('token');
  }
}
