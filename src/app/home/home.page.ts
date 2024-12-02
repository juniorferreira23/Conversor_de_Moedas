import { Component } from '@angular/core';
import { CurrencyService } from '../services/currency.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  baseCurrency: string = 'USD';
  targetCurrency: string = 'BRL';
  amount: number = 1;
  convertedAmount: number | null = null;
  currencies: string[] = ['USD', 'EUR', 'BRL', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'SEK'];

  constructor(private currencyService: CurrencyService) {}

  convert() {
    this.currencyService.getRates(this.baseCurrency).subscribe((data: any) => {
      const rate = data.rates[this.targetCurrency];
      if (rate) {
        this.convertedAmount = this.amount * rate;
      } else {
        this.convertedAmount = null;
        alert('Moeda alvo inválida!');
      }
    });
  }
}
