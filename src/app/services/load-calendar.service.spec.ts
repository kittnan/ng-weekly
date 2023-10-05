/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LoadCalendarService } from './load-calendar.service';

describe('Service: LoadCalendar', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadCalendarService]
    });
  });

  it('should ...', inject([LoadCalendarService], (service: LoadCalendarService) => {
    expect(service).toBeTruthy();
  }));
});
