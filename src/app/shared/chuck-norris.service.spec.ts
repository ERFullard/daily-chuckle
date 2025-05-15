import { TestBed } from '@angular/core/testing';

import { ChuckNorrisService } from './chuck-norris.service';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';

describe('ChuckNorrisService', () => {
  let service: ChuckNorrisService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(withInterceptorsFromDi())]
    });
    service = TestBed.inject(ChuckNorrisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
