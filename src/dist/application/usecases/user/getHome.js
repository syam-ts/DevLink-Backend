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
exports.ListHomeJobs = exports.getHomeUser = void 0;
class getHomeUser {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const foundClients = yield this.userRepository.findAllClients();
            return foundClients;
        });
    }
}
exports.getHomeUser = getHomeUser;
class ListHomeJobs {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    execute(type) {
        return __awaiter(this, void 0, void 0, function* () {
            const allJobs = yield this.userRepository.listHomeJobs(type);
            return allJobs;
        });
    }
}
exports.ListHomeJobs = ListHomeJobs;
