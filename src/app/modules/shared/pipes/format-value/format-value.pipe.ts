import { MainPageService } from '#services/main-page-service/main-page.service';
import { CurrencyModel } from '#models/currency.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatValue'
})
export class FormatValuePipe implements PipeTransform {

  private currency: CurrencyModel;

  constructor(
    private readonly mpService: MainPageService
  ) {
    this.mpService.activeAccount.subscribe(
      account => this.currency = account.currency
    );
  }

  transform(value: string | number, currency?: CurrencyModel | string, ): string {
    if (value === undefined || value === null) { return ''; }
    value = value.toString();
    const splited = value.split('.') || '0.00';
    let formated: string;
    if (splited.length === 1 || splited[1] === '') {
      formated = splited[0] + '.00';
    } else if (splited[1].length === 1) {
      formated = splited[0] + '.' + splited[1] + '0';
    } else if (splited[1].length > 1) {
      formated = splited[0] + '.' + splited[1].slice(0, 2);
    }

    if (currency) {
      if (typeof currency === 'string') {
        return formated + ' ' + currency;
      } else {
        return formated + ' ' + currency.code;
      }
    } else {
      return formated + ' ' + this.currency.code;
    }
  }

}
