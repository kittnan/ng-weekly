/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GroupTargetHttpService } from './group-target-http.service';

describe('Service: GroupTargetHttp', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroupTargetHttpService]
    });
  });

  it('should ...', inject([GroupTargetHttpService], (service: GroupTargetHttpService) => {
    expect(service).toBeTruthy();
  }));
});
