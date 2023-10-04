/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LoadNgRefService } from './load-ng-ref.service';

describe('Service: LoadNgRef', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadNgRefService]
    });
  });

  it('should ...', inject([LoadNgRefService], (service: LoadNgRefService) => {
    expect(service).toBeTruthy();
  }));
});
