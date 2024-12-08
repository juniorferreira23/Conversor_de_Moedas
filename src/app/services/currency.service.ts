import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface RatesResponse {
  rates: { [key: string]: number };
  base: string;
  date: string;
}

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private apiUrl = 'https://api.exchangerate-api.com/v4/latest'; // URL da API

  constructor(private http: HttpClient) {}

  // Função para obter as taxas de câmbio
  getRates(baseCurrency: string): Observable<RatesResponse> {
    return this.http.get<RatesResponse>(`${this.apiUrl}/${baseCurrency}`);
  }
}
