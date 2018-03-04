import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ExecutionDashboardComponent } from './execution-dashboard/execution-dashboard.component';
import { BlockersDashboardComponent } from './blockers-dashboard/blockers-dashboard.component';

const routes: Routes = [
  { path: '', component: ExecutionDashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'blockers', component: BlockersDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})

export class AppRoutingModule { }
