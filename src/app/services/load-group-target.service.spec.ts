/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LoadGroupTargetService } from './load-group-target.service';

describe('Service: LoadGroupTarget', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadGroupTargetService]
    });
  });

  it('should ...', inject([LoadGroupTargetService], (service: LoadGroupTargetService) => {
    expect(service).toBeTruthy();
  }));
});
