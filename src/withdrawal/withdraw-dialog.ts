import { HttpClient } from 'aurelia-fetch-client';
import { WithdrawService } from './withdraw-service';
import { autoinject } from 'aurelia-framework';
import { DialogController, DialogComponentActivate } from 'aurelia-dialog';
import { IWithdrawalDetails } from './i-withdrawal-details';

@autoinject
export class WithdrawDialog implements DialogComponentActivate<undefined> {

  private withdrawal?: IWithdrawalDetails;
  private hasError: boolean = false;

  constructor(
    private http: HttpClient,
    private dialogController: DialogController,
    private withdrawService: WithdrawService) {
  }

  public activate() {
    this.withdrawal = undefined;
  }

  public async preConfirm() {
    this.withdrawal = await this.withdrawService.getWithdrawal();
  }

  public async confirm() {
    if (!this.withdrawal) {
      return;
    }

    const isWithdrawn = await this.withdrawService.postWithdrawal(this.withdrawal);

    if (isWithdrawn) {
      this.dialogController.ok();
    } else {
      this.hasError = true;
    }
  }

}
