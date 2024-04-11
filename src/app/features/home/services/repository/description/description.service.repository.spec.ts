import { TestBed } from '@angular/core/testing';
import { DescriptionServiceRepository } from './description.service.repository';

describe('DescriptionServiceRepository', () => {
  let service: DescriptionServiceRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DescriptionServiceRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
