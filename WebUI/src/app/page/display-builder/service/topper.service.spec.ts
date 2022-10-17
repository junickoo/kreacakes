import { TestBed } from '@angular/core/testing';

import { TopperService } from './topper.service';

describe('TopperService', () => {
  let service: TopperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
