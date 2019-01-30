"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const routes_1 = require("./routes");
const middleware_1 = require("./middleware");
class App {
    constructor() {
        this.app = express();
        this.config();
        this.initializeErrorHandling();
    }
    config() {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use('/', routes_1.routes);
    }
    /***
     * middle for handling http exceptions
     */
    initializeErrorHandling() {
        this.app.use(middleware_1.default);
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map