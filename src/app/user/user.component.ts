import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit, OnDestroy {

  constructor(
    private authService: AuthService,
  ) {}

  ngOnInit() {}

  ngOnDestroy(): void {
    this.authService.removeToken();
    this.authService.clearSession();
  }
}
