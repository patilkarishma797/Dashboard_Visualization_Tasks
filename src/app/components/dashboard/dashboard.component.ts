import { Component, OnInit } from '@angular/core';
import { DashboardStore } from './dashboard.store';
import { Metric } from '../../models/metric';
import { ChartData ,ChartDataPoint, LineChartSeries } from 'src/app/models/chart-data';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DashboardStore]
})
 export class DashboardComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  metrics$ = this.store.metrics$;
  charts$ = this.store.charts$;
  availableColors: string[] = ['red', 'green', 'blue', 'orange', 'purple', 'cyan', 'yellow'];
  selectedColors: string[] = ['blue'];
selectedMonth: string | null = null;
selectedMetric: Metric | null = null;
  availableMonths = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' }
  ];
revenueBreakdown = { online: 0, retail: 0 };
salesBreakdown = { a: 0, b: 0, c: 0 };
userGrowthTotal = 0;
grandTotal = 0;

  constructor(public store: DashboardStore) {}

  ngOnInit(): void {
    this.charts$.subscribe((charts) => {
    this.calculateCardValues(charts || []);
  });
  }

 calculateCardValues(charts: ChartData[]) {
  this.revenueBreakdown = { online: 0, retail: 0 };
  this.salesBreakdown = { a: 0, b: 0, c: 0 };
  this.userGrowthTotal = 0;

  for (const chart of charts) {
    const name = chart.name?.toLowerCase() || '';

    // Pie chart: Revenue split
    if (chart.type === 'pie' && name.includes('revenue')) {
      const pieData = chart.data as ChartDataPoint[];
      for (const item of pieData) {
        const itemName = item.name?.toLowerCase() || '';
        if (itemName === 'online') this.revenueBreakdown.online = item.value;
        if (itemName === 'retail') this.revenueBreakdown.retail = item.value;
      }
    }

    // Bar chart: Sales breakdown
    if (chart.type === 'bar' && name.includes('sales')) {
      const barData = chart.data as ChartDataPoint[];
      for (const item of barData) {
        if (item.name.includes('A')) this.salesBreakdown.a = item.value;
        if (item.name.includes('B')) this.salesBreakdown.b = item.value;
        if (item.name.includes('C')) this.salesBreakdown.c = item.value;
      }
    }

    // Line chart: User Growth
    if (chart.type === 'line' && name.includes('user')) {
      const lineData = chart.data as LineChartSeries[];
      for (const series of lineData) {
        for (const point of series.series) {
          this.userGrowthTotal += point.value;
        }
      }
    }
  }

  this.grandTotal =
    this.revenueBreakdown.online +
    this.revenueBreakdown.retail +
    this.salesBreakdown.a +
    this.salesBreakdown.b +
    this.salesBreakdown.c +
    this.userGrowthTotal;
}



  onColorChange(): void {
    this.store.setColors(this.selectedColors);
  }

  onMetricSelected(metric: Metric | null): void {
  this.selectedMetric = metric;
  if (metric) {
    this.store.selectMetric(metric);
  } else {
    this.store.clearMetric(); // ⬅️ We’ll add this in the store
  }
}

onMonthChange(): void {
  if (this.selectedMonth) {
    this.store.setMonthFilter(this.selectedMonth);
  } else {
    this.store.setMonthFilter(''); // Clear filter
  }
}


  hasPieCharts(charts: any[]): boolean {
    return charts.some(chart => chart.type === 'pie');
  }
}
