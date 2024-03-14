import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInterface } from './table/types/user.interface';
import { Sort } from '@angular/material/sort';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'https://user-assessment-api.vercel.app/';

  constructor(private http: HttpClient) {}

  // Если есть сохраненный токен, то он будет добавлен в заголовки
  createHeadersWithToken(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'X-Token': !!token ? token : '',
    });
  }

  // Отправляем введенные логин и пароль на сервер
  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post<any>(this.url + 'api/login', body);
  }


  // Запросы для получения данных

  fetchUserAssessments() {
    const headers = this.createHeadersWithToken();
    const url = `${this.url}api/userassessments`;
    return this.http.get<any>(url, { headers: headers });
  }

  fetchUserAssessmentsGraph(id: string) {
    const headers = this.createHeadersWithToken();
    const url = `${this.url}api/userassessments/graph${'?id=' + id}`;
    return this.http.get<any>(url, { headers: headers });
  }

  fetchAdmin(): Observable<UserInterface[]> {
    const headers = this.createHeadersWithToken();
    const url = `${this.url}api/users`;
    return this.http.get<UserInterface[]>(url, { headers: headers });
  }


  // Работа с токеном

  // Метод для сохранения токена в LocalStorage
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
