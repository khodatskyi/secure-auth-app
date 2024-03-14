import { DataSource } from '@angular/cdk/collections';
import { Injectable } from '@angular/core';
import { UserInterface } from '../types/user.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../../auth.service';

@Injectable()
export class UserDataSource extends DataSource<UserInterface> {
  users$ = new BehaviorSubject<UserInterface[]>([]);
  isLoading$ = new BehaviorSubject<boolean>(false);

  constructor(private apiService: AuthService) {
    super();
  }

  connect(): Observable<UserInterface[]> {
    return this.users$.asObservable();
  }

  disconnect(): void {
    this.users$.complete();
  }

  loadUsers(): any {
    this.isLoading$.next(true);
    this.apiService.fetchAdmin().subscribe((users) => {
      this.users$.next(users);
      this.isLoading$.next(false);
    });
  }
}
