import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root',
})
export class LoadGroupTargetService {
  constructor() {}
  async loadExcelWorkbook(data: Uint8Array) {
    const workbook = XLSX.read(data, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet);
    const fillData = jsonData.map((a: any) => {
      return {
        ...a,
        groupName: !a.groupName ? null : a.groupName,
      };
    });
    // console.log('🚀 ~ fillData:', fillData);
    return fillData
  }
}
