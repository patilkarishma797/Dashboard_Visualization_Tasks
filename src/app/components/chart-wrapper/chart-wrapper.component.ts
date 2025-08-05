import { Component, Input } from '@angular/core';
import { ChartData, ChartDataPoint, LineChartSeries } from '../../models/chart-data';
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-chart-wrapper',
  templateUrl: './chart-wrapper.component.html',
  styleUrls: ['./chart-wrapper.component.scss']
})
 export class ChartWrapperComponent {
 @Input() chart!: ChartData;
  view: [number, number] = [500, 300];
   colorScheme: any;

  ngOnInit(): void {
    this.setColorScheme();
  }
  @Input() colors: string[] = [];

get chartColors(): any {
  return {
    domain: this.colors.length > 0 ? this.colors : ['#3366cc']  // fallback
  };
}
 setColorScheme(): void {
  switch (this.chart.type) {
    case 'pie':
      this.colorScheme = {
        domain: ['#7e57c2', '#009999'] // KPI donut colors like in screenshot
      };
      break;
    case 'bar':
      this.colorScheme = {
        domain: ['#3f51b5', '#2196f3', '#00bcd4']
      };
      break;
    case 'line':
      this.colorScheme = {
        domain: ['#9c27b0', '#673ab7', '#3f51b5']
      };
      break;
    default:
      this.colorScheme = { domain: ['#888'] };
      break;
  }
}


getTotal(data: ChartDataPoint[] | LineChartSeries[], type: string): number | null {
  if (type !== 'pie') return null;

  const pieData = data as ChartDataPoint[];
  return pieData.reduce((sum, item) => sum + item.value, 0);
}
getPercentageMet(chart: ChartData): number {
  const isChartDataPointArray = (arr: any[]): arr is ChartDataPoint[] =>
    arr.every(d => 'value' in d);

  if (isChartDataPointArray(chart.data)) {
    const met = chart.data.find(d => d.name === 'Met')?.value || 0;
    const remaining = chart.data.find(d => d.name === 'Remaining')?.value || 0;
    const total = met + remaining;
    return total ? Math.round((met / total) * 100) : 0;
  }

  return 0; // Default if not a pie chart
}

getTargetValue(chart: ChartData): number {
  const isChartDataPointArray = (arr: any[]): arr is ChartDataPoint[] =>
    arr.every(d => 'value' in d);

  if (isChartDataPointArray(chart.data)) {
    const met = chart.data.find(d => d.name === 'Met')?.value || 0;
    const remaining = chart.data.find(d => d.name === 'Remaining')?.value || 0;
    return met + remaining;
  }

  return 0;
}



}
