"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockClient = exports.BlockUser = void 0;
class BlockUser {
    constructor(adminRepositary) {
        this.adminRepositary = adminRepositary;
    }
    execute(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const blockedUser = yield this.adminRepositary.blockUser(userId);
            return blockedUser;
        });
    }
}
exports.BlockUser = BlockUser;
class BlockClient {
    constructor(adminRepositary) {
        this.adminRepositary = adminRepositary;
    }
    execute(clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            const blockedClient = yield this.adminRepositary.blockClient(clientId);
            return blockedClient;
        });
    }
}
exports.BlockClient = BlockClient;
