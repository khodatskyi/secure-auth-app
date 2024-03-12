import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit{

  constructor(private apiService: AuthService) {}

  ngOnInit() {
    this.apiService.fetchAdminData().subscribe(
      (response) => {
        console.log('Admin data received successful', response);
      },
      (error) => {
        console.error('Admin data received error', error);
      }
    );
  }

}
