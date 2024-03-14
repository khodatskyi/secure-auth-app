import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TableComponent } from './components/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { AuthService } from '../auth.service';
import { UserDataSource } from './services/users.dataSource';

@NgModule({
  imports: [CommonModule, MatTableModule, MatSortModule],
  declarations: [TableComponent],
  exports: [TableComponent],
  providers: [AuthService, UserDataSource],
})
export class TableModule {}