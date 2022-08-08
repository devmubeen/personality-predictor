import fetch, { File } from "node-fetch";

export class Utils {

    constructor() { }

    parseBody(req) {
        let obj;
        if (typeof req.body === 'object') {
            obj = req.body;
        } else {
            obj = JSON.parse(req.body);
        }
        return obj;
    }

    getCurrentDateAndTime() {
        return new Date().getTime();
    }

}