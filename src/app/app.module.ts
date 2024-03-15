import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { TableModule } from './table/table.module';
import { AssessmentsComponent } from './shared-components/assessments/assessments.component';
import { GraphComponent } from './shared-components/graph/graph.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, UserComponent, AdminComponent, AssessmentsComponent, GraphComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule, BrowserAnimationsModule, TableModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
