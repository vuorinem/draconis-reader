import { HttpClient } from 'aurelia-fetch-client';
import { EventLogin, EventLogout } from './../auth/auth-service';
import { autoinject, computedFrom } from 'aurelia-framework';
import { IUserDetails } from './i-user-details';
import { json } from 'aurelia-fetch-client';
import { EventAggregator } from 'aurelia-event-aggregator';

@autoinject
export class UserService {

  private userDetails?: IUserDetails;

  @computedFrom('userDetails')
  public get isReadingSpeedTested(): boolean {
    return !!this.userDetails &&
      !!this.userDetails.readingSpeedWordsPerMinute;
  }

  public get isDeadlinePassed(): boolean {
    if (!this.userDetails) {
      return false;
    }

    const deadline = new Date(this.userDetails.deadline);

    return new Date() > deadline;
  }

  @computedFrom('userDetails')
  public get user(): Readonly<IUserDetails> | undefined {
    return this.userDetails;
  }

  constructor(
    private eventAggregator: EventAggregator,
    private http: HttpClient) {

    eventAggregator.subscribe(EventLogout, () => this.clear());
  }

  public async load(): Promise<void> {
    const response = await this.http
      .fetch('/user/current');

    if (response.status === 200) {
      const userDetails = await response.json();
      this.userDetails = userDetails;
    } else {
      this.userDetails = null;
    }
  }

  public clear() {
    this.userDetails = undefined;
  }

  public async sendReadingSpeedTestResult(result: number) {
    const response = await this.http
      .fetch('/user/current/reading-speed-result', {
        method: 'post',
        body: json({ readingSpeedWordsPerMinute: result }),
      });

    if (!response.ok) {
      throw Error('Error saving readins speed test result');
    }

    this.userDetails = await response.json();
  }

  public async sendConfirmInformationSheet() {
    const response = await this.http
      .fetch('/user/current/confirm-information-sheet', { method: 'post' });

    if (!response.ok) {
      throw Error('Error confirming information sheet');
    }

    this.userDetails = await response.json();
  }

  public async sendConfirmConsent() {
    const response = await this.http
      .fetch('/user/current/confirm-consent', { method: 'post' });

    if (!response.ok) {
      throw Error('Error confirming consent');
    }

    this.userDetails = await response.json();
  }

  public async sendConfirmBookOpened() {
    const response = await this.http
      .fetch('/user/current/confirm-book-opened', { method: 'post' });

    if (!response.ok) {
      throw Error('Error confirming that the book has been opened');
    }

    this.userDetails = await response.json();
  }

  public async sendConfirmBookFinished() {
    const response = await this.http
      .fetch('/user/current/confirm-book-finished', { method: 'post' });

    if (!response.ok) {
      throw Error('Error confirming that the book has been finished');
    }

    this.userDetails = await response.json();
  }

  public isQuestionnaireAnswered(name: string): boolean {
    if (!this.userDetails) {
      return false;
    }

    return this.userDetails.answeredQuestionnaires.some(q => q === name);
  }

  public async getSurveyId(): Promise<number> {
    const response = await this.http
      .fetch('/user/current/survey-id');

    if (response.status === 200) {
      return await response.json();
    } else {
      throw new Error("Could not retrieve survey ID for the user");
    }
  }

}
