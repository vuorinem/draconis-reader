import { autoinject } from "aurelia-framework";
import { json, HttpClient } from 'aurelia-fetch-client';
import { UserService } from "user/user-service";

@autoinject
export class GiveawayService {

  constructor(
    private http: HttpClient,
    private userService: UserService) {
  }

  public async send(emailAddress: string | null): Promise<void> {
    const response = await this.http
      .fetch(`/giveaway`, {
        method: 'post',
        body: json(emailAddress),
      });

    if (!response.ok) {
      throw new Error('Error sending email address for giveaway');
    }

    await this.userService.load();
  }

}
