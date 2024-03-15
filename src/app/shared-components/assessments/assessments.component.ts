import { Component, OnInit, OnDestroy } from '@angular/core';
import { DashboardInterface } from '../../types/dashboard.interface';
import { ApiService } from '../../api.service'; 
import { Observable } from 'rxjs';



@Component({
  selector: 'app-assessments',
  templateUrl: './assessments.component.html',
  styleUrl: './assessments.component.scss'
})
export class AssessmentsComponent implements OnInit{

  dashboard: DashboardInterface[] = [];
  isLoading$: Observable<boolean>;

  constructor(
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

  clickOnCard(card: object) {
    console.log('Мы нажали на карточку', card);
    
  }
}
