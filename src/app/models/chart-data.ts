export interface ChartDataPoint {
  name: string;
  value: number;
}
export interface LineChartSeries {
  name: string;
  series: ChartDataPoint[];
}

export interface ChartData {
  id: string;
  name?: string;
   title?: string;
  type: 'bar' | 'line' | 'pie';
  data: ChartDataPoint[]| LineChartSeries[];
 
}
