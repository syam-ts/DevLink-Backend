export interface AdminRepositary {
    findAdmin(name: string, password: string): void;
    findAllUsers(): void;
    findAllClients(): void;
}

export class GetDashboard {
    constructor(private adminRepositary: AdminRepositary) { }

    async execute() {
        const [allUsers, allClients] = await Promise.all([
            this.adminRepositary.findAllUsers(),
            this.adminRepositary.findAllClients(),
        ]);

        return {
            allUsers: allUsers,
            allClients: allClients,
        };
    }
}
