export interface AdminRepositary {
    getAllRequests(): void;
}

export class GetAllRequests {
    constructor(private adminRepositary: AdminRepositary) { }

    async execute() {
        const requests = await this.adminRepositary.getAllRequests();
        return requests;
    }
}
