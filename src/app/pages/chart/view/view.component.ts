import { Component, OnInit } from '@angular/core';
import { CalculateService } from 'src/app/https/calculate.service';
import { ChartHttpService } from 'src/app/https/chart-http.service';
import * as echarts from 'echarts';

type EChartsOption = echarts.EChartsOption;
type ECharts = echarts.ECharts;

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {
  data: any = null;
  data2: any = null;
  chartData: ECharts[] = [];
  chartDataOption: any = null;
  configOptionMaxMin: any;
  constructor(
    private $calculate: CalculateService,
    private $chart: ChartHttpService
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      const chart1 = await this.$chart.get().toPromise();
      const chart2 = await this.$chart.get2().toPromise();
      const allDataChart = [...chart1, ...chart2];
      const optionCharts: EChartsOption[] = allDataChart.map((a: any) => {
        a.series = a.series.map((s: any) => {
          if (s.type == 'bar') {
            s.barMaxWidth = 100;
            s.label = {
              distance: 30,
              show: true,
              offset: [0, -30],
              position: 'right',
              // padding: [10, 10, 10, 10],
              formatter: function (param: any) {
                return param.data ? param.data + '%' : param.data;
              },
              fontSize: 14,
              color: '#000',
            };
            s.labelLine = {
              show: true,
            };
          } else {
            if (s.name == 'ST Yield') {
              s.label = {
                show: true,
                formatter: function (param: any) {
                  return param.data ? param.data + '%' : param.data;
                },
                fontSize: 14,
                color: '#FF0000',
                fontWeight: 'bold',
              };
            } else if (s.name == 'Plan Yield') {
              s.label = {
                show: true,
                formatter: function (param: any) {
                  return param.data ? param.data + '%' : param.data;
                },
                fontSize: 14,
                color: '#000',
              };
              s.color = '#000';
            } else {
              s.label = {
                show: true,
                formatter: function (param: any) {
                  return param.data ? param.data + '%' : param.data;
                },
                fontSize: 14,
              };
            }
          }

          return s;
        });
        return a;
      });
      this.chartDataOption = optionCharts;
      this.configOptionMaxMin = optionCharts.map((a: any) => {
        return a.yAxis.map((b: any) => {
          return {
            max: b.max,
            min: b.min,
          };
        });
      });
      setTimeout(() => {
        for (let index = 0; index < optionCharts.length; index++) {
          const option: EChartsOption = optionCharts[index];
          const chartContainer = document.getElementById(`chart${index}`);
          this.chartData[index] = echarts.init(chartContainer);
          this.chartData[index].setOption(option);
        }
      }, 1);
    } catch (error) {
      console.log('🚀 ~ error:', error);
    }
  }
  ngAfterViewInit(): void {
    // alert();
  }

  handleMax(i: number, e: any, i_yAxis: number) {
    let value = Number(e.target.value);
    let option: any = this.chartData[i].getOption();
    option.yAxis[i_yAxis].max = value;
    this.chartData[i].setOption(option, false, true);
  }
  handleMin(i: number, e: any, i_yAxis: number) {
    let value = Number(e.target.value);
    let option: any = this.chartData[i].getOption();
    option.yAxis[i_yAxis].min = value;
    this.chartData[i].setOption(option, false, true);
  }
}
