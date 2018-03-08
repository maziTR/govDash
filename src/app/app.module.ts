import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

import { LoginComponent } from './login/login.component';
import { ExecutionDashboardComponent } from './execution-dashboard/execution-dashboard.component';
import { BlockersDashboardComponent } from './blockers-dashboard/blockers-dashboard.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { TablesService } from './tables.service';
import { AmChartsModule, AmChartsService } from "@amcharts/amcharts3-angular";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    ExecutionDashboardComponent,
    BlockersDashboardComponent,
    PieChartComponent,
    BarChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AmChartsModule
  ],
  providers: [TablesService,AmChartsService],
  bootstrap: [AppComponent]
})
export class AppModule { }