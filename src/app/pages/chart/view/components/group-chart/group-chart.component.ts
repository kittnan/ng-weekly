import { Component, Input, OnInit } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-group-chart',
  templateUrl: './group-chart.component.html',
  styleUrls: ['./group-chart.component.scss'],
})
export class GroupChartComponent implements OnInit {
  @Input() data: any;
  constructor() {}

  async ngOnInit() {
    // Get a reference to the chart container div

    setTimeout(() => {
      for (let index = 0; index < this.data.length; index++) {
        const element = this.data[index];
        const chartContainer = document.getElementById(`chartb${index}`);
        const myChart = echarts.init(chartContainer);
        // console.log('🚀 ~ chartContainer:', chartContainer);
        myChart.setOption(element);
      }
    }, 0);
  }

  // ngOnInit() {
  //   console.log(this.data);
  //   let calResultGroup = this.data.calResultGroup;

  //   let legend = [
  //     'Array Cause',
  //     'Process Cause',
  //     'Pola FM',
  //     'ST Yield',
  //     'Plan Yield',
  //     'Target Pola FM',
  //   ];
  //   let label_xAxis = this.data.map((d1: any) => d1.CW);
  //   let label_xData = this.data.map((d1: any) => `CW${d1.CW} \n ${d1.month}`);
  //   this.cal1(this.data, label_xAxis, legend);
  //   let label_X = [
  //     {
  //       type: 'category',
  //       data: label_xData,
  //       axisPointer: {
  //         type: 'shadow',
  //       },
  //     },
  //   ];
  //   console.log('🚀 ~ label_X:', label_X);
  //   // const foo1 = calResultGroup.map((d1: any) => {
  //   //   return {};
  //   // });

  //   // Get a reference to the chart container div
  //   const chartContainer = document.getElementById('chart-container');

  //   // Initialize the ECharts instance
  //   const myChart = echarts.init(chartContainer);

  //   // Define your chart configuration options
  //   const options: any = {
  //     tooltip: {
  //       trigger: 'axis',
  //       axisPointer: {
  //         type: 'cross',
  //         crossStyle: {
  //           color: '#999',
  //         },
  //       },
  //     },
  //     toolbox: {
  //       feature: {
  //         dataView: { show: true, readOnly: false },
  //         magicType: { show: true, type: ['line', 'bar'] },
  //         restore: { show: true },
  //         saveAsImage: { show: true },
  //       },
  //     },
  //     legend: {
  //       data: ['Evaporation', 'Evaporation2', 'Temperature'],
  //     },
  //     xAxis: [
  //       {
  //         type: 'category',
  //         data: ['CW30', 'CW31', 'CW32', 'CW33', 'CW34', 'CW35', 'CW36'],
  //         axisPointer: {
  //           type: 'shadow',
  //         },
  //       },
  //     ],
  //     yAxis: [
  //       {
  //         type: 'value',
  //         name: '4.2"NS PNL yield',
  //         min: 0,
  //         max: 250,
  //         interval: 50,
  //         axisLabel: {
  //           formatter: '{value} ml',
  //         },
  //       },
  //       {
  //         type: 'value',
  //         name: 'Temperature',
  //         min: 0,
  //         max: 25,
  //         interval: 5,
  //         axisLabel: {
  //           formatter: '{value} °C',
  //         },
  //       },
  //     ],
  //     series: [
  //       {
  //         name: 'Evaporation',
  //         type: 'bar',
  //         stack: 'stack1',
  //         tooltip: {
  //           valueFormatter: function (value: any) {
  //             return (value as number) + ' ml';
  //           },
  //         },
  //         data: [
  //           2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3,
  //         ],
  //       },
  //       {
  //         name: 'Evaporation2',
  //         type: 'bar',
  //         stack: 'stack1',
  //         tooltip: {
  //           valueFormatter: function (value: any) {
  //             return (value as number) + ' ml';
  //           },
  //         },
  //         data: [
  //           2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3,
  //         ],
  //       },

  //       {
  //         name: 'Temperature',
  //         type: 'line',
  //         yAxisIndex: 1,
  //         tooltip: {
  //           valueFormatter: function (value: any) {
  //             return (value as number) + ' °C';
  //           },
  //         },
  //         data: [
  //           2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2,
  //         ],
  //       },
  //     ],
  //   };

  //   // Set the chart options
  //   myChart.setOption(options);
  // }

  // cal1(data: any, xLabel: any, legends: any) {
  //   console.log(data);

  //   // legends.map((l: any, index: number) => {
  //   //   const se = xLabel.map((x: any) => {
  //   //     const foo = data.find((d1: any) => d1.CW == x);
  //   //     console.log('🚀 ~ foo:', foo);
  //   //     const foo2 = foo.calResultGroup.find()
  //   //     return foo;
  //   //   });
  //   //   return {
  //   //     name: l,
  //   //     type: 'bar',
  //   //     stack: 'stack1',
  //   //     data: se,
  //   //   };
  //   // });

  //   // const dataCW = data.find((d: any) => d.CW == x);
  //   // console.log('🚀 ~ dataCW:', dataCW);
  //   // dataCW.calResultGroup.map((cal: any) => {
  //   //   return {
  //   //     array: cal.ArrayCausePercent,
  //   //     process: cal.ProcessCausePercent,
  //   //     pola: cal.PolaPercent,
  //   //     ST: cal['ST Yield'],
  //   //     plan: cal['TTL Yield'],
  //   //     target: null,
  //   //   };
  //   // });

  //   //  legends.map((legend:String)=>{
  //   //   const name  = legend
  //   //   const type = 'bar'
  //   //   const stack =
  //   //   return {
  //   //     name: name,
  //   //     type : type,
  //   //     stack: stack
  //   //   }
  //   //  })
  // }
}
