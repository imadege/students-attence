"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const routes_1 = require("./routes");
class App {
    constructor() {
        this.app = express();
        this.config();
    }
    config() {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use('/', routes_1.routes);
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map