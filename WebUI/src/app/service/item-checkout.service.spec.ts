import { TestBed } from '@angular/core/testing';

import { ItemCheckoutService } from './item-checkout.service';

describe('ItemCheckoutService', () => {
  let service: ItemCheckoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemCheckoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
