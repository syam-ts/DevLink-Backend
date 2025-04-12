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
exports.EditClientProfile = void 0;
class EditClientProfile {
    constructor(clientRepository) {
        this.clientRepository = clientRepository;
    }
    execute(clientId, clientData) {
        return __awaiter(this, void 0, void 0, function* () {
            const unChangedData = JSON.parse(JSON.stringify(clientData.editData));
            for (const key of Object.keys(clientData.editData)) {
                if (clientData.editData[key] === "") {
                    clientData.editData[key] = clientData.unChangedData[key];
                }
            }
            const client = yield this.clientRepository.editClientProfile(clientId, clientData.editData, unChangedData);
        });
    }
}
exports.EditClientProfile = EditClientProfile;
