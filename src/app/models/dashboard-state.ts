// src/app/models/dashboard-state.model.ts

import { ChartData } from './chart-data';

export interface DashboardState {
  selectedMetricId: string | null;
  chartData: ChartData[];
  loading: boolean;
  error: string | null;
}
