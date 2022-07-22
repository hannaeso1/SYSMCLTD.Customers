import { TestBed } from '@angular/core/testing';

import { ViewEditModeService } from './view-edit-mode.service';

describe('ViewEditModeService', () => {
  let service: ViewEditModeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewEditModeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
