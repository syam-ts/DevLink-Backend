import { User } from "../../../domain/entities/User";

export interface ClientRepositary {
    searchDeveloper(input: string): Promise<User>;
}

export class SearchDeveloper {
    constructor(private clientRepositary: ClientRepositary) { }

    async execute(input: string) {
        const developers = await this.clientRepositary.searchDeveloper(input);

        return developers;
    }
}
