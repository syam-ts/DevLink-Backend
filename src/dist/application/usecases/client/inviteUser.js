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
exports.InviteUser = void 0;
class InviteUser {
    constructor(clientRepository) {
        this.clientRepository = clientRepository;
    }
    execute(userId, clientId, jobPostId, description) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!jobPostId) {
                throw new Error('Please select a jobPost');
            }
            if (description.length < 10 && description.length < 30) {
                throw new Error('Description should be between 10 to 30 characters');
            }
            const result = yield this.clientRepository.inviteUser(userId, clientId, jobPostId, description);
            return result;
        });
    }
}
exports.InviteUser = InviteUser;
