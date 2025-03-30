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
exports.AlterUserProfile = void 0;
;
;
class AlterUserProfile {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    execute(userId, profileData, type) {
        return __awaiter(this, void 0, void 0, function* () {
            if (type === "verify") {
                const updatedUser = yield this.userRepository.alterUserProfile(userId, profileData, type);
                if (!updatedUser) {
                    throw new Error("Profile editing failed");
                }
                return updatedUser;
            }
            else if (type === "edit") {
                for (let value in profileData.editData) {
                    if (profileData.editData[value] == "") {
                        profileData.editData[value] = profileData.unchangedData[value];
                    }
                }
                const type = "edit";
                const updatedUser = yield this.userRepository.alterUserProfile(userId, profileData, type);
                if (!updatedUser) {
                    throw new Error("Profile editing failed");
                }
                return updatedUser;
            }
            else {
                throw new Error('Wrong selection');
            }
        });
    }
}
exports.AlterUserProfile = AlterUserProfile;
;
