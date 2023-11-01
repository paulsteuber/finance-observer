import {
  Component,
  Input,
  Output,
  EventEmitter,
  computed,
} from '@angular/core';

@Component({
  selector: 'app-monthly-amount-input',
  templateUrl: './monthly-amount-input.component.html',
  styleUrls: ['./monthly-amount-input.component.scss'],
})
export class MonthlyAmountInputComponent {
  @Input() value: number = 0;

  @Output() valueChanged = new EventEmitter<number>();

  amount: number = 0;
  amountFormatted: string = '0,00';

  constructor() {}

  onFocus(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.value === '0,00') {
      inputElement.select();
    }
  }

  onInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const amount = this.stringToFloat(inputElement.value || '0');
    this.amount = amount;
    this.amountFormatted = this.floatToString(amount);

    this.valueChanged.emit(amount);
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

  floatToString(float: number): string {
    return float.toLocaleString('de-DE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  ngOnInit() {
    this.amount = this.value;
    this.amountFormatted = this.floatToString(this.value);
  }
}
