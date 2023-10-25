import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CalculateService } from 'src/app/https/calculate.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-calculate',
  templateUrl: './calculate.component.html',
  styleUrls: ['./calculate.component.scss'],
})
export class CalculateComponent implements OnInit {
  displayedColumns: string[] = ['date', 'month', 'CW'];
  dataSource!: MatTableDataSource<any>;
  constructor(private $calculate: CalculateService) {}

  async ngOnInit(): Promise<void> {
    try {
      const foo = await this.$calculate.get().toPromise();
      this.dataSource = new MatTableDataSource(foo);
    } catch (error) {
      console.log('🚀 ~ error:', error);
    }
  }
  async handleCal() {
    try {
      const res = await this.$calculate.calculate().toPromise();
      Swal.fire({
        title: 'SUCCESS',
        icon: 'success',
        showConfirmButton: false,
        timer: 1000,
      }).then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.log('🚀 ~ error:', error);
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
