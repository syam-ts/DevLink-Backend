import { IUserRepository } from "../../../domain/interfaces/IUserRepository";

export class GetUserProfile {
  constructor(private userRepository: IUserRepository) {}

  async execute(userId: string) {
    const user = await this.userRepository.findUserById(userId);

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
  }
}
