import { Disposable, observable, computedFrom } from 'aurelia-binding';
import { IQuestionDetails } from './i-question-details';
import { bindable, bindingMode, ComponentBind, ComponentUnbind, autoinject, BindingEngine } from 'aurelia-framework';

@autoinject
export class NrAnswer implements ComponentBind, ComponentUnbind {

  @bindable private question!: IQuestionDetails;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) private value?: string;

  private observsers: Disposable[] = [];

  private selectedGenres: string[] = [];
  private selectedDevices: string[] = [];

  @observable
  private reasonOther: string = "";

  @observable
  private reasonForReadingOther: string = "";

  private yesnoOptions = [
    'Yes',
    'No',
  ];

  private genderOptions = [
    'Female',
    'Male',
    'Other',
    'Prefer not to say',
  ];

  private trueOptions = [
    '1 <br/> Not at all true',
    '2',
    '3',
    '4 <br/> Somewhat true',
    '5',
    '6',
    '7 <br/> Very true',
  ];

  private educationOptions = [
    'Elementary',
    'High school',
    'College',
    'Undergraduate',
    'Postgraduate',
  ];

  private frequencyOptions = [
    'Never',
    'A few times a year',
    'A few times a month',
    'A few times a week',
    'Every day',
  ];

  private genreOptions = [
    'Biographies / autobiographies',
    'Celebrities / television',
    'Classic novels',
    'Crime, thrillers and mystery',
    'Fantasy',
    'Graphic novels',
    'Historical fiction',
    'History',
    'Horror',
    'Humour',
    'Modern fiction',
    'Poetry',
    'Politics / current affairs',
    'Religion and spirituality',
    'Romance',
    'Science',
    'Science fiction',
    'Self-help',
    'Special interests / hobbies',
    'Sports',
    'Travel',
  ];

  private bookCountOptions = [
    'None',
    '1-2 books',
    '3-6 books',
    '7-15 books',
    '16-25 books',
    '26-50 books',
    'More than 50 books',
  ];

  private reasonOptions = [
    {
      title: 'To improve health and well being',
      description: 'For example to relax, to fall asleep or to improve mental health',
    },
    {
      title: 'Intellectual improvement',
      description: 'For example to gain general knowledge, or to learn a language',
    },
    {
      title: 'Personal development',
      description: ' For example to increase creativeness, self-esteem or empathy',
    },
    {
      title: 'Social reasons',
      description: 'For example to take part in cultural activities or to enhance understanding of others',
    },
    {
      title: 'Enjoyment',
      description: 'For example because you enjoy reading, like books or it makes you happy',
    },
    {
      title: 'Boredom',
      description: 'For example to avoid boredom or to pass time',
    },
    {
      title: 'I only read if I have to',
      description: '',
    },
    {
      title: 'I do not read',
      description: '',
    },
  ]

  private amountOptions = [
    'Not at all',
    'A little',
    'Moderately',
    'Somewhat',
    'Very much',
  ];

  private previouslyReadOptions = [
    'No, this was my first time reading this story',
    'Yes, I have read this story before',
    'Not sure',
  ];

  private progressOptions = [
    '0% - None of the story',
    '10%',
    '20%',
    '30%',
    '40%',
    '50% - Half of the story',
    '60%',
    '70%',
    '80%',
    '90%',
    '100% - The entire story',
  ];

  private deviceOptions = [
    'Dedicated e-reader with an e-ink screen (such as Kindle Paperwhite, Kobo or Nook)',
    'Desktop computer',
    'Laptop',
    'Smartphone',
    'Tablet computer (such as iPad)',
    'Other device with internet access such as a smartwatch or an iPod',
  ];

  private reasonForReadingOptions = [
    {
      title: 'To improve health and well being',
      description: 'For example to relax, to fall asleep or to improve mental health',
    },
    {
      title: 'Intellectual improvement',
      description: 'For example to gain general knowledge, or to learn a language',
    },
    {
      title: 'Personal development',
      description: ' For example to increase creativeness, self-esteem or empathy',
    },
    {
      title: 'Social reasons',
      description: 'For example to take part in cultural activities or to enhance understanding of others',
    },
    {
      title: 'Enjoyment',
      description: 'For example you enjoyed reading the story, or it made you happy',
    },
    {
      title: 'Boredom',
      description: 'For example to avoid boredom or to pass time',
    },
    {
      title: 'Getting the payment for completing the study',
      description: '',
    },
    {
      title: 'To complete the study participation',
      description: '',
    },
    {
      title: 'I read the story because I had to',
      description: '',
    },
    {
      title: 'I did not read the story',
      description: '',
    },
  ]

  private get name(): string {
    return 'question-' + this.question.number;
  }

  @computedFrom('value')
  private get timeSpentHours(): number {
    const numberValue = parseInt(this.value);

    if (!numberValue) {
      return 0;
    }

    return Math.floor(numberValue / 60);
  }

  @computedFrom('value')
  private get timeSpentMinutes(): number {
    const numberValue = parseInt(this.value);

    if (!numberValue) {
      return 0;
    }

    return numberValue % 60;
  }

  constructor(private bindingEngine: BindingEngine) {
  }

  public bind() {
    if (this.question.questionType === 'genres') {
      this.observsers.push(this.bindingEngine.collectionObserver(this.selectedGenres).subscribe(() => {
        this.value = this.selectedGenres.join(',');
      }));
    }

    if (this.question.questionType === 'devices') {
      this.observsers.push(this.bindingEngine.collectionObserver(this.selectedDevices).subscribe(() => {
        this.value = this.selectedDevices.join(',');
      }));
    }

    if (this.question.questionType === 'timeSpent') {
      if (!this.value) {
        this.value = "10";
      }
    }
  }

  public unbind() {
    let observer;
    while (observer = this.observsers.pop()) {
      observer.dispose();
    }
  }

  private reasonOtherChanged() {
    this.value = this.reasonOther;
  }

  private reasonForReadingOtherChanged() {
    this.value = this.reasonForReadingOther;
  }

}
