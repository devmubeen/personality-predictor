'use strict';
import { Router } from "express";
import { AnswerController } from "../controllers/AnswerController";
import Middleware from "../middlewares";


export default class AnswerApi {
    constructor() {
        this.answerController = new AnswerController();
        this.router = Router();
        this.registerRoutes();
    }

    registerRoutes() {
        this.router.post('/personality', Middleware.log, this.answerController.processPersonalityAnswers);
    }

    getRouter() {
        return this.router;
    }

    getRouteGroup() {
        return '/answer';
    }
}