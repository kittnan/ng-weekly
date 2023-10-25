/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ChartHttpService } from './chart-http.service';

describe('Service: ChartHttp', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChartHttpService]
    });
  });

  it('should ...', inject([ChartHttpService], (service: ChartHttpService) => {
    expect(service).toBeTruthy();
  }));
});
