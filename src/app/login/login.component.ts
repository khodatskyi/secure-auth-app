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
          console.log(response.role);
          
          this.router.navigate(['/admin']);
        } else {
          console.log(response.role);
          this.router.navigate(['/user']);
        }
        // В этом месте вы можете сохранить токен и выполнить переадресацию пользователя на другую страницу
      },
      (error) => {
        console.log(this.email, this.password);
        
        console.error('Login error', error);
        // Обработка ошибки
      }
    );
  }
}
