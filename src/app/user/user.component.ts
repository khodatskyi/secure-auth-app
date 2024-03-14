import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit{

  data = {id:''}

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.fetchUserAssessments().subscribe(
      (response) => {
        console.log('User data received successful', response);
        // Полученый об`экт сохраняем в переменную
        this.data = response[0]
      },
      (error) => {
        console.error('User data received error', error);
        // Обработка ошибки
      }
    );
  }



  click() {
    console.log('Мы отправляем запрос');
    
    this.authService.fetchUserAssessmentsGraph(this.data.id).subscribe(
      (response) => {
        console.log('Graph received successful', response);
      },
      (error) => {
        console.error('Graph received error', error);
        // Обработка ошибки
      }
    )
  }

  ngOnDestroy(): void {
    this.authService.removeToken()
    this.authService.clearSession()
  }
}
