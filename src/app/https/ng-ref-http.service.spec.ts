/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NgRefHttpService } from './ng-ref-http.service';

describe('Service: NgRefHttp', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgRefHttpService]
    });
  });

  it('should ...', inject([NgRefHttpService], (service: NgRefHttpService) => {
    expect(service).toBeTruthy();
  }));
});
