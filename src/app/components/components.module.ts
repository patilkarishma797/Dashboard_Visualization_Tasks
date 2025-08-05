import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MetricSelectorComponent } from './metric-selector/metric-selector.component';
import { ChartWrapperComponent } from './chart-wrapper/chart-wrapper.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { DashboardStore } from './dashboard/dashboard.store';
import { ReportComponent } from './report/report.component';

import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
  declarations: [DashboardComponent,
        MetricSelectorComponent,
        ChartWrapperComponent,
        
        SidebarComponent,
                  ReportComponent

  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
       
        HttpClientModule,
        NgxChartsModule,
        // BrowserAnimationsModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatSelectModule,
        MatOptionModule,
        FormsModule,
    MatTabsModule,
    MatTableModule,
    MatSlideToggleModule,
    MatButtonModule,
    NgxChartsModule
        // BrowserAnimationsModule
  ],
  exports: [MetricSelectorComponent],
    providers: [DashboardStore],
})
export class ComponentsModule { }
