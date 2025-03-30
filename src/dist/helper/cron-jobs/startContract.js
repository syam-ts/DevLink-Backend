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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startContractHelperFn = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const Contract_1 = require("../../domain/entities/Contract");
const User_1 = require("../../domain/entities/User");
const JobPost_1 = require("../../domain/entities/JobPost");
const sendingContractFinishRequest = (jobPostId, userId, contractId) => __awaiter(void 0, void 0, void 0, function* () {
    const currentContract = yield Contract_1.ContractModel.findById(contractId).lean().exec();
    const updateJobPost = yield JobPost_1.JobPostModel.findByIdAndUpdate(jobPostId, {
        status: 'finished'
    }, {
        update: true
    });
    if (!currentContract)
        throw new Error('Contract not exists');
    console.log('updateJobPost: ', updateJobPost);
    if (currentContract.status === 'closed') {
        console.log('Contract alredy finished!');
    }
    else {
        const request = {
            type: 'What about the job progress ?',
            contractInfo: currentContract,
            date: new Date()
        };
        const sendRequest = yield User_1.UserModel.findByIdAndUpdate(userId, { $push: { request: request } }, { new: true });
        console.log('Finish sending request to user', sendRequest);
    }
});
const startContractHelperFn = (timer, jobPostId, userId, contractId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('TIMER : ', timer);
    const schedule = `*/${timer} * * * * *`; // This will run every second
    // const schedule: string = `0 */${timer} * * *`; // hour timer
    node_cron_1.default.schedule(schedule, () => {
        sendingContractFinishRequest(jobPostId, userId, contractId);
    });
    console.log(`Cron job scheduled with timer: ${timer} hours(s).`);
});
exports.startContractHelperFn = startContractHelperFn;
