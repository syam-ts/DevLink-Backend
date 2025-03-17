export interface AdminRepositary {
    create(adminId: string): Promise<any>;
}

export class Create {
    constructor(private adminRepositary: AdminRepositary) { }

    async execute(adminId: string) {
        const foundAdmin = await this.adminRepositary.create(adminId);

        return { foundAdmin };
    }
}
