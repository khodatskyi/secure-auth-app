import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component'; 
import { AuthGuardService } from './auth-guard.service';
import { AuthAdminGuardService } from './auth-admin-guard.service';
import { GraphComponent } from './shared-components/graph/graph.component';

const routes: Routes = [
  { path: '', redirectTo: '/assessments-app/login', pathMatch: 'full' },
  { path: '/assessments-app/login', component: LoginComponent },
  { path: '/assessments-app/admin', component: AdminComponent, canActivate: [AuthAdminGuardService] },
  { path: '/assessments-app/user', component: UserComponent, canActivate: [AuthGuardService] },
  { path: '/assessments-app/graph/:id', component: GraphComponent },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
