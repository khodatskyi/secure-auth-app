import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  isTableVisible = false;
  nameButton = 'Table of Users'

  constructor() {}

toggleTableVisibility() {
  this.isTableVisible = !this.isTableVisible;
  if(this.isTableVisible) {
    this.nameButton = 'Dashboard of Users'
  } else {
    this.nameButton = 'Table of Users'
  }
}
}
