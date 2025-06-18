import { User } from "../../../domain/entities/User";

export interface ClientRepositary {
    searchDeveloperBySkills(input: string): Promise<User>;
}

export class SearchDeveloper {
    constructor(private clientRepositary: ClientRepositary) { }

    async execute(input: string) {
        const developers = await this.clientRepositary.searchDeveloperBySkills(input);

        return developers;
    }
}
