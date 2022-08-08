import { AnswerService } from "../services/AnswerService";
import { API_RESPONSE_MESSAGES, HTTP_CODES } from "../utilities/AppConstants";
import { ResponseHandler } from "../utilities/ResponseHandler";
import { Utils } from "../utilities/Utils";

export class AnswerController {

    constructor() {
        this.utils = new Utils();
        this.answerService = new AnswerService();
        /* API Methods */
        this.processPersonalityAnswers = this.processPersonalityAnswers.bind(this);

    }

    processPersonalityAnswers(req, res) {
        try {
            let body = this.utils.parseBody(req);
            this.answerService.processPersonalityType(body).then((resp) => {
                new ResponseHandler(res).handleResponse(true, API_RESPONSE_MESSAGES.REQUEST_SUCCESS, resp);
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