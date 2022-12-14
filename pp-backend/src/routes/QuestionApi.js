'use strict';
import { Router } from "express";
import { QuestionController } from "../controllers/QuestionController";
import Middleware from "../middlewares";


export default class QuestionApi {
    constructor() {
        this.questionController = new QuestionController();
        this.router = Router();
        this.registerRoutes();
    }

    registerRoutes() {
        this.router.get('/', Middleware.log, this.questionController.fetchQuestions);
        this.router.post('/', Middleware.log, this.questionController.postQuestion);
    }

    getRouter() {
        return this.router;
    }

    getRouteGroup() {
        return '/question';
    }
}