import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sub-head',
  templateUrl: './sub-head.component.html',
  styleUrls: ['./sub-head.component.scss'],
})
export class SubHeadComponent implements OnInit {
  items: any[] = [];
  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log(this.router.url);
    if (this.router.url.includes('/admin')) {
      this.items.push(
        {
          path: '/admin/ng-ref',
          name: 'NG REF',
          icon: '',
        },
        {
          path: '/admin/group-target',
          name: 'Group Target',
          icon: '',
        }
      );
    }
    if (this.router.url.includes('/chart')) {
      this.items.push(
        {
          path: '/chart/calculate',
          name: 'Calculate',
          icon: '',
        },
        {
          path: '/chart/view',
          name: 'View',
          icon: '',
        }
      );
    }
  }

}
