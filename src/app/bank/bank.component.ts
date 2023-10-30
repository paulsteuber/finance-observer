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

  allBanks = jsonAllBanks;
  bankColor = 'transparent';

  constructor() {
    this.bank = {} as Bank;
  }

  onBankDetailsChanged() {
    this.updatedBankColor();
    this.bankDetailsChanged.emit(this.bank);
  }

  updatedBankColor() {
    const matchedBank = this.allBanks.banks.find(
      (allBank) => allBank.name.toLowerCase() === this.bank.name.toLowerCase()
    );
    this.bankColor = matchedBank?.color || 'transparent';
  }

  ngOnInit() {
    this.updatedBankColor();
  }
}
