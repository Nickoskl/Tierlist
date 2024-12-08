"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var http_1 = require("http");
var body_parser_1 = require("body-parser");
var cookie_parser_1 = require("cookie-parser");
var compression_1 = require("compression");
var cors_1 = require("cors");
var mongoose_1 = require("mongoose");
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
var app = (0, express_1.default)();
app.use((0, cors_1.default)({
    credentials: true,
}));
app.use((0, compression_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
var server = http_1.default.createServer(app);
server.listen(5000, function () {
    console.log("Server running on 5000");
});
var MONGO_DB = process.env.MONGO_URL;
mongoose_1.default.Promise = Promise;
mongoose_1.default.connect(MONGO_DB);
mongoose_1.default.connection.on('error', function (error) { return console.log(error); });
mongoose_1.default.connection.on('connected', function () { return console.log("Connected to ".concat(MONGO_DB)); });
