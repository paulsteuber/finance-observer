import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyAmountInputComponent } from './monthly-amount-input.component';

describe('MonthlyAmountInputComponent', () => {
  let component: MonthlyAmountInputComponent;
  let fixture: ComponentFixture<MonthlyAmountInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonthlyAmountInputComponent]
    });
    fixture = TestBed.createComponent(MonthlyAmountInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
