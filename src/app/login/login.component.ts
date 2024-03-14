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

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.password).subscribe(
      (response) => { 
        if (response.role === 'Admin') {
          this.authService.setRole(response.role)
          this.router.navigate(['/admin']);
        } else {
          this.authService.setRole(response.role)
          this.router.navigate(['/user']);
        }
        // Сохраняем токен пользователя в локал сторедж
        this.authService.saveToken(response.token)
      },
      (error) => {
        console.log({info: 'Данные указаны неверно!', mail: this.email, password :this.password});
        console.error('Login error', error);
        // Обработка ошибки
      }
    );
  }
}
