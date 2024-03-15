import { Component, OnInit, OnDestroy } from '@angular/core';
import { DashboardInterface } from '../../types/dashboard.interface';
import { ApiService } from '../../api.service';
import { Observable, Subject  } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assessments',
  templateUrl: './assessments.component.html',
  styleUrl: './assessments.component.scss',
})
export class AssessmentsComponent implements OnInit {
  dashboard: DashboardInterface[] = [];
  isLoading$: Observable<boolean>;

  constructor(private apiService: ApiService, private router: Router) {
    this.isLoading$ = this.apiService.isLoading$;
  }

  ngOnInit() {
    this.apiService.dashboard$.subscribe((data) => {
      this.dashboard = data;
      console.log('this.dashboard', this.dashboard);
    });

    this.apiService.fetchDashboard();
  }

  clickOnCard(card: any) {
    this.apiService.fetchAssessmentsGraph(card.id)
    this.router.navigate(['/graph', card.id]);
  }
}
