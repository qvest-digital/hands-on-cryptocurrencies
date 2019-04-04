import { Component, Inject, OnInit } from '@angular/core';
import { WEB3 } from './service/web3.injector';
import Web3 from 'web3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  readonly title = 'token-ui';
  readonly contractAbi = 'contract-abi';
  readonly contractAddress = '0x8b1bcab0cc885cdd585a605e2ff0068c54c16735';

  contract: any;

  walletAddress = '0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';

  constructor(@Inject(WEB3) web3: Web3) {
  }

  async ngOnInit() {
// FIXME
//    if ('enable' in this.web3.currentProvider) {
//      await this.web3.currentProvider.enable();
//    }
//    const accounts = await this.web3.eth.getAccounts();
//    console.log(accounts);

//    this.contract = this.web3.eth.contract(this.contractAbi).at(this.contractAddress);

  }

  requestToken() {
    console.log('request token');
  }

  sendTokens(amount: number, recipient: string) {
    console.log('send tokens', amount, recipient);
  }

}
