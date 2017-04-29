import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawboardClearComponent } from './drawboard-clear.component';

describe('DrawboardClearComponent', () => {
  let component: DrawboardClearComponent;
  let fixture: ComponentFixture<DrawboardClearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawboardClearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawboardClearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
