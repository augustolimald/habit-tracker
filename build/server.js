"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app"));
var database_1 = __importDefault(require("./database"));
database_1.default.connect().then(function () {
    var port = process.env.PORT || 3000;
    app_1.default.listen(port, function () {
        console.log("Server is running on port ".concat(port));
    });
}).catch(function () {
    console.log('Error connecting to database');
    process.exit(1);
});
