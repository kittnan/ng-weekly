import { Injectable } from '@angular/core';
import { Cell, Row, Workbook, Worksheet } from 'exceljs';
import * as XLSX from 'xlsx';
@Injectable({
  providedIn: 'root',
})
export class LoadNgRefService {
  constructor() {}
  async loadExcelWorkbook(data: Uint8Array) {
    const workbook = new Workbook();
    await workbook.xlsx.load(data);
    const worksheets = workbook.worksheets;
    let dataWS: any = [];
    for (let i = 0; i < worksheets.length; i++) {
      const worksheet = worksheets[i];
      dataWS[i] = this.getDataInRange(worksheet);
      if (i + 1 === worksheets.length) {
        return dataWS;
      }
    }
  }
  getDataInRange(worksheet: Worksheet) {
    const dataArr = this.convertData(worksheet);
    const sheetName = worksheet.name;
    const dataUpdate = dataArr.map((data: any) => {
      data['type'] = sheetName;
      return data;
    });
    return dataUpdate;
  }
  convertData(ws: Worksheet) {
    let arr: any = [];
    ws.eachRow((row: Row, rowNum: number) => {
      console.log("🚀 ~ rowNum:", rowNum)
      if (rowNum > 1) {
        let item: any = {};
        const value: any = row.values;
        item['Code'] = value[1];
        item['Defect Name'] = value[2];
        item['Source'] = value[3];
        item['Source2'] = value[4];
        arr.push(item);
      }
    });
    return arr;
  }
}
