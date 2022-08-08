import { Utils } from "../utilities/Utils";
import questions from '../data/questions.json';

export class QuestionService {


    constructor() {
        this.utils = new Utils();
    }

    async getQuestions() {
        return questions;
    }

}