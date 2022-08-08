import jsontoken from "jsonwebtoken";
import { jwtSecret } from "../configuration/env";
import { API_RESPONSE_MESSAGES, HTTP_CODES } from "../utilities/AppConstants";
import { ResponseHandler } from "../utilities/ResponseHandler";
const { verify } = jsontoken
/* import { getLanguage } from "../../utilities";
import { LANG } from "../../utilities/api_responses";
import { ERROR_CODES, ROLES } from "../../utilities/constants"; */


export default class Middleware {

    static log(req, res, next) {
        console.log(req.originalUrl);
        next();
    }
    static loggedIn(req, res, next) {
        
        // const language = getLanguage(req['headers']);
        new Middleware().decodeToken(req).then(async data => {
            req.payload = data.payload;
            next();

        }).catch(ex => {
            console.log('Middleware', JSON.stringify(ex));
            new ResponseHandler(res).handleResponse(false, API_RESPONSE_MESSAGES.UNAUTHORIZED, null, HTTP_CODES.UNAUTHENTICATED);
        });
    }

    decodeToken(req) {
        return new Promise((resolve, reject) => {

            let { token } = req.headers;
            verify(token, `${jwtSecret}`, (err, decoded) => {

                if (err === null) {
                    resolve(decoded);
                } else {
                    reject(err);
                }
            });
        });
    }


    /* static isAdmin(req, res, next){
        const language = getLanguage(req['headers']);
        let payload = req.payload;
        //console.log("D", payload);
        if(payload['role'] === ROLES[1]){
            next();
        }
        else{
            res.status(ERROR_CODES['ROUTE_NOT_ALLOWED']).json({ success: false, message: LANG[language]['auth']['not_allowed'] });
        }


    } */
}