import { Component, OnInit } from '@angular/core';
import { DashboardInterface } from '../../types/dashboard.interface';
import { ApiService } from '../../api.service';
import { Observable  } from 'rxjs';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-assessments',
  templateUrl: './assessments.component.html',
  styleUrl: './assessments.component.scss',
})
export class AssessmentsComponent implements OnInit {
  dashboard: DashboardInterface[] = [];
  isLoading$: Observable<boolean>;

  constructor(private apiService: ApiService, private router: Router, private location: Location) {
    this.isLoading$ = this.apiService.isLoading$;
  }

  ngOnInit() {
    this.apiService.dashboard$.subscribe((data) => {
      this.dashboard = data;
    });

    this.apiService.fetchDashboard();
  }

  clickOnCard(card: any) {
    this.apiService.fetchAssessmentsGraph(card.id)
    this.router.navigate(['/graph', card.id]);
  }

  goBack(): void {
    this.location.back();
  }
}
