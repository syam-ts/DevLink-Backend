export interface AdminRepositary {
    create(adminId: string): void;
}

export class Create {
    constructor(private adminRepositary: AdminRepositary) { }

    async execute(adminId: string) {
        const foundAdmin = await this.adminRepositary.create(adminId);

        return { foundAdmin };
    }
}
