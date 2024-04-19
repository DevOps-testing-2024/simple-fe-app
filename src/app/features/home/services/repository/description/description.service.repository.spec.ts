import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DescriptionServiceRepository } from './description.service.repository';
import { ConfigService } from '../../../../../shared/components/configuration/services/configuration.service';
import { DescriptionAdapter } from '../../../../../shared/model-adapter/description.adapter';

describe('DescriptionServiceRepository', () => {
  let service: DescriptionServiceRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ConfigService,
        DescriptionAdapter
      ]
    });
    service = TestBed.inject(DescriptionServiceRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});