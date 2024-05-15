import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.scss',
})
export class GraphComponent implements OnInit, OnDestroy {
  graph$: Observable<any>;
  private graphSubscription: Subscription | undefined;

  agreeableness: number = 0;
  drive: number = 0;
  luck: number = 0;
  openness: number = 0;

  constructor(private apiService: ApiService) {
    this.graph$ = this.apiService.graph$;
  }

  ngOnInit() {
    // Получаем данные с сервера
    this.graphSubscription = this.apiService.graph$.subscribe((data) => {
      if (data && data.data) {
        this.agreeableness = data.data.agreeableness;
        this.drive = data.data.drive;
        this.luck = data.data.luck;
        this.openness = data.data.openness;

        localStorage.setItem('graph', JSON.stringify(data.data));
      }
    });

    // Получаем данные с локал стордеж
    const savedGraphData = localStorage.getItem('graph');
    if (savedGraphData) {
      const parsedGraphData = JSON.parse(savedGraphData);

      this.agreeableness = parsedGraphData.agreeableness;
      this.drive = parsedGraphData.drive;
      this.luck = parsedGraphData.luck;
      this.openness = parsedGraphData.openness;
    }
  }

  goBack(): void {
    window.history.back();
  }

  ngOnDestroy(): void {
    if (this.graphSubscription) {
      this.graphSubscription.unsubscribe();
    }
  }
}
