import {Component, Inject, OnInit} from '@angular/core';
import {WEB3} from './service/web3.injector';
import Web3 from 'web3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  readonly title = 'token-ui';
  readonly contractAbi = require('./contract/contract_abi.json');
  readonly contractAddress = '0xa6B66F376f0c7C38CA5976c6010C5BE9454c3a6e';

  JSON = JSON;

  accountAddress: string;
  accountBalance: number;

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
      this.accountBalance = await this.getMyBalance();
    }
  }

  async getMyBalance(): Promise<number> {
    if (this.accountAddress === null || this.accountAddress === undefined) {
      return Promise.resolve(0);
    } else {
      return new Promise<number>((resolve, reject) => {
        this.contract.methods.balanceOf(this.accountAddress).call(
          {
            from: this.accountAddress
          },
          (err, result) => {
            if (err) {
              console.log(err);
              reject(new Error('call failed'));
            } else {
              resolve(Number(result.toString()));
            }
          }
        );
      });
    }
  }

  requestToken() {
    this.contract.methods.request().send(
      {
        from: this.accountAddress
      },
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
        }
      }
    );
  }

  killContract() {
    return new Promise<number>((resolve, reject) => {
      this.contract.methods.close().send(
        {
          from: this.accountAddress
        },
        (err, result) => {
          if (err) {
            console.log(err);
            reject(new Error('call failed'));
          } else {
            resolve(result);
          }
        }
      );
    });
  }

  sendTokens(amount: number, recipient: string) {
    console.log('send tokens', amount, recipient);
  }

}
