import { Component, EventEmitter, Output, Input } from '@angular/core';
import * as jsonAllBanks from '../../assets/bank.json';
import { Bank } from 'src/types/bank';

@Component({
  selector: 'app-banklist',
  templateUrl: './banklist.component.html',
  styleUrls: ['./banklist.component.scss'],
})
export class BanklistComponent {
  @Input() userBankData: Bank[] = [];
  @Output() somethingChanged = new EventEmitter<any[]>();

  allBanks = jsonAllBanks;
  banks: Bank[] = [];
  deleteBankIndex: number | null = null;
  updatingBankIndex: number | null = null;

  addNewBank() {
    this.banks.push({
      name: '',
      individualName: '',
    });

    this.somethingChanged.emit(this.banks);
  }

  updateBankDetails(index: number, bank: Bank) {
    this.banks[index] = bank;

    this.somethingChanged.emit(this.banks);
  }

  openDeleteBankModal(index: number) {
    this.deleteBankIndex = index;
  }
  cancelProcess() {
    this.deleteBankIndex = null;
  }
  deleteBank() {
    this.banks = this.deleteBankIndex
      ? this.banks.filter((bank, index) => index !== this.deleteBankIndex)
      : this.banks;
    this.deleteBankIndex = null;
    this.somethingChanged.emit(this.banks);
  }

  openAmountUpdater(index: number) {
    this.updatingBankIndex = index;
    alert(`amount updater ${index}`);
  }

  ngOnInit() {
    this.banks = this.userBankData || [];
  }
  ngOnChanges() {
    this.banks = this.userBankData || [];
  }
}
