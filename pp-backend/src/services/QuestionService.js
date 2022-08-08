import Question from "../models/Question";
import { Utils } from "../utilities/Utils";


export class QuestionService {


    constructor() {
        this.utils = new Utils();
    }

    async getQuestions() {

        let questionsData = await Question.getModel()
            .find()
            .select('-options.type -__v')
            .lean(true);

        return questionsData;
    }

    async insertQuestion(body) {

        let insertation = await Question.getModel().create(body);
        return insertation;


    }

}