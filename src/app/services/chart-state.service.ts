import { Injectable } from '@angular/core';
import { ChartData, ChartDataPoint } from '../models/chart-data';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChartStateService {
  constructor(private http: HttpClient) {}

   getCharts(filters: { month?: string }) {
    return this.http.get<any[]>('/assets/data/mock-charts.json');
  }


  private trafficByCity: ChartData = {
    id: 'traffic-city',
    title: 'Traffic by City',
    type: 'pie',
    data: [
      { name: 'Pune', value: 20 },
      { name: 'Mumbai', value: 30 },
      { name: 'Delhi', value: 25 },
      { name: 'Bangalore', value: 25 }
    ] as ChartDataPoint[] // 👈 Type assertion here
  };

  private trafficByVehicle: ChartData = {
    id: 'traffic-vehicle',
    title: 'Traffic by Vehicle Type',
    type: 'pie',
    data: [
      { name: 'Car', value: 40 },
      { name: 'Bike', value: 35 },
      { name: 'Bus', value: 15 },
      { name: 'Truck', value: 10 }
    ] as ChartDataPoint[] // 👈 Type assertion here
  };

  getTrafficByCity(): ChartData {
    return this.trafficByCity;
  }

  getTrafficByVehicle(): ChartData {
    return this.trafficByVehicle;
  }
}
