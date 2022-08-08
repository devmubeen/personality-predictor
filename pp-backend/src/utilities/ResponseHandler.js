export class ResponseHandler {

    constructor(res) {
        this.res = res;
    }

    handleResponse(success, message, data, statusCode) {
        statusCode = statusCode ? statusCode : 200;
        message = message ? message : "";
        this.res.status(statusCode).json({ success, message, data });
    }
}