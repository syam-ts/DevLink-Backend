"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allRoles = exports.HttpStatusCode = void 0;
var HttpStatusCode;
(function (HttpStatusCode) {
    HttpStatusCode[HttpStatusCode["OK"] = 200] = "OK";
    HttpStatusCode[HttpStatusCode["CREATED"] = 201] = "CREATED";
    HttpStatusCode[HttpStatusCode["NO_CONTENT"] = 204] = "NO_CONTENT";
    HttpStatusCode[HttpStatusCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HttpStatusCode[HttpStatusCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HttpStatusCode[HttpStatusCode["FORBIDDEN"] = 403] = "FORBIDDEN";
    HttpStatusCode[HttpStatusCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    HttpStatusCode[HttpStatusCode["GONE"] = 410] = "GONE";
    HttpStatusCode[HttpStatusCode["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
    HttpStatusCode[HttpStatusCode["SERVICE_UNAVAILABLE"] = 503] = "SERVICE_UNAVAILABLE";
    HttpStatusCode[HttpStatusCode["NETWORK_CONNECT_TIMEOUT_ERROR"] = 599] = "NETWORK_CONNECT_TIMEOUT_ERROR";
})(HttpStatusCode || (exports.HttpStatusCode = HttpStatusCode = {}));
;
var allRoles;
(function (allRoles) {
    allRoles["USER"] = "user";
    allRoles["CLIENT"] = "client";
    allRoles["ADMIN"] = "admin";
})(allRoles || (exports.allRoles = allRoles = {}));
;
