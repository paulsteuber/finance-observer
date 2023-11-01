import {
  Component,
  Input,
  Output,
  EventEmitter,
  signal,
  computed,
} from '@angular/core';
import * as lang from '../../assets/lang.json';
import { Bank, SortedYears, Year } from 'src/types/bank';

@Component({
  selector: 'app-monthly-amount-area',
  templateUrl: './monthly-amount-area.component.html',
  styleUrls: ['./monthly-amount-area.component.scss'],
})
export class MonthlyAmountAreaComponent {
  @Input() bank: Bank | null = null;

  @Output() closeWindow = new EventEmitter();
  @Output() amountChanged = new EventEmitter<Bank>();

  langMonths = lang;

  nextYearToAdd = `${new Date().getFullYear()}`;
  clonedBank = {} as Bank;
  currentOpenYearIndex = 0;

  constructor() {}

  sortedBalanceByYear = computed(() => {
    return this.sortBalanceByYear();
  });

  closeAmountUpdater() {
    this.closeWindow.emit();
  }

  toggleYear(yearIndex: number) {
    if (this.currentOpenYearIndex === yearIndex) return;

    this.currentOpenYearIndex = yearIndex;
  }

  addYear() {
    const yearList = this.bank?.monthlyBalances;
    if (!yearList) return;

    if (yearList[this.nextYearToAdd]) return; // Jahr existiert schon

    yearList[this.nextYearToAdd] = {
      months: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    };

    if (this.bank !== null) {
      this.bank.monthlyBalances = yearList;
      this.amountChanged.emit(this.bank);
      this.sortBalanceByYear();
    }
  }

  yearValidationDirect() {
    const extractedYear = this.nextYearToAdd.match(/^\d{1,4}$/);

    this.nextYearToAdd = extractedYear
      ? extractedYear[0]
      : `${new Date().getFullYear()}`;
  }

  yearValidationDelay() {
    const extractedYear = this.nextYearToAdd.match(/[1-2][90][0-9][0-9]/);
    this.nextYearToAdd = extractedYear
      ? extractedYear[0]
      : `${new Date().getFullYear()}`;
  }

  sortBalanceByYear(): SortedYears {
    const yearList = this.clonedBank?.monthlyBalances;
    if (!yearList) return [] as SortedYears;

    const yearListArray: SortedYears = Object.keys(yearList).map((key) => ({
      year: key,
      months: yearList[key].months,
    }));

    const sortedYears = yearListArray.sort(
      (a, b) => parseInt(b.year) - parseInt(a.year)
    );

    return sortedYears;
  }

  saveAllChanges() {
    if (!this.clonedBank.monthlyBalances) return;
    this.clonedBank && this.amountChanged.emit(this.clonedBank);
    console.log('SAVE', this.clonedBank);
  }

  stringToFloat(inputString: string) {
    // Ersetze Tausendertrennzeichen (Punkte) durch leere Zeichen
    const withoutThousands = inputString.replace(/\./g, '');
    // Ersetze das Dezimaltrennzeichen (Komma) durch einen Punkt
    const withDotAsDecimal = withoutThousands.replace(',', '.');
    // Parst den formatierten String in ein Double
    const result = parseFloat(withDotAsDecimal);
    if (isNaN(result)) {
      throw new Error('Ungültige Eingabe');
    }
    return result;
  }

  inputValueChanged(year: string, monthIndex: number, amount: number) {
    if (!this.clonedBank.monthlyBalances) return;
    this.clonedBank.monthlyBalances[year].months[monthIndex] = amount;
  }
  ngOnChanges() {
    this.clonedBank = JSON.parse(JSON.stringify(this.bank));
    console.log(this.clonedBank);
    this.sortBalanceByYear();
  }
  ngOnInit() {}
}
