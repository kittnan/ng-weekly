import { LoadCalendarService } from './../../../services/load-calendar.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as saveAs from 'file-saver';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CalendarService } from 'src/app/https/calendar.service';
import { GroupTargetHttpService } from 'src/app/https/group-target-http.service';
import { LoadGroupTargetService } from 'src/app/services/load-group-target.service';
import { ReadFilesService } from 'src/app/services/read-files.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  displayedColumns: string[] = [
    'date',
    'month',
    'CW',
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild('fileUpload') fileUpload!: ElementRef<HTMLInputElement>;

  constructor(
    private $readFile: ReadFilesService,
    private $loadCalendar: LoadCalendarService,
    private $calendar:CalendarService,
    private $loader: NgxUiLoaderService,
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      this.$loader.start()
      const res = await this.$calendar.get().toPromise();
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
        const arr = await this.$loadCalendar.loadExcelWorkbook(uint8Array);
        // console.log("🚀 ~ arr:", arr)
        this.create(arr)
      };
      reader.readAsDataURL(selectedFile);
    }
  }
  private async create(arr: any) {
    try {
      const dataCreate = arr
      await this.$calendar.create(dataCreate).toPromise()
      // location.reload()
    } catch (error) {
      console.log("🚀 ~ error:", error)
      location.reload()
    }
  }

  async handleDownload() {
    try {
      const wb: any = await this.$calendar.download().toPromise();
      var dataArray = XLSX.write(wb, { type: 'array', bookType: 'xlsx' });
      var url = URL.createObjectURL(
        new Blob([dataArray], { type: 'application/octet-stream' })
      );
      saveAs.saveAs(url,'calendar-template.xlsx')
    } catch (error) {
      console.log('🚀 ~ error:', error);
    }
  }


}
