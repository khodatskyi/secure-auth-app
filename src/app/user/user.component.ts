import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { DashboardInterface } from '../types/dashboard.interface';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit, OnDestroy {
  dashboard: DashboardInterface[] = [];
  isLoading$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private apiService: ApiService
  ) {
    this.isLoading$ = this.apiService.isLoading$;
  }

  ngOnInit() {
    this.apiService.dashboard$.subscribe((data) => {
      this.dashboard = data;
      console.log('this.dashboard', this.dashboard);
    });

    this.apiService.fetchDashboard();
  }

  ngOnDestroy(): void {
    this.authService.removeToken();
    this.authService.clearSession();
  }
}
