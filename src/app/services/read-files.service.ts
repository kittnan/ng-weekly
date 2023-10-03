import { Injectable } from '@angular/core';
import { Cell, Row, Workbook, Worksheet } from 'exceljs';
import * as XLSX from 'xlsx';
import { NgRefHttpService } from '../https/ng-ref-http.service';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root',
})
export class ReadFilesService {
  constructor(private $ngRef: NgRefHttpService) {}

  private async create(arr: any) {
    try {
      const dataCreate = [...arr[0],...arr[1]]
      await this.$ngRef.create(dataCreate).toPromise()
      location.reload()
    } catch (error) {
      console.log("🚀 ~ error:", error)
      location.reload()

    }
  }

  async handleFiles(files: any) {
    const selectedFile = files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = async (e: any) => {
        const base64Data = e.target.result;
        const uint8Array = this.base64ToArrayBuffer(base64Data);
        const arr = await this.loadExcelWorkbook(uint8Array);
        this.create(arr)
      };
      reader.readAsDataURL(selectedFile);
    }
  }
  base64ToArrayBuffer(base64: string): Uint8Array {
    const binaryString = window.atob(base64.split(',')[1]);
    const length = binaryString.length;
    const uint8Array = new Uint8Array(length);

    for (let i = 0; i < length; i++) {
      uint8Array[i] = binaryString.charCodeAt(i);
    }
    return uint8Array;
  }
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

  readFileToWorkbook(files: any) {
    return new Promise((resolve) => {
      let data: any;
      const reader: FileReader = new FileReader();
      reader.readAsBinaryString(files[0]);
      reader.onload = (e: any) => {
        /* create workbook */
        const binarystr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });

        /* selected the first sheet */
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        /* save data */
        // data = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
        resolve(wb);
      };
    });
  }
  selectRange(sheet: Worksheet, rangeCell: string) {
    const [startCell, endCell] = rangeCell.split(':');

    const [endCellColumn, endRow] = endCell.match(
      /[a-z]+|[^a-z]+/gi
    ) as string[];
    const [startCellColumn, startRow] = startCell.match(
      /[a-z]+|[^a-z]+/gi
    ) as string[];

    let endColumn = sheet.getColumn(endCellColumn);
    let startColumn = sheet.getColumn(startCellColumn);

    if (!endColumn) throw new Error('End column not found');
    if (!startColumn) throw new Error('Start column not found');

    const endColumnNumber = endColumn.number;
    const startColumnNumber = startColumn.number;

    const cells = [];
    for (let y = parseInt(startRow); y <= parseInt(endRow); y++) {
      const row = sheet.getRow(y);

      for (let x = startColumnNumber; x <= endColumnNumber; x++) {
        cells.push(row.getCell(x));
      }
    }

    return cells;
  }
  convertData(ws: Worksheet) {
    let arr: any = [];
    ws.eachRow((row: Row, rowNum: number) => {
      if (rowNum > 2) {
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
