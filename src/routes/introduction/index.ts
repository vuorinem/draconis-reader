import { autoinject, PLATFORM } from 'aurelia-framework';
import { RouterConfiguration } from 'aurelia-router';

@autoinject
export class Introduction {
  public configureRouter(config: RouterConfiguration): void {
    config.map([
      {
        name: 'information',
        route: 'information',
        moduleId: PLATFORM.moduleName("./information"),
      },
      {
        name: 'consent',
        route: 'consent',
        moduleId: PLATFORM.moduleName("./consent"),
      },
      {
        name: 'reading-speed',
        route: 'reading-speed',
        moduleId: PLATFORM.moduleName("./reading-speed"),
      }
    ]);
  }
}
