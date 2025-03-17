export interface AdminRepositary {
    getWallet(adminId: string): void;
}

export class GetWallet {
    constructor(private adminRepositary: AdminRepositary) { }

    async execute() {
        const adminId: string = process.env.ADMIN_OBJECT_ID as string;
        const wallet = await this.adminRepositary.getWallet(adminId);

        return { wallet };
    }
}
