import { TestBed, inject } from '@angular/core/testing';

import { AdminAuthguardService } from './admin-authguard.service';

describe('AdminAuthguardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminAuthguardService]
    });
  });

  it('should be created', inject([AdminAuthguardService], (service: AdminAuthguardService) => {
    expect(service).toBeTruthy();
  }));
});
