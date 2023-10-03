import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ReadFilesService } from 'src/app/services/read-files.service';
import { Cell, Row, Workbook } from 'exceljs';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NgRefHttpService } from 'src/app/https/ng-ref-http.service';
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
    private $ngRef: NgRefHttpService
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      this.$loader.start()
      const res = await this.$ngRef.get().toPromise();
      this.dataSource = new MatTableDataSource(res);
      this.$loader.stop()
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
      await this.$readFile.handleFiles(files);
    }
  }
}
