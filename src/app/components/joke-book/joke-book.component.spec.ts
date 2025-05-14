import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JokeBookComponent } from './joke-book.component';

describe('JokeBookComponent', () => {
  let component: JokeBookComponent;
  let fixture: ComponentFixture<JokeBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JokeBookComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JokeBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
