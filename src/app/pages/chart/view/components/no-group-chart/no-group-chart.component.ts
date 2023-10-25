import { Component, Input, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { ChartHttpService } from 'src/app/https/chart-http.service';
@Component({
  selector: 'app-no-group-chart',
  templateUrl: './no-group-chart.component.html',
  styleUrls: ['./no-group-chart.component.scss'],
})
export class NoGroupChartComponent implements OnInit {
  @Input() data: any;

  constructor() {}

  async ngOnInit() {
    // Get a reference to the chart container div

    setTimeout(() => {
      for (let index = 0; index < this.data.length; index++) {
        const element = this.data[index];
        const chartContainer = document.getElementById(`chart${index}`);
        const myChart = echarts.init(chartContainer);
        // console.log('🚀 ~ chartContainer:', chartContainer);
        myChart.setOption(element);
      }
    }, 0);

    // Initialize the ECharts instance
  }
}
