import { IUserRepository } from "../../../domain/interfaces/IUserRepository";

interface IBody {
    description: string;
    progress: number;
    attachedFile: string;
}

export class SubmitProject {
    constructor(private userRepository: IUserRepository) { }

    execute(contractId: string, body: IBody) {
        return this.userRepository.submitProject(contractId, body);
    }
}
