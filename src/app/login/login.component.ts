import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private apiService: AuthService, private router: Router) {}

  login() {
    this.apiService.login(this.email, this.password).subscribe(
      (response) => {
        console.log('Login successful', response);
        if (response.role === 'Admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/user']);
        }
        // Сохраняем токен пользователя в локал сторедж
        this.apiService.saveToken(response.token)
      },
      (error) => {
        console.log({info: 'Данные указаны неверно!', mail: this.email, password :this.password});
        console.error('Login error', error);
        // Обработка ошибки
      }
    );
  }
}
