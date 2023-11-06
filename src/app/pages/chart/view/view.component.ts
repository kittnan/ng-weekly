import { Component, OnInit } from '@angular/core';
import { CalculateService } from 'src/app/https/calculate.service';
import { ChartHttpService } from 'src/app/https/chart-http.service';
import * as echarts from 'echarts';
import { combineLatestAll } from 'rxjs';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';
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

  table: any[] = [];

  temp = 1;
  constructor(
    private $calculate: CalculateService,
    private $chart: ChartHttpService,
    private $loader: NgxUiLoaderService
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      const chart1 = await this.$chart.get().toPromise();
      const chart2 = await this.$chart.get2().toPromise();
      const allDataChart = [...chart1, ...chart2];
      const max = this.avgMaxModel(allDataChart);

      const optionCharts: EChartsOption[] = allDataChart.map((a: any) => {
        const total = this.totalModel(a);
        a.yAxis[1].max = Math.ceil(total) * 1.5;
        a.yAxis[1].min = 0;
        a.yAxis[1].axisLabel = {
          color: 'rgba(0, 0, 0, 1)',
          fontWeight: 'bold',
        };
        a.xAxis[1].axisLabel = {
          color: 'rgba(0, 0, 0, 1)',
          fontWeight: 'bold',
        };

        a.yAxis[0].splitNumber = 1;
        a.yAxis[0].min = 0;
        a.yAxis[0].show = true;
        a.yAxis[0].axisLabel = {
          color: 'rgba(0, 0, 0, 1)',
          fontWeight: 'bold',
          formatter: function (param: any) {
            return '';
          },
        };

        a.xAxis[0].axisLabel = {
          color: 'rgba(0, 0, 0, 1)',
          fontWeight: 'bold',
        };

        a.legend = {
          textStyle: {
            // fontWeight: 'bold',
            fontSize: 14,
          },
          padding: [
            40, // up
            10, // right
            20, // down
            10, // left
          ],
        };
        // a.title.top = 2;
        a.series = a.series.map((s: any) => {
          if (s.type == 'bar') {
            s.barMaxWidth = 70;
            s.label = {
              // distance: 10,
              show: true,
              // offset: [0, -30],
              // position: 'center',
              // padding: [10, 10, 10, 10],
              formatter: function (param: any) {
                return param.data ? param.data + '%' : param.data;
              },
              fontSize: 14,
              color: '#000',
              width: 100,
              height: 100,
            };
            s.labelLine = {
              show: true,
            };
          }
          if (s.type == 'line') {
            if (s.name == 'ST Yield') {
              s.label = {
                show: true,
                formatter: function (param: any) {
                  return param.data ? param.data + '%' : param.data;
                },
                fontSize: 14,
                fontWeight: 'bold',
                color: '#000000',
              };
            } else if (s.name == 'Plan Yield') {
              s.label = {
                show: false,
                formatter: function (param: any) {
                  return param.data ? param.data + '%' : param.data;
                },
                fontSize: 14,
                color: '#FF0000',
              };
              s.lineStyle = {
                type: 'dashed',
                width: 1,
              };
              s.color = '#FF0000';
            } else if (s.name == 'Target Pola FM') {
              s.label = {
                show: false,
                formatter: function (param: any) {
                  return param.data ? param.data + '%' : param.data;
                },
                fontSize: 14,
                color: '#754519',
              };
              s.lineStyle = {
                type: 'dotted',
                width: 1.5,
              };
              s.color = '#00d066';
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

      this.table = this.createTable(optionCharts);
      setTimeout(() => {
        for (let index = 0; index < optionCharts.length; index++) {
          const option: EChartsOption = optionCharts[index];
          const chartContainer = document.getElementById(`chart${index}`);
          this.chartData[index] = echarts.init(chartContainer);
          this.chartData[index].setOption(option);
        }
      }, 1000);
    } catch (error) {
      console.log('🚀 ~ error:', error);
    }
  }

  createTable(options: any) {
    return options.map((option: any) => {
      const head = option.xAxis[0].data;
      const seriesLen: number = option.series.length;
      let firstColumn = [
        'Plan Yield',
        'ST Yield',
        'Pola FM',
        'Process Cause',
        'Array Cause',
        'Mat Cause',
      ];
      if (seriesLen === 7) {
        firstColumn = [
          'Plan Yield',
          'ST Yield',
          'Target Pola FM',
          'Pola FM',
          'Process Cause',
          'Array Cause',
          'Mat Cause',
        ];
      }
      // const firstColumn = option.series.map((s: any) => s.name);
      const body = firstColumn.map((f: any, i: number) => {
        const item = option.series.find((s: any) => s.name == f);
        const data = item.data.map((d: any) => (d ? d : ''));
        let newFirstColumn = [
          'Target yield',
          'Yield',
          'Polar FM',
          'KTC process',
          'Yasu array',
          'Other',
        ];
        if (seriesLen === 7) {
          newFirstColumn = [
            'Target yield',
            'Yield',
            'Target Polar FM',
            'Polar FM',
            'KTC process',
            'Yasu array',
            'Other',
          ];
        }
        return [newFirstColumn[i], ...data];
      });

      return {
        head: ['Result', ...head],
        body: body,
      };
    });
  }
  totalModel(options: any) {
    const series = options.series;
    const len = series[0].data.length;
    const arr: any = Array.from({ length: len }, (_, index) => index);
    return arr.reduce((p: any, n: any) => {
      const a = series.reduce((p2: any, n2: any) => {
        if (n2.type == 'bar') {
          const value = Number(n2.data[n]);
          p2 = p2 += value;
        }
        return p2;
      }, 0);
      a > p ? (p = a) : p;
      return p;
    }, 0);
  }
  avgMaxModel(options: any) {
    let keys = [
      'Mat Cause',
      'Array Cause',
      'Process Cause',
      'Pola FM',
      'Target Pola FM',
    ];
    const total = keys.map((key: any) => {
      const max = options.reduce((p: any, n: any) => {
        const series = n.series;
        const itemSeries = series.find((s: any) => s.name == key);
        if (itemSeries) {
          let maxNumber = Math.max(...itemSeries.data);
          if (p < maxNumber) p = maxNumber;
        }
        return p;
      }, 0);
      return {
        key: key,
        max: max,
      };
    });
    const totalSort = total.sort((a: any, b: any) => b.max - a.max);
    return totalSort[0].max;
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
  compareClass(key: any, tableBody: any, indexCol: number, value: any) {
    if (indexCol >= 1) {
      if (key == 'Yield') {
        if (Number(value) >= Number(tableBody[0][indexCol]))
          return 'text-green-500';
        if (Number(value) < Number(tableBody[0][indexCol]))
          return 'text-red-600';
      }
      if (key == 'Polar FM') {
        if (tableBody.length === 7) {
          if (Number(value) <= Number(tableBody[2][indexCol]))
            return 'text-green-500';
          if (Number(value) > Number(tableBody[2][indexCol]))
            return 'text-red-600';
        } else {
          return 'text-red-600';
        }
      }
      const foo = ['KTC process', 'Yasu array', 'Other'];
      if (foo.some((a: any) => a == key)) {
        return 'text-red-600';
      }
    }
    return '';
  }
  handleAllMax(e: any, indexY: number) {
    let value = Number(e.target.value);
    this.chartData.map((chart: ECharts) => {
      let option: any = chart.getOption();
      option.yAxis[indexY].max = value;
      chart.setOption(option, false, true);
    });
  }
  handleAllMin(e: any, indexY: number) {
    let value = Number(e.target.value);
    this.chartData.map((chart: ECharts) => {
      let option: any = chart.getOption();
      option.yAxis[indexY].min = value;
      chart.setOption(option, false, true);
    });
  }

  handleExportPDF(i: number, name: any) {
    try {
      this.$loader.start();
      setTimeout(() => {
        const doc = new jsPDF({
          orientation: 'landscape',
          unit: 'mm',
          compress: true,
          format: 'a4',
        });
        let html: any = document.getElementById(`print${i}`);
        html2canvas(html).then(function (canvas) {
          const image: any = canvas.toDataURL('png', 2);
          doc.addImage(image, 'PNG', 10, 25, 280, 150);
          doc.save(`${name}.pdf`);
        });
      }, 300);
    } catch (error) {
      console.log('🚀 ~ error:', error);
      this.$loader.stop();
      Swal.fire({
        title: 'Error',
        icon: 'error',
      });
    } finally {
      setTimeout(() => {
        this.$loader.stop();
      }, 300);
    }
  }
  handleExportIMG(i: number, name: any) {
    try {
      this.$loader.start();
      setTimeout(() => {
        let html: any = document.getElementById(`print${i}`);
        html2canvas(html, {}).then(function (canvas) {
          const image: any = canvas.toDataURL('png', 2);
          const a = document.createElement('a');
          a.setAttribute('download', `${name}.png`);
          a.setAttribute('href', image);
          a.click();
        });
      }, 300);
    } catch (error) {
      console.log('🚀 ~ error:', error);
      this.$loader.stop();
      Swal.fire({
        title: 'Error',
        icon: 'error',
      });
    } finally {
      setTimeout(() => {
        this.$loader.stop();
      }, 300);
    }
  }
}
