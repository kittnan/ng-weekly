import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReadFilesService {
  constructor() {}


  base64ToArrayBuffer(base64: string): Uint8Array {
    const binaryString = window.atob(base64.split(',')[1]);
    const length = binaryString.length;
    const uint8Array = new Uint8Array(length);

    for (let i = 0; i < length; i++) {
      uint8Array[i] = binaryString.charCodeAt(i);
    }
    return uint8Array;
  }

  // readFileToWorkbook(files: any) {
  //   return new Promise((resolve) => {
  //     let data: any;
  //     const reader: FileReader = new FileReader();
  //     reader.readAsBinaryString(files[0]);
  //     reader.onload = (e: any) => {
  //       const binarystr: string = e.target.result;
  //       const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });
  //       const wsname: string = wb.SheetNames[0];
  //       const ws: XLSX.WorkSheet = wb.Sheets[wsname];
  //       resolve(wb);
  //     };
  //   });
  // }
  // selectRange(sheet: Worksheet, rangeCell: string) {
  //   const [startCell, endCell] = rangeCell.split(':');

  //   const [endCellColumn, endRow] = endCell.match(
  //     /[a-z]+|[^a-z]+/gi
  //   ) as string[];
  //   const [startCellColumn, startRow] = startCell.match(
  //     /[a-z]+|[^a-z]+/gi
  //   ) as string[];

  //   let endColumn = sheet.getColumn(endCellColumn);
  //   let startColumn = sheet.getColumn(startCellColumn);

  //   if (!endColumn) throw new Error('End column not found');
  //   if (!startColumn) throw new Error('Start column not found');

  //   const endColumnNumber = endColumn.number;
  //   const startColumnNumber = startColumn.number;

  //   const cells = [];
  //   for (let y = parseInt(startRow); y <= parseInt(endRow); y++) {
  //     const row = sheet.getRow(y);

  //     for (let x = startColumnNumber; x <= endColumnNumber; x++) {
  //       cells.push(row.getCell(x));
  //     }
  //   }

  //   return cells;
  // }

}
