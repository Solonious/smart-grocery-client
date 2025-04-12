import { TestBed } from '@angular/core/testing';

import { ShoppingPageService } from './shopping-page.service';

describe('ShoppingPageService', () => {
  let service: ShoppingPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppingPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
