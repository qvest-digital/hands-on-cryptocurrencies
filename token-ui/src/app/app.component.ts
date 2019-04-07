import { Component, Inject, OnInit } from '@angular/core';
import { WEB3 } from './service/web3.injector';
import Web3 from 'web3';
import {Contract} from 'web3-eth-contract/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  readonly title = 'token-ui';
  readonly contractAbi = require('./contract/contract_abi.json');
  readonly contractAddress = '0x8b1bcab0cc885cdd585a605e2ff0068c54c16735';

  JSON = JSON;

  accountAddress: string;

  private contract: any;

  constructor(@Inject(WEB3) public web3: Web3) {
  }

  async ngOnInit() {
    if (this.web3.eth !== undefined) {

      this.contract = new this.web3.eth.Contract(
        this.contractAbi,
        this.contractAddress
      );

      this.accountAddress = await this.web3.eth.getCoinbase();
    }
  }

  requestToken() {
    console.log('request token');
    console.log(this.contract);
    this.contract.methods.request().send(
      {
        from: this.accountAddress,
        gas: 20000
      },
      (err, result) => {
        console.log(err);
        console.log(result);
      }
    );
  }

  sendTokens(amount: number, recipient: string) {
    console.log('send tokens', amount, recipient);
  }

}
