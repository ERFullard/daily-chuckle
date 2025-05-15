import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JokeBookComponent } from './joke-book.component';
import {provideZoneChangeDetection} from '@angular/core';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {provideAnimations} from '@angular/platform-browser/animations';

describe('JokeBookComponent', () => {
  let component: JokeBookComponent;
  let fixture: ComponentFixture<JokeBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JokeBookComponent],
      providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JokeBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
