


export interface UserRepositary {
    submitProject(contractId: string, body: string): Promise<any >;
}

export class SubmitProject {
    constructor(private userRepositary: UserRepositary) {}

    async execute(contractId: string, body: any) {   
        

        const response:any = await this.userRepositary.submitProject(contractId, body);
 
           return response;
    }
}