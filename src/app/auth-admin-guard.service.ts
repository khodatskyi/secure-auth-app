import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      const userRole = this.authService.getRole();
      if (userRole === 'Admin') {
        return true;
      } else {
        this.router.navigate(['/login']); 
        return false;
      }
    } else{
      this.router.navigate(['/login']);
      return false
    } 
  }
}