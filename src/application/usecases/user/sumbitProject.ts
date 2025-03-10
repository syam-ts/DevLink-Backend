interface Body {
    description: string
    progress: number
    attachedFile: string
};

export interface UserRepository {
    submitProject(contractId: string, body: Body): void;
}

export class SubmitProject {
    constructor(private userRepository: UserRepository) { }

    async execute(contractId: string, body: Body) {
        const response = await this.userRepository.submitProject(
            contractId,
            body
        );

        return response;
    }
}
