import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import * as jsonAllBanks from '../../assets/bank.json';
import { Bank } from 'src/types/bank';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss'],
})
export class BankComponent implements OnInit {
  @Input() bank: Bank;
  @Input() index: number = 0;

  @Output() bankDetailsChanged = new EventEmitter<Bank>();
  @Output() deleteBankModal = new EventEmitter();
  @Output() openAmountUpdaterModal = new EventEmitter();

  allBanks = jsonAllBanks;
  bankColor = 'transparent';
  recommendedBankName = '';
  isBankNameFocused: boolean = false;

  constructor() {
    this.bank = {} as Bank;
  }
  onBankNameFocus(isFocused: boolean) {
    this.isBankNameFocused = isFocused;
  }

  onBankNameKeyDown(event: KeyboardEvent) {
    if (
      this.isBankNameFocused &&
      this.recommendedBankName.length &&
      event.code === 'Tab'
    ) {
      this.bank.name = this.recommendedBankName;
      this.onBankDetailsChanged();
    }
  }
  onBankDetailsChanged() {
    this.updatedBankColor();
    this.bankDetailsChanged.emit(this.bank);
  }

  onBankNameChanged() {
    // Bank Name Recommendations
    const currentInputLength = this.bank.name.length;
    if (currentInputLength < 2) {
      this.recommendedBankName = '';
      return;
    }

    const matchedBanks = this.allBanks.banks.filter(
      (allBank) =>
        allBank.name.toLowerCase().includes(this.bank.name.toLowerCase()) &&
        allBank.name.length > this.bank.name.length
    );

    this.recommendedBankName = matchedBanks.length ? matchedBanks[0].name : '';
    console.log('Recommended Bank Name: ' + this.recommendedBankName);

    this.onBankDetailsChanged();
  }

  updatedBankColor() {
    const matchedBank = this.allBanks.banks.find(
      (allBank) => allBank.name.toLowerCase() === this.bank.name.toLowerCase()
    );
    this.bankColor = matchedBank?.color || 'transparent';
  }

  openDeleteBankModal() {
    this.deleteBankModal.emit();
  }

  openAmountUpdater() {
    this.openAmountUpdaterModal.emit();
  }
  ngOnInit() {
    this.updatedBankColor();
  }
}
