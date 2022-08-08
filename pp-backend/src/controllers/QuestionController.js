import { API_RESPONSE_MESSAGES, HTTP_CODES } from "../utilities/AppConstants";
import { ResponseHandler } from "../utilities/ResponseHandler";
import { Utils } from "../utilities/Utils";

export class QuestionController {

    constructor() {
        this.utils = new Utils();
        // this.promoCodeService = new PromoCodeService();
        /* API Methods */
        this.fetchQuestions = this.fetchQuestions.bind(this);

    }

    fetchQuestions(req, res) {
        try {
            let body = this.utils.parseBody(req);
            let { userId } = req.payload;
            body.userId = userId;
            this.promoCodeService.insertPromoCode(body).then((resp) => {
                new ResponseHandler(res).handleResponse(resp.success, resp.message, resp.data, HTTP_CODES.RESOURCE_CREATED);
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