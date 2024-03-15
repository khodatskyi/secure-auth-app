import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.scss',
})
export class GraphComponent implements OnInit {
  graph$: Observable<any>;

  agreeableness: number = 0;
  drive: number = 0;
  luck: number = 0;
  openness: number = 0;

  constructor(private apiService: ApiService, private location: Location) {
    this.graph$ = this.apiService.graph$;
  }

  ngOnInit() {
    // Получаем данные с сервера
    this.apiService.graph$.subscribe((data) => {
      if (data && data.data) {
        console.log('Graph (from API):', data.data);
        localStorage.setItem('graph', JSON.stringify(data.data));
      }
    });

    // Получаем данные с локал стордеж
    const savedGraphData = localStorage.getItem('graph');
    if (savedGraphData) {
      const parsedGraphData = JSON.parse(savedGraphData);
      console.log('Graph (from localStorage):', parsedGraphData);

      this.agreeableness = parsedGraphData.agreeableness;
      this.drive = parsedGraphData.drive;
      this.luck = parsedGraphData.luck;
      this.openness = parsedGraphData.openness;
    }
  }
  
  goBack(): void {
    this.location.back();
  }
}
