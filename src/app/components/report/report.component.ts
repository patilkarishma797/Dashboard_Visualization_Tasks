import { Component, HostListener } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Color, ScaleType } from '@swimlane/ngx-charts'; // <== add this

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent {
chartWidth = window.innerWidth < 768 ? window.innerWidth - 40 : 700;

@HostListener('window:resize')
onResize() {
  this.chartWidth = window.innerWidth < 768 ? window.innerWidth - 40 : 700;
}
    view: [number, number] = [this.chartWidth, 400];

  showMovingAvg = false;

  barChartData = [
    { name: 'Online', value: 300 },
    { name: 'Retail', value: 160 }
  ];

  lineChartData = [
    {
      name: 'Online',
      series: [
        { name: 'Week 1', value: 100 },
        { name: 'Week 2', value: 130 },
        { name: 'Week 3', value: 120 },
        { name: 'Week 4', value: 160 },
      ]
    },
    {
      name: 'Retail',
      series: [
        { name: 'Week 1', value: 80 },
        { name: 'Week 2', value: 100 },
        { name: 'Week 3', value: 90 },
        { name: 'Week 4', value: 130 },
      ]
    }
  ];

  // ✅ Static color scheme for bar and line charts
 colorScheme: Color = {
  name: 'custom',
  selectable: true,
  group: ScaleType.Ordinal,
  domain: ['#3f51b5', '#2196f3', '#00bcd4']
};

  displayedColumns: string[] = ['date', 'metricA', 'metricB', 'growth', 'channel'];

  tableData = [
    { date: '2025-08-01', metricA: 120, metricB: 100, growth: '20%', channel: 'Online' },
    { date: '2025-08-02', metricA: 100, metricB: 90, growth: '11%', channel: 'Retail' },
    { date: '2025-08-03', metricA: 130, metricB: 110, growth: '18%', channel: 'Online' }
  ];

  exportToExcel(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.tableData);
    const workbook: XLSX.WorkBook = {
      Sheets: { 'Report': worksheet },
      SheetNames: ['Report']
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    });
    const data: Blob = new Blob([excelBuffer], { type: EXCEL_TYPE });
    saveAs(data, 'report-data.xlsx');
  }
}

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
