import { OnInit, Component, OnDestroy } from '@angular/core';
import { UserDataSource } from '../services/users.dataSource';
import { AuthService } from '../../auth.service';
import { Sort } from '@angular/material/sort';
import { UserInterface } from '../types/user.interface';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'name',
    'lastName',
    'dateOfBirth',
    'education',
    'role',
    'position',
  ];

  constructor(private apiService: AuthService) {
    this.usersSubscription = new Subscription();
  }

  private usersSubscription: Subscription;
  data: UserInterface[] = [];
  dataSource = new UserDataSource(this.apiService);

  ngOnInit(): void {
    this.dataSource.loadUsers();
    this.usersSubscription = this.dataSource.users$.subscribe((users) => {
      this.data = [...users];
    });
  }

  sortChange(sort: Sort): void {
    const direction: string = sort.direction;
    const active: any = sort.active;

    // Сортируем данные
    if (direction === '' || active === '') {
      // Если сортировка отключена, загружаем данные без сортировки
      this.dataSource.loadUsers();
    } else {
      // Сортируем массив
      const sortedData = this.sortArray(this.data, active, direction);
      // Передаем отсортированый массив в поток users$
      this.dataSource.users$.next(sortedData);
    }
  }

  sortArray(
    data: UserInterface[],
    active: keyof UserInterface,
    direction: string
  ): UserInterface[] {
    // Применяем сортировку к массиву
    return data.sort((a, b) => {
      const valueA = a[active];
      const valueB = b[active];

      if (valueA < valueB) {
        return direction === 'asc' ? -1 : 1;
      } else if (valueA > valueB) {
        return direction === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }

  ngOnDestroy(): void {
    this.usersSubscription.unsubscribe();
  }
}
