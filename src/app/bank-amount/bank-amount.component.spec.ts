import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAmountComponent } from './bank-amount.component';

describe('BankAmountComponent', () => {
  let component: BankAmountComponent;
  let fixture: ComponentFixture<BankAmountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BankAmountComponent]
    });
    fixture = TestBed.createComponent(BankAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
