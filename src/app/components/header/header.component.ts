import { CurrencyService } from './../../services/currency.service';
import { Component, OnInit } from '@angular/core';
import {
  faWallet,
  faArrowRight,
  faBuildingColumns,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})

export class HeaderComponent implements OnInit {
  currencies: { [key: string]: number } = {};
  wallet = faWallet;
  arrow = faArrowRight;
  bank = faBuildingColumns;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    const selectedCurrencies = ["USD", "EUR", "GBP", "JPY", "UAH"];
    
    this.currencyService.getAll(selectedCurrencies).subscribe(
      (selectedRates) => {
        this.currencies = selectedRates;
      },
      (err) => {
        console.log('Something went wrong', err);
      }
    );
  }
}