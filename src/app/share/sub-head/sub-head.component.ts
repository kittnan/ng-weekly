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
          icon: 'fact_check',
        },
        {
          path: '/admin/group-target',
          name: 'Group',
          icon: 'group_work',
        },
        {
          path: '/admin/calendar',
          name: 'Calendar',
          icon: 'event_available',
        },
        {
          path: '/admin/calculate',
          name: 'Calculate',
          icon: 'calculate',
        }
      );
    }
    if (this.router.url.includes('/chart')) {
      // this.items.push({
      //   path: '/chart/view',
      //   name: 'View',
      //   icon: '',
      // });
    }
  }
}
