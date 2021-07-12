import { QuestionnaireService } from './../../questionnaire/questionnaire-service';
import { Router } from 'aurelia-router';
import { autoinject } from 'aurelia-framework';
import { UserService } from 'user/user-service';

@autoinject
export class Questionnaire {
  private isDone: boolean = false;
  private surveyLink: string = "";

  constructor(
    private router: Router,
    private userService: UserService,
    private questionnaireService: QuestionnaireService) {
  }

  public async activate(params: { isDone: boolean }) {
    if (this.userService.user.hasAnsweredAllQuestionnaires) {
      this.router.navigateToRoute("main");
    }

    const ereaderId = await this.userService.getSurveyId();
    this.surveyLink = `https://survey-kg-savannahfan.vercel.app/examples/jquery/index.html?ereaderId=${ereaderId}&bookId=${this.userService.user.bookId}`;
    this.isDone = params.isDone;
  }

  private async complete() {
    await this.questionnaireService.sendComplete();
    this.router.navigateToRoute("main");
  }
}
