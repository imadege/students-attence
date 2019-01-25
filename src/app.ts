
import * as express from "express";
import * as bodyParser from "body-parser";
import { routes } from './routes';
import errorMiddleware from './middleware';

class App {

    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();  
        this.initializeErrorHandling()      
    }

    private config(): void{
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use('/', routes);
    }

    /***
     * middle for handling http exceptions
     */
    private initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }
     

}

export default new App().app;