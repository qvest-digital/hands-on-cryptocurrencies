import { InjectionToken } from '@angular/core';
import Web3 from 'web3';

// Injection of web3 in Angular app
// see https://medium.com/b2expand/inject-web3-in-angular-6-0-a03ca345892

export const WEB3 = new InjectionToken<Web3>('web3', {
  providedIn: 'root',
  factory: () => {
    try {
      const provider = ('ethereum' in window) ? window['ethereum'] : Web3.givenProvider;
      if (provider) {
        return new Web3(provider);
      } else {
        return undefined;
      }
    } catch (err) {
      return undefined;
    }
  }
});
