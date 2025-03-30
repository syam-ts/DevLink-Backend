"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRole = void 0;
const enums_1 = require("../../../../helper/constants/enums");
const stausMessages_1 = require("../../../../helper/constants/stausMessages");
const requireRole = (role) => {
    return (req, res, next) => {
        if (!req.user || req.user.role !== role) {
            res.status(enums_1.HttpStatusCode.FORBIDDEN).json({
                message: stausMessages_1.StatusMessage[enums_1.HttpStatusCode.FORBIDDEN],
            });
            return;
        }
        next();
    };
};
exports.requireRole = requireRole;
