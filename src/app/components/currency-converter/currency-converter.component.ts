import { CurrencyService } from './../../services/currency.service';
import { Observable } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import Decimal from 'decimal.js';


@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css']
})
export class CurrencyConverterComponent implements OnInit, OnDestroy {
  amount1: number = 1;
  amount2: number = 0;
  selectedCurrency1: string = 'USD';
  selectedCurrency2: string = 'UAH';
  exchangeRates: { [key: string]: number } = {};
  private subscription: Subscription = new Subscription();

  constructor(private currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.loadExchangeRates();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadExchangeRates() {
    const selectedCurrencies = [this.selectedCurrency1, this.selectedCurrency2];
    this.subscription = this.currencyService.getAll(selectedCurrencies)
      .subscribe(rates => {
        this.exchangeRates = rates;
        this.calculateConversion();
      });
  }

  calculateConversion() {
    if (this.exchangeRates && this.exchangeRates[this.selectedCurrency1] && this.exchangeRates[this.selectedCurrency2]) {
      const rate1 = this.exchangeRates[this.selectedCurrency1];
      const rate2 = this.exchangeRates[this.selectedCurrency2];

      this.amount2 = +(this.amount1 / rate1 * rate2).toFixed(2);
    } else {
      this.amount2 = 0;
    }

    // Проверяем, является ли значение числом перед выполнением расчета
    if (isNaN(this.amount1) || !isFinite(this.amount1)) {
      this.amount1 = 0;
    }

    if (isNaN(this.amount2) || !isFinite(this.amount2)) {
      this.amount2 = 0;
    }
  }

  onCurrencyChange1() {
    this.loadExchangeRates();
  }

  onCurrencyChange2() {
    this.loadExchangeRates();
  }

  onAmountChange1() {
    this.calculateConversion();
  }

  onAmountChange2() {
    if (this.exchangeRates && this.exchangeRates[this.selectedCurrency2]) {
      const rate2 = this.exchangeRates[this.selectedCurrency2];
      this.amount1 = +(this.amount2 / rate2 * this.exchangeRates[this.selectedCurrency1]).toFixed(2);
    } else {
      this.amount1 = 0;
    }

    this.calculateConversion();
  }
}