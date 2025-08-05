import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Metric } from '../../models/metric';
import { ChartData } from '../../models/chart-data';
import { DataService } from '../../services/data.service';
import { BehaviorSubject, Observable, of, switchMap, tap } from 'rxjs';

export interface DashboardState {
  metrics: Metric[];
  charts: ChartData[];
  selectedMetric: Metric | null;
  loading: boolean;
}

@Injectable()
export class DashboardStore extends ComponentStore<DashboardState> {
  constructor(private dataService: DataService) {
    super({
      metrics: [],
      charts: [],
      selectedMetric: null,
      loading: false
    });

    this.loadMetrics();
    this.filteredCharts$.subscribe(); // trigger chart loading on changes
  }

  // Selectors
  readonly metrics$ = this.select((state) => state.metrics);
  readonly charts$ = this.select((state) => state.charts);
  readonly loading$ = this.select((state) => state.loading);
  readonly selectedMetric$ = this.select((state) => state.selectedMetric);

  private monthSubject = new BehaviorSubject<string>('01'); // default January
  readonly month$ = this.monthSubject.asObservable();

  private colorSubject = new BehaviorSubject<string[]>(['blue']);
  readonly colors$ = this.colorSubject.asObservable();

  // Setters
  setMonthFilter(month: string) {
    this.monthSubject.next(month);
  }

  setColors(colors: string[]) {
    this.colorSubject.next(colors);
  }

  // Effects
  readonly loadMetrics = this.effect(() =>
    this.dataService.getMetrics().pipe(
      tap((metrics) => {
        this.patchState({ metrics });
        if (metrics.length > 0) {
          this.selectMetric(metrics[0]);
        }
      })
    )
  );

  readonly selectMetric = this.effect<Metric>((metric$) =>
    metric$.pipe(
      tap((metric) => this.patchState({ selectedMetric: metric }))
    )
  );

  readonly filteredCharts$ = this.select(
    this.selectedMetric$,
    this.month$,
    (metric, month) => ({ metric, month })
  ).pipe(
    switchMap(({ metric, month }) => {
      if (!metric) return of([]);
      return this.dataService.getChartsForMetric(metric.id, month);
    }),
    tap((charts) => this.patchState({ charts }))
  );
  clearMetric() {
  this.patchState({ selectedMetric: null, charts: [] });
}
}

