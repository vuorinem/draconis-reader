import { ApplicationState } from './../state/application-state';
import { BookService } from './../book/book-service';
import { Router } from 'aurelia-router';
import { UserService } from './../user/user-service';
import { autoinject } from 'aurelia-framework';

@autoinject
export class Main {
  constructor(
    private router: Router,
    private userService: UserService,
    private bookService: BookService,
    private applicationState: ApplicationState) {
  }

  public async activate() {
    this.applicationState.isReading = false;

    if (!this.userService.user.isInformationSheetConfirmed) {
      this.router.navigate("/introduction/information");
    } else if (!this.userService.user.isConsentConfirmed) {
      this.router.navigate("/introduction/consent");
    } else if (!this.userService.isReadingSpeedTested) {
      this.router.navigate("/introduction/reading-speed");
    } else if (!this.userService.isQuestionnaireAnswered('questionnaire11')) {
      this.router.navigate("/introduction/questionnaire11");
    } else if (!this.userService.isQuestionnaireAnswered('questionnaire12')) {
      this.router.navigate("/introduction/questionnaire12");
    } else if (!this.userService.user.isBookSelected) {
      this.router.navigate("/introduction/books");
    } else if (this.userService.isDeadlinePassed || this.userService.user.isBookFinished) {
      if (!this.userService.user.hasAnsweredAllQuestionnaires) {
        this.router.navigate("/finish/questionnaire");
      } else if (!this.userService.user.hasConfirmedGiveaway) {
        this.router.navigate("/finish/giveaway");
      } else {
        this.router.navigate("/finish/debrief");
      }
    } else {
      await this.bookService.loadSelectedBook();

      this.applicationState.isReading = true;
    }
  }
}
