import { TrackingService } from './tracking/tracking-service';
import { ApplicationState } from './state/application-state';
import { UserService } from './user/user-service';
import { PLATFORM } from 'aurelia-pal';
import { WindowTrackingService } from './tracking/window-tracking-service';
import { autoinject } from 'aurelia-framework';
import { AuthService } from './auth/auth-service';
import { ConfiguresRouter, RouterConfiguration, Router, PipelineStep, Redirect } from "aurelia-router";

@autoinject
export class App implements ConfiguresRouter {
  constructor(
    private applicationState: ApplicationState,
    private authService: AuthService,
    private userService: UserService,
    private trackingService: TrackingService,
    private windowTrackingService: WindowTrackingService) {
  }

  public configureRouter(config: RouterConfiguration, router: Router) {
    config.title = "ORB Reader";
    config.options.pushState = true;
    config.options.root = '/';

    config.addAuthorizeStep(this.getAuthorizeStep());
    config.addPreActivateStep(this.getCloseMenuStep());
    config.addPreActivateStep(this.getTrackEventStep('pageNavigation'));

    config.map([
      {
        name: "login",
        route: "login",
        moduleId: PLATFORM.moduleName("./routes/login/index"),
      },
      {
        name: "unsubscribe",
        route: "unsubscribe/*id",
        moduleId: PLATFORM.moduleName("./routes/unsubscribe"),
      },
      {
        name: "logout",
        route: "logout",
        moduleId: PLATFORM.moduleName("./routes/logout"),
        settings: {
          auth: true,
        },
      },
      {
        name: "introduction",
        route: "introduction",
        moduleId: PLATFORM.moduleName("./routes/introduction/index"),
        settings: {
          auth: true,
        },
      },
      {
        name: "main",
        route: "",
        moduleId: PLATFORM.moduleName("./routes/main"),
        settings: {
          auth: true,
        },
      },
      {
        name: "confirm-finish",
        route: "confirm-finish",
        moduleId: PLATFORM.moduleName("./routes/confirm-finish"),
        settings: {
          auth: true,
        },
      },
      {
        name: "finish",
        route: "finish",
        moduleId: PLATFORM.moduleName("./routes/finish/index"),
        settings: {
          auth: true,
        },
      },
      {
        name: "not-found",
        route: "not-found",
        moduleId: PLATFORM.moduleName("./routes/not-found"),
        settings: {
          auth: true,
        },
      },
    ]);

    config.mapUnknownRoutes(PLATFORM.moduleName("./routes/not-found"));
  }

  private getAuthorizeStep(): PipelineStep {
    const authService = this.authService;
    const userService = this.userService;

    return {
      run: async (instruction, next) => {
        const requiresAuth = instruction.getAllInstructions()
          .some(i => i.config.settings && i.config.settings.auth);

        if (requiresAuth) {
          if (!authService.isAuthenticated) {
            return next.cancel(new Redirect("login"));
          }

          if (!userService.user) {
            await userService.load();
          }

          if (!userService.user) {
            authService.logout();

            return next.cancel(new Redirect("login"));
          }
        }

        return next();
      }
    }
  }

  private getCloseMenuStep(): PipelineStep {
    const applicationState = this.applicationState;

    return {
      run: async (instruction, next) => {
        applicationState.isMenuOpen = false;
        applicationState.isReading = false;

        return next();
      }
    }
  }

  private getTrackEventStep(eventType: string): PipelineStep {
    const trackingService = this.trackingService;

    return {
      run: async (instruction, next) => {
        trackingService.event(eventType);

        return next();
      }
    }
  }
}
