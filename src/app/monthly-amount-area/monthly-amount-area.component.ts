import { Component, Input } from '@angular/core';
import { Bank } from 'src/types/bank';

@Component({
  selector: 'app-monthly-amount-area',
  templateUrl: './monthly-amount-area.component.html',
  styleUrls: ['./monthly-amount-area.component.scss'],
})
export class MonthlyAmountAreaComponent {
  @Input() bank: Bank | null = null;

  constructor() {}

  ngOnInit() {}
}
