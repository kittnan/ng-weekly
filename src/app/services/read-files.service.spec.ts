/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ReadFilesService } from './read-files.service';

describe('Service: ReadFiles', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReadFilesService]
    });
  });

  it('should ...', inject([ReadFilesService], (service: ReadFilesService) => {
    expect(service).toBeTruthy();
  }));
});
