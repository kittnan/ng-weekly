import { Component, OnInit } from '@angular/core';
import { CalculateService } from 'src/app/https/calculate.service';
import { ChartHttpService } from 'src/app/https/chart-http.service';
import * as echarts from 'echarts';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {
  data: any = null;
  data2: any = null;
  chartData: any = null;
  constructor(
    private $calculate: CalculateService,
    private $chart: ChartHttpService
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      // const res = await this.$calculate.group().toPromise();
      // this.data = res;
      // const foo = await this.$chart.get().toPromise();

      // let foo2: any = await this.$chart.get2().toPromise();
      // foo2 = foo2.map((a: any) => {
      //   a.series = a.series.map((s: any) => {
      //     s.label = {
      //       show: true,
      //       formatter: function (param: any) {
      //         return param.data == 0 ? '' : param.data;
      //       },
      //     };
      //     return s;
      //   });
      //   return a;
      // });
      // console.log('🚀 ~ foo2:', foo2);

      // let goo = await this.$chart.get().toPromise();
      // goo = goo.map((a: any) => {
      //   a.series = a.series.map((s: any) => {
      //     s.label = {
      //       show: true,
      //       formatter: function (param: any) {
      //         return param.data == 0 ? '' : param.data;
      //       },
      //     };
      //     return s;
      //   });
      //   return a;
      // });
      // this.data2 = goo;

      const foo1 = await this.$chart.get().toPromise();
      const foo2 = await this.$chart.get2().toPromise();
      this.chartData = [...foo1, ...foo2];
      this.chartData = this.chartData.map((a: any) => {
        a.series = a.series.map((s: any) => {
          s.label = {
            show: true,
            formatter: function (param: any) {
              return param.data == 0 ? '' : param.data;
            },
          };
          return s;
        });
        return a;
      });
      console.log('🚀 ~ this.chartData:', this.chartData);
      setTimeout(() => {
        for (let index = 0; index < this.chartData.length; index++) {
          const element = this.chartData[index];
          const chartContainer = document.getElementById(`chart${index}`);
          const myChart = echarts.init(chartContainer);
          // console.log('🚀 ~ chartContainer:', chartContainer);
          myChart.setOption(element);
        }
      }, 1000);
    } catch (error) {
      console.log('🚀 ~ error:', error);
    }
  }
}
