'use strict';
import { Router } from "express";
import PromoCodeApi from "./QuestionApi";


export default class Api {
    constructor(app) {
        this.app = app;
        this.router = Router();
        this.routeGroups = [];
    }

    loadRouteGroups() {
        this.routeGroups.push(new PromoCodeApi());

    }

    setContentType(req, resp, next) {
        resp.set('Content-Type', 'text/json');
        next();
    }

    registerGroup() {
        this.loadRouteGroups();
        this.routeGroups.forEach(rg => {
            let setContentType = rg.setContentType ? rg.setContentType : this.setContentType;
            this.app.use('/api' + rg.getRouteGroup(), setContentType, rg.getRouter())
        });
    }
}
