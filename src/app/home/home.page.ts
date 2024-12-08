import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../services/currency.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  baseCurrency: string = 'USD';
  targetCurrency: string = 'BRL';
  amount: number = 1;
  result: number = 0;
  rates: { [key: string]: number } = {}; // Tipagem para rates
  currencies: string[] = ['USD', 'EUR', 'BRL', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'SEK']; // Lista de moedas disponíveis
  convertedAmount: number | null = null; // Resultado da conversão

  constructor(private currencyService: CurrencyService) {}

  ngOnInit() {
    this.loadRates();
  }

  // Função para carregar as taxas de câmbio
  loadRates() {
    if (navigator.onLine) {
      this.currencyService.getRates(this.baseCurrency).subscribe(
        (data) => {
          this.rates = data.rates; // Acessa as taxas da resposta
          this.updateConversion();
        },
        (error) => {
          console.error('Erro ao obter as taxas de câmbio:', error);
          // Caso ocorra um erro, pode-se utilizar os dados em cache
          if (this.rates && Object.keys(this.rates).length > 0) {
            this.updateConversion();
          }
        }
      );
    } else {
      console.log('Você está offline, utilizando os dados armazenados em cache.');
      if (this.rates && Object.keys(this.rates).length > 0) {
        this.updateConversion();
      }
    }
  }

  // Função para atualizar o valor da conversão
  updateConversion() {
    if (this.rates && this.rates[this.targetCurrency]) {
      this.convertedAmount = this.amount * this.rates[this.targetCurrency];
    }
  }

  // Função para trocar as moedas
  swapCurrencies() {
    const temp = this.baseCurrency;
    this.baseCurrency = this.targetCurrency;
    this.targetCurrency = temp;
    this.loadRates(); // Recarrega as taxas com as novas moedas
  }

  // Função para realizar a conversão quando o botão for clicado
  convert() {
    this.updateConversion(); // Chama a função de conversão
  }
}
