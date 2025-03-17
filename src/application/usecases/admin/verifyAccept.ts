interface Data {
    clientId: string;
    editData: {};
}

export interface AdminRepositary {
    verifyAccept(data: Data): void;
}

export class VerifyAccept {
    constructor(private adminRepositary: AdminRepositary) { }

    async execute(data: Data) {
        const foundAdmin = await this.adminRepositary.verifyAccept(data);

        return { foundAdmin };
    }
}
