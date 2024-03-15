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
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/user']);
        }
        // Сохраняем роль пользователя в sessionStorage
        this.authService.setRole(response.role)
        // Сохраняем токен пользователя в sessionStorage
        this.authService.saveToken(response.token)
      },
      (error) => {
        console.error('Login error', error);
      }
    );
  }
}
