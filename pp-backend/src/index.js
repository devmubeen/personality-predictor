// import "@babel/polyfill";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import http from 'http';
import { port, allowedDomains, bodyLimit, cookieSecret } from './configuration/env';
import { DefaultController } from "./controllers/DefaultController";
import Middleware from "./middlewares";
import Api from './routes';


export class Main {

    constructor() {
        
        let app = express();
        app.set("port", port);
        app.use(bodyParser.json({ limit: bodyLimit }));
        app.use(bodyParser.urlencoded({ limit: bodyLimit, extended: true }));
        app.use(cookieParser(cookieSecret));

        app.use(cors({
            origin: (origin, callback) => {
                console.log(`Origin: ${origin}`);
                let originIsWhitelisted = allowedDomains.indexOf(origin) !== -1 || typeof origin === "undefined";
                console.log('Is IP allowed: ' + originIsWhitelisted);
                let failureResp = 'You are not authorized to perform this action';
                callback(originIsWhitelisted ? null : failureResp, originIsWhitelisted);
            }
        }));
        new Api(app).registerGroup();
        app.set('view engine', 'ejs');
        // app.set('views', __dirname + '/email-templates');
        app.use('/', Middleware.log, DefaultController);

        http.createServer(app).on('error', function () {
            console.log('Can\'t connect to server.');
        }).listen(port, () => console.log(`Server Started :: ${port}`));
    }
}

new Main();