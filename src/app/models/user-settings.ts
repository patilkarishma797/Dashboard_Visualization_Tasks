export interface UserSettings {
  theme: string;
  preferredChartType: 'bar' | 'line' | 'pie';
  filters: Record<string, any>;
}
