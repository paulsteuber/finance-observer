import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyAmountAreaComponent } from './monthly-amount-area.component';

describe('MonthlyAmountAreaComponent', () => {
  let component: MonthlyAmountAreaComponent;
  let fixture: ComponentFixture<MonthlyAmountAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonthlyAmountAreaComponent]
    });
    fixture = TestBed.createComponent(MonthlyAmountAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
