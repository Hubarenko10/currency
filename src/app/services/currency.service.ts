import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient) { }

  getAll(selectedCurrencies: string[]): Observable<{ [key: string]: number }> {
    const apiUrl = "https://openexchangerates.org/api/latest.json?app_id=6940fd7b7641447780efbd2bc6bc7612";
    return this.http.get(apiUrl).pipe(
      map((response: any) => {
        const selectedRates: { [key: string]: number } = {};
        selectedCurrencies.forEach(currency => {
          if (response.rates[currency]) {
            selectedRates[currency] = response.rates[currency];
          }
        });
        return selectedRates;
      })
    );
  }
}