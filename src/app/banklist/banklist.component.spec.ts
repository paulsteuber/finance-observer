import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BanklistComponent } from './banklist.component';

describe('BanklistComponent', () => {
  let component: BanklistComponent;
  let fixture: ComponentFixture<BanklistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BanklistComponent]
    });
    fixture = TestBed.createComponent(BanklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
