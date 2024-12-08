import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

interface RatesResponse {
  rates: { [key: string]: number };
  base: string;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private apiUrl = 'https://api.exchangerate-api.com/v4/latest'; // API para obter as taxas de câmbio
  private cacheKey = 'currencyRates'; // Chave para armazenar as taxas no LocalStorage

  constructor(private http: HttpClient) {}

  // Função para obter as taxas de câmbio
  getRates(baseCurrency: string): Observable<RatesResponse> {
    const cachedRates = localStorage.getItem(this.cacheKey);

    if (cachedRates) {
      // Se os dados estão no cache, retorna um Observable com esses dados
      return new Observable((observer) => {
        observer.next(JSON.parse(cachedRates));
        observer.complete();
      });
    } else {
      // Se não houver cache, faz a requisição à API e armazena no cache
      return this.http.get<RatesResponse>(`${this.apiUrl}/${baseCurrency}`).pipe(
        tap((data) => {
          // Armazena os dados no LocalStorage
          localStorage.setItem(this.cacheKey, JSON.stringify(data));
        })
      );
    }
  }

  clearCache(): void {
    localStorage.removeItem(this.cacheKey);
  }
}
