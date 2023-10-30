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

  addNewBank() {
    this.banks.push({
      name: 'Commerzbank',
      individualName: '',
    });

    this.somethingChanged.emit(this.banks);
  }

  updateBankDetails(index: number, bank: Bank) {
    this.banks[index] = bank;
    console.log('UPDATE');

    this.somethingChanged.emit(this.banks);
  }
  ngOnInit() {
    this.banks = this.userBankData || [];
  }
  ngOnChanges() {
    this.banks = this.userBankData || [];
  }
}
