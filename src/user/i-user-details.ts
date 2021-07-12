export interface IUserDetails {
  deadline: string,
  isInformationSheetConfirmed: boolean;
  isConsentConfirmed: boolean;
  isBookSelected: boolean;
  bookId: number | null;
  isBookOpened: boolean;
  isBookFinished: boolean;
  readingSpeedWordsPerMinute: number;
  answeredQuestionnaires: string[];
  hasAnsweredAllQuestionnaires: boolean;
  isIntrinsicCondition: boolean | null;
}
