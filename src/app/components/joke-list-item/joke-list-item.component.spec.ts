import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JokeListItemComponent } from './joke-list-item.component';

describe('JokeListItemComponent', () => {
  let component: JokeListItemComponent;
  let fixture: ComponentFixture<JokeListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JokeListItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JokeListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
