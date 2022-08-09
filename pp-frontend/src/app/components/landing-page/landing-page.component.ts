import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Question } from 'src/app/models/question';
import { ApiResponse } from 'src/app/models/response';
import { ApiRequestService } from 'src/app/services/api-requests.service';
import { Constants } from 'src/app/utilities/constants';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  questions: Array<Question> = [];
  selectedQuestionIndex = 0;
  answer = '';
  answers: Array<string> = [];
  personalityType = '';

  constructor(
    private apiservice: ApiRequestService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getQuestions();
    const savedIndex = sessionStorage.getItem(Constants.STORAGE_ITEM.QUESTION_INDEX);
    this.answers = JSON.parse(sessionStorage.getItem(Constants.STORAGE_ITEM.ANSWERS) || '[]');
    this.personalityType = sessionStorage.getItem(Constants.STORAGE_ITEM.PERSONALITY)  || '';
    this.selectedQuestionIndex = savedIndex ? parseInt(savedIndex) : 0;
  }

  getQuestions() {

    this.apiservice.getRequest(Constants.API_CONFIG.GET_QUESTIONS).subscribe((resp: ApiResponse) => {
      if (resp.success) {
        this.questions = resp.data;
        console.log(this.questions);
      }
      this.cdr.markForCheck();
    })

  }

  nextQuestion() {
    if (this.answer) {

      
      this.answers.push(this.answer);
      sessionStorage.setItem(Constants.STORAGE_ITEM.ANSWERS, JSON.stringify(this.answers));
      this.answer = '';

      if (this.selectedQuestionIndex === this.questions.length-1) {
        console.log("process answer");
        this.apiservice.postRequest(Constants.API_CONFIG.PROCESS_ANSWER, { answers: this.answers }).subscribe((resp: ApiResponse) => {
          if (resp.success) {
            if (resp.data === 'I') {
              this.personalityType = "You are introvert...";
            }
            else {
              this.personalityType = "You are extrovert...";
            }
            sessionStorage.setItem(Constants.STORAGE_ITEM.PERSONALITY, this.personalityType);
          }
        })
      }
      else{
        this.selectedQuestionIndex++;
        sessionStorage.setItem(Constants.STORAGE_ITEM.QUESTION_INDEX, this.selectedQuestionIndex.toString());
      }

      

    }
  }

  previousQuestion(){
    if (this.selectedQuestionIndex > 0) {

      this.selectedQuestionIndex--;
      sessionStorage.setItem(Constants.STORAGE_ITEM.QUESTION_INDEX, this.selectedQuestionIndex.toString());
      this.answers.pop();
      sessionStorage.setItem(Constants.STORAGE_ITEM.ANSWERS, JSON.stringify(this.answers));
      this.answer = '';
    }
  }

  resetData(){
    this.answer = '';
    this.answers = [];
    this.selectedQuestionIndex = 0;
    this.personalityType = '';
    sessionStorage.removeItem(Constants.STORAGE_ITEM.ANSWERS);
    sessionStorage.setItem(Constants.STORAGE_ITEM.QUESTION_INDEX, this.selectedQuestionIndex.toString());
    sessionStorage.removeItem(Constants.STORAGE_ITEM.PERSONALITY);

  }

}
