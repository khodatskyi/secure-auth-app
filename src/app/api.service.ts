import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DashboardInterface } from './types/dashboard.interface';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url = 'https://user-assessment-api.vercel.app/';

  private dashboardSubject = new BehaviorSubject<DashboardInterface[]>([]); // Поток данных о пользователях
  dashboard$ = this.dashboardSubject.asObservable(); // Общедоступный Observable для подписки на поток данных

  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();

  private graphSubject = new BehaviorSubject<any>({});
  graph$ = this.graphSubject.asObservable();

  graph = {};

  constructor(private http: HttpClient, private authService: AuthService) {}

  fetchDashboard(): void {
    this.isLoadingSubject.next(true);
    const headers = this.authService.createHeadersWithToken();
    const url = `${this.url}api/userassessments`;
    this.http.get<DashboardInterface[]>(url, { headers: headers }).subscribe(
      (response) => {
        this.dashboardSubject.next(response);
        this.isLoadingSubject.next(false);
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  fetchAssessmentsGraph(id: string | number) {
    const headers = this.authService.createHeadersWithToken();
    console.log(headers);
    const url = `${this.url}api/userassessments/graph${'?id=' + id}`;
    return this.http.get<any>(url, { headers: headers }).subscribe(
      (response) => {
        this.graphSubject.next(response);
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
}
