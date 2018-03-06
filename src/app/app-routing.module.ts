import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ExecutionDashboardComponent } from './execution-dashboard/execution-dashboard.component';
import { BlockersDashboardComponent } from './blockers-dashboard/blockers-dashboard.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'execution', component: ExecutionDashboardComponent },
  { path: 'blockers', component: BlockersDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})

export class AppRoutingModule { }
