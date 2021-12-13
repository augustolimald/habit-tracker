"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var Database = /** @class */ (function () {
    function Database() {
        this.client = new client_1.PrismaClient();
    }
    Database.prototype.connect = function () {
        return this.client.$connect();
    };
    Database.prototype.disconnect = function () {
        return this.client.$disconnect();
    };
    return Database;
}());
exports.default = new Database();
