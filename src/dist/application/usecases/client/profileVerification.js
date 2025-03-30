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
exports.ProfileVerification = void 0;
;
class ProfileVerification {
    constructor(clientRepository) {
        this.clientRepository = clientRepository;
    }
    ;
    execute(clientId, clientData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { companyName, location, description, domain, numberOfEmployees, since } = clientData.editData;
            if (!companyName || !location || !description || !domain || !numberOfEmployees || !since) {
                throw new Error('All the fields need to be filled');
            }
            if (companyName.length > 20 || companyName.length < 4) {
                throw new Error("Company name Should be between atleast 4 to 20 characters");
            }
            if (location.length < 4) {
                throw new Error("Location name should be atleast 4 letters");
            }
            if (description.length < 20) {
                throw new Error("Description should have alteast 20 words");
            }
            if (domain.length < 3) {
                throw new Error("Domain should have alteast 3 Characters");
            }
            if (since < 1950 || since > 2024) {
                throw new Error("Date need to be valid");
            }
            const verify = yield this.clientRepository.profileVerification(clientId, clientData);
            return verify;
        });
    }
}
exports.ProfileVerification = ProfileVerification;
