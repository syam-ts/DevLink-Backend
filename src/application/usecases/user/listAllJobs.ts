

export interface UserRepository {
    findAllJobs(): Promise <any>
};


export class ListAllJobs {
    constructor( private userRepository: UserRepository) {};

    async execute() {
        const jobs = await this.userRepository.findAllJobs();
 
        return jobs;
    }
}