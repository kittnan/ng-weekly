import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ReadFilesService } from 'src/app/services/read-files.service';
import { Cell, Row, Workbook } from 'exceljs';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NgRefHttpService } from 'src/app/https/ng-ref-http.service';
import { LoadNgRefService } from 'src/app/services/load-ng-ref.service';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
// import * as fs from 'file-saver';
@Component({
  selector: 'app-ng-ref',
  templateUrl: './ng-ref.component.html',
  styleUrls: ['./ng-ref.component.scss'],
})
export class NgRefComponent implements OnInit {
  displayedColumns: string[] = [
    'Code',
    'Defect Name',
    'Source',
    'Source2',
    'type',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild('fileUpload') fileUpload!: ElementRef<HTMLInputElement>;

  constructor(
    private $readFile: ReadFilesService,
    private $loader: NgxUiLoaderService,
    private $ngRef: NgRefHttpService,
    private $loadNGRef: LoadNgRefService
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      this.$loader.start();
      const res = await this.$ngRef.get().toPromise();
      this.dataSource = new MatTableDataSource(res);
      this.$loader.stop();
    } catch (error) {
      console.log('🚀 ~ error:', error);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async handleUpload() {
    let files: any = this.fileUpload.nativeElement.files;
    if (files.length > 0) {
      await this.handleFiles(files);
    }
  }
  async handleFiles(files: any) {
    const selectedFile = files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = async (e: any) => {
        const base64Data = e.target.result;
        const uint8Array = this.$readFile.base64ToArrayBuffer(base64Data);
        const arr = await this.$loadNGRef.loadExcelWorkbook(uint8Array);
        this.create(arr);
      };
      reader.readAsDataURL(selectedFile);
    }
  }
  private async create(arr: any) {
    try {
      const dataCreate = [...arr[0], ...arr[1]];
      await this.$ngRef.create(dataCreate).toPromise();
      // location.reload();
    } catch (error) {
      console.log('🚀 ~ error:', error);
      location.reload();
    }
  }
  async handleDownload() {
    try {
      const wb: any = await this.$ngRef.download().toPromise();
      var dataArray = XLSX.write(wb, { type: 'array', bookType: 'xlsx' });
      var url = URL.createObjectURL(
        new Blob([dataArray], { type: 'application/octet-stream' })
      );
      saveAs.saveAs(url,'ngRef-template.xlsx')
    } catch (error) {
      console.log('🚀 ~ error:', error);
    }
  }

}
