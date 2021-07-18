import { Router } from 'aurelia-router';
import { autoinject } from 'aurelia-framework';
import { UserService } from 'user/user-service';
import { GiveawayService } from 'giveaway/giveaway-service';

@autoinject
export class Giveaway {
  private emailAddress = "";

  constructor(
    private router: Router,
    private userService: UserService,
    private giveawayService: GiveawayService) {
  }

  public async activate() {
    if (this.userService.user.hasConfirmedGiveaway) {
      this.router.navigateToRoute("main");
    }
  }

  private async participate() {
    if (!this.emailAddress) {
      return;
    }

    await this.giveawayService.send(this.emailAddress);
    this.router.navigateToRoute("debrief");
  }

  private async skip() {
    this.router.navigateToRoute("debrief");
  }

}
