import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JokeListItemComponent } from './joke-list-item.component';
import {provideZoneChangeDetection} from '@angular/core';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {provideAnimations} from '@angular/platform-browser/animations';

describe('JokeListItemComponent', () => {
  let component: JokeListItemComponent;
  let fixture: ComponentFixture<JokeListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JokeListItemComponent],
      providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JokeListItemComponent);
    component = fixture.componentInstance;
    component.item = {
      id: 'someid',
      value: 'Chuck Norris joke.',
      icon_url: 'https://api.chucknorris.io/img/avatar/chuck-norris.png',
      url: '',
      favorite: false,
    };
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
