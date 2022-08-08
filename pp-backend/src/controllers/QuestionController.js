import { QuestionService } from "../services/QuestionService";
import { API_RESPONSE_MESSAGES, HTTP_CODES } from "../utilities/AppConstants";
import { ResponseHandler } from "../utilities/ResponseHandler";
import { Utils } from "../utilities/Utils";

export class QuestionController {

    constructor() {
        this.utils = new Utils();
        this.questionService = new QuestionService();
        /* API Methods */
        this.fetchQuestions = this.fetchQuestions.bind(this);
        this.postQuestion = this.postQuestion.bind(this);

    }

    fetchQuestions(req, res) {
        try {
            this.questionService.getQuestions().then((questions) => {
                new ResponseHandler(res).handleResponse(true, API_RESPONSE_MESSAGES.REQUEST_SUCCESS, questions);
            }).catch((error) => {
                console.log(error.message);
                new ResponseHandler(res).handleResponse(false, error.message, null, HTTP_CODES["BAD REQUEST"]);
            });

        } catch (error) {
            console.log('Generic Error', error);
            new ResponseHandler(res).handleResponse(false, API_RESPONSE_MESSAGES.GENERIC_ERROR, null, HTTP_CODES["BAD REQUEST"]);
        }

    }

    postQuestion(req, res){

        try {
            let body = this.utils.parseBody(req);
            this.questionService.insertQuestion(body).then((resp) => {
                new ResponseHandler(res).handleResponse(true, API_RESPONSE_MESSAGES.RESOURCE_CREATED, resp, HTTP_CODES.RESOURCE_CREATED);
            }).catch((error) => {
                console.log(error.message);
                new ResponseHandler(res).handleResponse(false, error.message, null, HTTP_CODES["BAD REQUEST"]);
            });

        } catch (error) {
            console.log('Generic Error', error);
            new ResponseHandler(res).handleResponse(false, API_RESPONSE_MESSAGES.GENERIC_ERROR, null, HTTP_CODES["BAD REQUEST"]);
        }

    }
}