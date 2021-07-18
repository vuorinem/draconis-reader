import { Router } from 'aurelia-router';
import { UserService } from 'user/user-service';
import { autoinject, PLATFORM } from 'aurelia-framework';
import { RouterConfiguration } from 'aurelia-router';

@autoinject
export class Index {
  constructor(
    private router: Router,
    private userService: UserService) {
  }

  public activate() {
    if (!this.userService.isDeadlinePassed && !this.userService.user.isBookFinished) {
      this.router.navigate('main');
    }
  }

  public configureRouter(config: RouterConfiguration): void {
    config.map([
      {
        name: 'questionnaire',
        route: 'questionnaire',
        moduleId: PLATFORM.moduleName("./questionnaire"),
      },
      {
        name: 'giveaway',
        route: 'giveaway',
        moduleId: PLATFORM.moduleName("./giveaway"),
      },
      {
        name: 'debrief',
        route: 'debrief',
        moduleId: PLATFORM.moduleName("./debrief"),
      },
    ]);
  }
}
