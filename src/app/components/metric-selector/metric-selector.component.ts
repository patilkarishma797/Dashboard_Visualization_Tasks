import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Metric } from '../../models/metric';  // Make sure this path is correct

@Component({
  selector: 'app-metric-selector',
  templateUrl: './metric-selector.component.html',
}) 
  export class MetricSelectorComponent {
  @Input() metrics: Metric[] = [];
  @Output() metricSelected = new EventEmitter<Metric>();
  
  selectedMetric?: Metric;

  onMetricChange(event: any): void {
    const selectedId = event.value;
    const selected = this.metrics.find(metric => metric.id === selectedId);
    if (selected) {
      this.selectedMetric = selected;
      this.metricSelected.emit(selected);
    }
  }
}
