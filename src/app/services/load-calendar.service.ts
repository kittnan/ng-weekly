import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root',
})
export class LoadCalendarService {
  constructor() {}
  async loadExcelWorkbook(data: Uint8Array) {
    const workbook = XLSX.read(data, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet);
    const fillData = jsonData.map((a: any) => {
      const daysSince1900 = a.date;
      const millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
      const dateValue = new Date(
        (daysSince1900 - 1) * millisecondsPerDay + Date.UTC(1900, 0, 1)
      );

      a['date']= new Date(dateValue)
      return a;
    });
    // console.log('🚀 ~ fillData:', fillData);
    return fillData;
  }
}
