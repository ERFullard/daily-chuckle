import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JokeListComponent } from './joke-list.component';
import {provideZoneChangeDetection} from '@angular/core';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {provideAnimations} from '@angular/platform-browser/animations';

describe('JokeListComponent', () => {
  let component: JokeListComponent;
  let fixture: ComponentFixture<JokeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JokeListComponent],
      providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JokeListComponent);
    component = fixture.componentInstance;
    component.items = [{
      id: 'someid',
      value: 'Chuck Norris joke.',
      icon_url: 'https://api.chucknorris.io/img/avatar/chuck-norris.png',
      url: '',
      favorite: false,
    }];
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
