import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-bank',
  templateUrl: './delete-bank.component.html',
  styleUrls: ['./delete-bank.component.scss'],
})
export class DeleteBankComponent {
  @Output() cancelDeleteBank = new EventEmitter();
  @Output() deleteBank = new EventEmitter();

  onCancel() {
    this.cancelDeleteBank.emit();
  }
  onDelete() {
    this.deleteBank.emit();
  }
}
