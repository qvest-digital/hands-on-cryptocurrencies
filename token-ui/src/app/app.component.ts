import {Component, Inject, OnInit} from '@angular/core';
import {WEB3} from './service/web3.injector';
import Web3 from 'web3';
import {interval} from "rxjs";

class Transaction {
  success: boolean;
  hash?: string;
  message?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  readonly title = 'token-ui';
  readonly contractAbi = require('./contract/contract_abi.json');
  readonly contractAddress = '0xa98444b40d73fb0813b17e403d9088278376e6e2';

  JSON = JSON;

  accountAddress: string;
  accountBalance: number;
  upForGrabs: number;

  transactions: Transaction[] = [];

  private contract: any;

  constructor(@Inject(WEB3) public web3: Web3) {
  }

  async ngOnInit() {
    await this.refresh();

    // refresh every 2 seconds
    interval(2000).subscribe(response => {
      this.refresh();
    });
  }

  private async refresh() {
    if (this.web3.eth !== undefined) {
      if (this.contract === undefined) {
        this.contract = new this.web3.eth.Contract(
          this.contractAbi,
          this.contractAddress
        );
      }

      this.accountAddress = await this.web3.eth.getCoinbase();
      this.accountBalance = await this.getMyBalance();
      this.upForGrabs = await this.getUpForGrabs();

    } else {
      this.contract = undefined;
      this.accountAddress = '';
      this.accountBalance = 0;
      this.upForGrabs = 0;
    }
  }

  private async getMyBalance(): Promise<number> {
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

  private async getUpForGrabs(): Promise<number> {
    if (this.accountAddress === null || this.accountAddress === undefined) {
      return Promise.resolve(0);
    } else {
      return new Promise<number>((resolve, reject) => {
        this.contract.methods.upForGrabs().call(
          {
            from: this.accountAddress
          },
          (err, result) => {
            if (err) {
              reject(new Error('call failed'));
            } else {
              resolve(Number(result.toString()));
            }
          }
        );
      });
    }
  }

  grabToken() {
    this.contract.methods.grab().send(
      {
        from: this.accountAddress
      },
      (err, result) => {
        if (err) {
          console.log('grab() error', err);
          this.transactions.unshift({success: false, message: err});
        } else {
          console.log('grab() result', result);
          this.transactions.unshift({success: true, hash: result});
        }
      }
    );
  }

  sendTokens(amount: number, recipient: string) {
    this.contract.methods.transfer(recipient, amount).send(
      {
        from: this.accountAddress
      },
      (err, result) => {
        if (err) {
          console.log('transfer() error', err);
          this.transactions.unshift({success: false, message: err});
        } else {
          console.log('transfer() result', result);
          this.transactions.unshift({success: true, hash: result});
        }
      }
    );
  }

  killContract() {
    this.contract.methods.close().send(
      {
        from: this.accountAddress
      },
      (err, result) => {
        if (err) {
          console.log('close() error', err);
          this.transactions.unshift({success: false, message: err});
        } else {
          console.log('close() result', result);
          this.transactions.unshift({success: true, hash: result});
        }
      }
    );
  }

}
