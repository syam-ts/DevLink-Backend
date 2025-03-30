"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const clientRoutes_1 = __importDefault(require("./clientRoutes"));
const adminRouter_1 = __importDefault(require("./adminRouter"));
const router = express_1.default.Router();
router.use('/user', userRoutes_1.default);
router.use('/client', clientRoutes_1.default);
router.use('/admin', adminRouter_1.default);
exports.default = router;
