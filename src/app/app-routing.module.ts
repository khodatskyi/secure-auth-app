import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component'; 
import { AuthGuardService } from './auth-guard.service';
import { AuthAdminGuardService } from './auth-admin-guard.service';
import { GraphComponent } from './shared-components/graph/graph.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthAdminGuardService] },
  { path: 'user', component: UserComponent, canActivate: [AuthGuardService] },
  { path: 'graph/:id', component: GraphComponent },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
