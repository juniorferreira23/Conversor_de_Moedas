import { Component } from '@angular/core';
import { CurrencyService } from '../services/currency.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  baseCurrency: string = 'USD';
  targetCurrency: string = 'BRL';
  amount: number = 1;
  convertedAmount: number | null = null; // Garantir inicialização
  currencies: string[] = ['USD', 'EUR', 'BRL', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'SEK'];

  constructor(private currencyService: CurrencyService) {}

  convert() {
    if (!this.baseCurrency || !this.targetCurrency || !this.amount) {
      console.error('Campos obrigatórios não preenchidos.');
      return;
    }

    this.currencyService.getRates(this.baseCurrency).subscribe(
      (data) => {
        const rate = data.rates[this.targetCurrency];
        if (rate) {
          this.convertedAmount = this.amount * rate;
        } else {
          console.error('Taxa de conversão não encontrada.');
          this.convertedAmount = null;
        }
      },
      (error) => {
        console.error('Erro ao obter taxas de câmbio:', error);
        this.convertedAmount = null;
      }
    );
  }
}
