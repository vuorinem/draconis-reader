import { AuthService } from '../../auth/auth-service';
import { Router } from 'aurelia-router';
import { autoinject } from 'aurelia-framework';
import { TrackingService } from 'tracking/tracking-service';

@autoinject
export class Login {
  private emailAddress: string = "";
  private password: string = "";

  private isError: boolean = false;
  private isConnectionError: boolean = false;
  private isLoading: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private trackingService: TrackingService) {
  }

  public activate(params: any) {
    if (this.authService.isAuthenticated) {
      this.router.navigateToRoute("main");
    }

    this.emailAddress = params.email;
  }

  private async signIn() {
    this.isError = false;
    this.isConnectionError = false;

    try {
      this.isLoading = true;
      const isAuthenticateSuccessful = await this.authService.authenticate(this.emailAddress, this.password);

      this.password = "";

      if (isAuthenticateSuccessful) {
        this.trackingService.event('login');
        this.router.navigateToRoute("main");
      } else {
        this.isError = true;
      }
    } catch (error) {
      this.isConnectionError = true;
    } finally {
      this.isLoading = false;
    }
  }
}
