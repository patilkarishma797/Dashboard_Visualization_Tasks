import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { Metric } from '../models/metric';
import { ChartData } from '../models/chart-data';

@Injectable({
  providedIn: 'root'
})
 export class DataService {
  constructor(private http: HttpClient) {}

  // Load available metrics from mock JSON
  getMetrics(): Observable<Metric[]> {
    return this.http.get<Metric[]>('/assets/data/mock-metrics.json');
  }

  // Simulate loading chart data for a given metric
 getChartsForMetric(metricId: string, month: string = '01'): Observable<ChartData[]> {
  const allMockData: { [key: string]: { [key: string]: ChartData[] } } = {
    sales: {
      '01': [
        {
          id: 'sales-jan-bar',
          name: 'January Sales',
          type: 'bar',
          data: [
            { name: 'Product A', value: 120 },
            { name: 'Product B', value: 90 },
            { name: 'Product C', value: 150 }
          ]
        },
        {
          id: 'sales-jan-pie',
          name: 'Revenue Split',
          type: 'pie',
          data: [
            { name: 'Online', value: 60 },
            { name: 'Retail', value: 40 }
          ]
        }
      ],
      '02': [
        {
          id: 'sales-feb-bar',
          name: 'February Sales',
          type: 'bar',
          data: [
            { name: 'Product A', value: 100 },
            { name: 'Product B', value: 110 },
            { name: 'Product C', value: 130 }
          ]
        }
      ],
      '03': [
        {
          id: 'sales-mar-bar',
          name: 'March Sales',
          type: 'bar',
          data: [
            { name: 'Product A', value: 130 },
            { name: 'Product B', value: 95 },
            { name: 'Product C', value: 160 }
          ]
        }
      ],
      '04': [
        {
          id: 'sales-apr-pie',
          name: 'Q1 Summary',
          type: 'pie',
          data: [
            { name: 'North', value: 35 },
            { name: 'South', value: 25 },
            { name: 'East', value: 20 },
            { name: 'West', value: 20 }
          ]
        }
      ],
      '05': [
        {
          id: 'sales-may-bar',
          name: 'May Sales',
          type: 'bar',
          data: [
            { name: 'Product A', value: 150 },
            { name: 'Product B', value: 125 },
            { name: 'Product C', value: 170 }
          ]
        }
      ],
      '06': [
        {
          id: 'sales-jun-bar',
          name: 'June Revenue',
          type: 'bar',
          data: [
            { name: 'Online', value: 200 },
            { name: 'Retail', value: 180 }
          ]
        }
      ],
      '07': [
        {
          id: 'sales-jul-pie',
          name: 'Customer Segments',
          type: 'pie',
          data: [
            { name: 'New', value: 45 },
            { name: 'Returning', value: 55 }
          ]
        }
      ],
      '08': [
        {
          id: 'sales-aug-bar',
          name: 'August Sales',
          type: 'bar',
          data: [
            { name: 'Product A', value: 160 },
            { name: 'Product B', value: 140 },
            { name: 'Product C', value: 180 }
          ]
        }
      ],
      '09': [
        {
          id: 'sales-sep-bar',
          name: 'Seasonal Trend',
          type: 'bar',
          data: [
            { name: 'Festive', value: 220 },
            { name: 'Regular', value: 130 }
          ]
        }
      ],
      '10': [
        {
          id: 'sales-oct-pie',
          name: 'Sales Distribution',
          type: 'pie',
          data: [
            { name: 'E-commerce', value: 70 },
            { name: 'In-store', value: 30 }
          ]
        }
      ],
      '11': [
        {
          id: 'sales-nov-bar',
          name: 'Black Friday Sales',
          type: 'bar',
          data: [
            { name: 'Product A', value: 300 },
            { name: 'Product B', value: 280 },
            { name: 'Product C', value: 310 }
          ]
        }
      ],
      '12': [
        {
          id: 'sales-dec-bar',
          name: 'Holiday Season',
          type: 'bar',
          data: [
            { name: 'Gifts', value: 400 },
            { name: 'Essentials', value: 350 }
          ]
        }
      ]
    },
    engagement: {
      '01': [
        {
          id: 'eng-jan-line',
          name: 'User Growth',
          type: 'line',
          data: [
            {
              name: 'Users',
              series: [
                { name: 'Week 1', value: 100 },
                { name: 'Week 2', value: 200 },
                { name: 'Week 3', value: 300 }
              ]
            }
          ]
        }
      ],
      '02': [
        {
          id: 'eng-feb-pie',
          name: 'Active vs Inactive',
          type: 'pie',
          data: [
            { name: 'Active', value: 60 },
            { name: 'Inactive', value: 40 }
          ]
        }
      ],
      '03': [
        {
          id: 'eng-mar-line',
          name: 'Login Trends',
          type: 'line',
          data: [
            {
              name: 'Logins',
              series: [
                { name: 'Week 1', value: 150 },
                { name: 'Week 2', value: 130 },
                { name: 'Week 3', value: 170 }
              ]
            }
          ]
        }
      ],
      '04': [
        {
          id: 'eng-apr-pie',
          name: 'Session Time Split',
          type: 'pie',
          data: [
            { name: '<5 mins', value: 25 },
            { name: '5-15 mins', value: 50 },
            { name: '>15 mins', value: 25 }
          ]
        }
      ],
      '05': [
        {
          id: 'eng-may-bar',
          name: 'Feature Clicks',
          type: 'bar',
          data: [
            { name: 'Home', value: 300 },
            { name: 'Profile', value: 200 },
            { name: 'Settings', value: 150 }
          ]
        }
      ],
      '06': [
        {
          id: 'eng-jun-line',
          name: 'Weekly Users',
          type: 'line',
          data: [
            {
              name: 'Users',
              series: [
                { name: 'Week 1', value: 200 },
                { name: 'Week 2', value: 250 }
              ]
            }
          ]
        }
      ],
      '07': [
        {
          id: 'eng-jul-pie',
          name: 'Feedback',
          type: 'pie',
          data: [
            { name: 'Positive', value: 80 },
            { name: 'Negative', value: 20 }
          ]
        }
      ],
      '08': [
        {
          id: 'eng-aug-bar',
          name: 'Engagement per Day',
          type: 'bar',
          data: [
            { name: 'Monday', value: 40 },
            { name: 'Friday', value: 80 }
          ]
        }
      ],
      '09': [
        {
          id: 'eng-sep-pie',
          name: 'Traffic Channels',
          type: 'pie',
          data: [
            { name: 'Mobile', value: 55 },
            { name: 'Desktop', value: 45 }
          ]
        }
      ],
      '10': [
        {
          id: 'eng-oct-line',
          name: 'Retention',
          type: 'line',
          data: [
            {
              name: 'Retention',
              series: [
                { name: 'Day 1', value: 60 },
                { name: 'Day 7', value: 40 }
              ]
            }
          ]
        }
      ],
      '11': [
        {
          id: 'eng-nov-bar',
          name: 'Time on App',
          type: 'bar',
          data: [
            { name: 'Morning', value: 120 },
            { name: 'Evening', value: 180 }
          ]
        }
      ],
      '12': [
        {
          id: 'eng-dec-pie',
          name: 'Content Views',
          type: 'pie',
          data: [
            { name: 'Video', value: 75 },
            { name: 'Text', value: 25 }
          ]
        }
      ]
    },
    performance: {
      '01': [
        {
          id: 'perf-jan-pie',
          name: 'System Load',
          type: 'pie',
          data: [
            { name: 'CPU', value: 30 },
            { name: 'Memory', value: 50 },
            { name: 'Disk', value: 20 }
          ]
        }
      ],
      '02': [
        {
          id: 'perf-feb-bar',
          name: 'Network Latency',
          type: 'bar',
          data: [
            { name: 'US', value: 120 },
            { name: 'EU', value: 90 }
          ]
        }
      ],
      '03': [
        {
          id: 'perf-mar-line',
          name: 'Error Rates',
          type: 'line',
          data: [
            {
              name: 'Errors',
              series: [
                { name: 'Week 1', value: 2 },
                { name: 'Week 2', value: 3 }
              ]
            }
          ]
        }
      ],
      '04': [
        {
          id: 'perf-apr-pie',
          name: 'Uptime',
          type: 'pie',
          data: [
            { name: 'Available', value: 98 },
            { name: 'Downtime', value: 2 }
          ]
        }
      ],
      '05': [
        {
          id: 'perf-may-bar',
          name: 'Build Times',
          type: 'bar',
          data: [
            { name: 'Frontend', value: 15 },
            { name: 'Backend', value: 12 }
          ]
        }
      ],
      '06': [
        {
          id: 'perf-jun-line',
          name: 'Deploy Frequency',
          type: 'line',
          data: [
            {
              name: 'Deploys',
              series: [
                { name: 'Week 1', value: 2 },
                { name: 'Week 2', value: 3 }
              ]
            }
          ]
        }
      ],
      '07': [
        {
          id: 'perf-jul-pie',
          name: 'Bug Distribution',
          type: 'pie',
          data: [
            { name: 'UI', value: 45 },
            { name: 'API', value: 30 },
            { name: 'Infra', value: 25 }
          ]
        }
      ],
      '08': [
        {
          id: 'perf-aug-bar',
          name: 'Crash Reports',
          type: 'bar',
          data: [
            { name: 'Android', value: 25 },
            { name: 'iOS', value: 20 }
          ]
        }
      ],
      '09': [
        {
          id: 'perf-sep-pie',
          name: 'Load Testing',
          type: 'pie',
          data: [
            { name: 'Pass', value: 85 },
            { name: 'Fail', value: 15 }
          ]
        }
      ],
      '10': [
        {
          id: 'perf-oct-bar',
          name: 'Code Coverage',
          type: 'bar',
          data: [
            { name: 'Unit', value: 80 },
            { name: 'E2E', value: 70 }
          ]
        }
      ],
      '11': [
        {
          id: 'perf-nov-pie',
          name: 'Infra Usage',
          type: 'pie',
          data: [
            { name: 'Prod', value: 60 },
            { name: 'Staging', value: 40 }
          ]
        }
      ],
      '12': [
        {
          id: 'perf-dec-line',
          name: 'Latency Trends',
          type: 'line',
          data: [
            {
              name: 'Latency (ms)',
              series: [
                { name: 'Week 1', value: 110 },
                { name: 'Week 2', value: 105 }
              ]
            }
          ]
        }
      ]
    }
  };

  const data = allMockData[metricId]?.[month] || [];
  return of(data);
}




}

