import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayGameStateComponent } from './display-game-state.component';

describe('DisplayGameStateComponent', () => {
  let component: DisplayGameStateComponent;
  let fixture: ComponentFixture<DisplayGameStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayGameStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayGameStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
