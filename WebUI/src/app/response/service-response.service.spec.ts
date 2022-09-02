import { TestBed } from '@angular/core/testing';

import { ServiceResponseService } from './service-response.service';

describe('ServiceResponseService', () => {
  let service: ServiceResponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceResponseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
