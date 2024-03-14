import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnDestroy{
  constructor(private authService: AuthService) {}

  ngOnDestroy(): void {
    this.authService.removeToken()
    this.authService.clearSession()
  }
}
