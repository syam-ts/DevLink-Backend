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
exports.GetUserProfile = void 0;
class GetUserProfile {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    execute(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findUserById(userId);
            return {
                name: user.name,
                email: user.email,
                budget: user.budget,
                location: user.location,
                mobile: user.mobile,
                skills: user.skills,
                profilePicture: user.profilePicture,
                domain: user.domain,
                rating: user.rating,
                review: user.review,
                githugLink: user.githubLink,
                description: user.description,
                whyHireMe: user.whyHireMe,
                experience: user.experience,
                education: user.education,
                isBoosted: user.isBoosted,
                isProfileFilled: user.isProfileFilled,
                workHistory: user.workHistory,
                totalJobs: user.totalJobs,
                totalHours: user.totalHours,
            };
        });
    }
}
exports.GetUserProfile = GetUserProfile;
;
