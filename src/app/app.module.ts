import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BanklistComponent } from './banklist/banklist.component';
import { BankComponent } from './bank/bank.component';
import { BankAmountComponent } from './bank-amount/bank-amount.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    BanklistComponent,
    BankComponent,
    BankAmountComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
